import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Track } from '@/data';

export type PlayerState = {
  currentTrack: Track | null;
  isPlaying: boolean;
};

const initialState: PlayerState = {
  currentTrack: null,
  isPlaying: false,
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
  },
});

export const { setCurrentTrack, playTrack, pauseTrack, togglePlay } = playerSlice.actions;
export const playerReducer = playerSlice.reducer;
