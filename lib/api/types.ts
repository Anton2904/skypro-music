export type Track = {
  id: number;
  title: string;
  subtitle?: string;
  author: string;
  album: string;
  duration: string;
  year: number;
  genre: string;
  audioUrl: string;
};

export type User = {
  _id: number;
  email: string;
  username: string;
};

export type AuthTokens = {
  access: string;
  refresh: string;
};

export type AuthPayload = {
  email: string;
  password: string;
  username?: string;
};
