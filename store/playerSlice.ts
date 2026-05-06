import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { tracks } from '@/data';
import type { Track } from '@/data';

export type PlayerState = {
  currentTrack: Track | null;
  playlist: Track[];
  isPlaying: boolean;
  isShuffle: boolean;
  isLoop: boolean;
};

const initialState: PlayerState = {
  currentTrack: null,
  playlist: tracks,
  isPlaying: false,
  isShuffle: false,
  isLoop: false,
};

const getCurrentTrackIndex = (state: PlayerState) => {
  return state.playlist.findIndex((track) => track.id === state.currentTrack?.id);
};

const getRandomTrack = (playlist: Track[], currentTrack: Track | null) => {
  if (playlist.length <= 1) {
    return currentTrack;
  }

  const availableTracks = playlist.filter((track) => track.id !== currentTrack?.id);
  const randomIndex = Math.floor(Math.random() * availableTracks.length);

  return availableTracks[randomIndex];
};

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    setCurrentTrack(state, action: PayloadAction<Track>) {
      state.currentTrack = action.payload;
      state.isPlaying = true;
    },
    playTrack(state) {
      if (state.currentTrack) {
        state.isPlaying = true;
      }
    },
    pauseTrack(state) {
      state.isPlaying = false;
    },
    togglePlay(state) {
      if (state.currentTrack) {
        state.isPlaying = !state.isPlaying;
      }
    },
    nextTrack(state) {
      if (!state.currentTrack) {
        return;
      }

      if (state.isShuffle) {
        state.currentTrack = getRandomTrack(state.playlist, state.currentTrack);
        state.isPlaying = Boolean(state.currentTrack);
        return;
      }

      const currentIndex = getCurrentTrackIndex(state);
      const nextTrackItem = state.playlist[currentIndex + 1];

      if (nextTrackItem) {
        state.currentTrack = nextTrackItem;
        state.isPlaying = true;
      }
    },
    previousTrack(state) {
      if (!state.currentTrack) {
        return;
      }

      const currentIndex = getCurrentTrackIndex(state);
      const previousTrackItem = state.playlist[currentIndex - 1];

      if (previousTrackItem) {
        state.currentTrack = previousTrackItem;
        state.isPlaying = true;
      }
    },
    toggleShuffle(state) {
      state.isShuffle = !state.isShuffle;
    },
    toggleLoop(state) {
      state.isLoop = !state.isLoop;
    },
  },
});

export const { setCurrentTrack, playTrack, pauseTrack, togglePlay, nextTrack, previousTrack, toggleShuffle, toggleLoop } = playerSlice.actions;
export const playerReducer = playerSlice.reducer;
