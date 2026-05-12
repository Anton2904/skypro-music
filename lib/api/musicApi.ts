import type { AuthPayload, AuthTokens, Track, User } from './types';

const API_URL = 'https://webdev-music-003b5b991590.herokuapp.com';

type ApiTrack = {
  id?: number;
  _id?: number;
  name?: unknown;
  title?: unknown;
  author?: unknown;
  album?: unknown;
  duration_in_seconds?: unknown;
  duration?: unknown;
  release_date?: unknown;
  year?: unknown;
  genre?: unknown;
  track_file?: unknown;
  audioUrl?: unknown;
};

type ApiError = {
  message?: string;
  detail?: string;
  error?: string;
};

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      'content-type': 'application/json',
      ...options?.headers,
    },
  });

  let data: unknown = null;

  try {
    data = await response.json();
  } catch {
    data = null;
  }

  if (!response.ok) {
    const apiError = data as ApiError | null;
    throw new Error(apiError?.message || apiError?.detail || apiError?.error || 'Ошибка при выполнении запроса');
  }

  return data as T;
}

const valueToString = (value: unknown, fallback: string): string => {
  if (typeof value === 'string') {
    return value || fallback;
  }

  if (typeof value === 'number') {
    return String(value);
  }

  if (Array.isArray(value)) {
    const preparedValue = value
      .map((item) => valueToString(item, ''))
      .filter(Boolean)
      .join(', ');

    return preparedValue || fallback;
  }

  if (value && typeof value === 'object') {
    const objectValue = value as Record<string, unknown>;

    return valueToString(objectValue.name ?? objectValue.title ?? objectValue.value, fallback);
  }

  return fallback;
};

const valueToNumber = (value: unknown): number | undefined => {
  if (typeof value === 'number') {
    return value;
  }

  if (typeof value === 'string') {
    const parsedValue = Number.parseInt(value, 10);

    return Number.isNaN(parsedValue) ? undefined : parsedValue;
  }

  return undefined;
};

const formatDuration = (seconds?: unknown, fallback?: unknown) => {
  const preparedFallback = valueToString(fallback, '');

  if (preparedFallback) {
    return preparedFallback;
  }

  const preparedSeconds = valueToNumber(seconds);

  if (!preparedSeconds) {
    return '0:00';
  }

  const minutes = Math.floor(preparedSeconds / 60);
  const secondsLeft = Math.floor(preparedSeconds % 60).toString().padStart(2, '0');

  return `${minutes}:${secondsLeft}`;
};

const normalizeTrack = (track: ApiTrack): Track => {
  const releaseDate = valueToString(track.release_date, '');

  return {
    id: Number(track.id ?? track._id ?? 0),
    title: valueToString(track.name ?? track.title, 'Без названия'),
    author: valueToString(track.author, 'Неизвестный исполнитель'),
    album: valueToString(track.album, 'Без альбома'),
    duration: formatDuration(track.duration_in_seconds, track.duration),
    year: valueToNumber(track.year) ?? (releaseDate ? Number.parseInt(releaseDate.slice(0, 4), 10) : 0),
    genre: valueToString(track.genre, 'Без жанра'),
    audioUrl: valueToString(track.track_file ?? track.audioUrl, ''),
  };
};

function isTrackLike(item: unknown): item is ApiTrack {
  if (!item || typeof item !== 'object') {
    return false;
  }

  const track = item as Record<string, unknown>;

  return (
    'track_file' in track ||
    'audioUrl' in track ||
    'duration_in_seconds' in track ||
    ('name' in track && ('author' in track || 'album' in track)) ||
    ('title' in track && ('author' in track || 'album' in track))
  );
}

function extractTracks(data: unknown): ApiTrack[] {
  if (Array.isArray(data)) {
    return data.filter(isTrackLike);
  }

  if (!data || typeof data !== 'object') {
    return [];
  }

  if (isTrackLike(data)) {
    return [data];
  }

  const objectData = data as Record<string, unknown>;
  const directKeys = ['data', 'results', 'result', 'items', 'tracks', 'collection', 'selection'];

  for (const key of directKeys) {
    const value = objectData[key];

    if (Array.isArray(value)) {
      const tracks = value.filter(isTrackLike);

      if (tracks.length > 0) {
        return tracks;
      }
    }

    if (value && typeof value === 'object') {
      const tracks = extractTracks(value);

      if (tracks.length > 0) {
        return tracks;
      }
    }
  }

  for (const value of Object.values(objectData)) {
    const tracks = extractTracks(value);

    if (tracks.length > 0) {
      return tracks;
    }
  }

  return [];
}

export async function getAllTracks(): Promise<Track[]> {
  const data = await request<unknown>('/catalog/track/all/', { cache: 'no-store' });

  return extractTracks(data).map(normalizeTrack);
}

export async function getSelectionTracks(id: string): Promise<Track[]> {
  const data = await request<unknown>(`/catalog/selection/${id}/`, { cache: 'no-store' });

  return extractTracks(data).map(normalizeTrack);
}

export async function loginUser(payload: AuthPayload): Promise<User> {
  return request<User>('/user/login/', {
    method: 'POST',
    body: JSON.stringify({ email: payload.email, password: payload.password }),
  });
}

export async function signupUser(payload: AuthPayload): Promise<User> {
  const data = await request<{ result: User }>('/user/signup/', {
    method: 'POST',
    body: JSON.stringify(payload),
  });

  return data.result;
}

export async function getTokens(payload: AuthPayload): Promise<AuthTokens> {
  return request<AuthTokens>('/user/token/', {
    method: 'POST',
    body: JSON.stringify({ email: payload.email, password: payload.password }),
  });
}
