'use client';

import { useEffect } from 'react';
import type { Track } from '@/lib/api/types';
import { useAppDispatch } from '@/store/hooks';
import { setPlaylist } from '@/store/playerSlice';

type PlaylistInitializerProps = {
  tracks: Track[];
};

export function PlaylistInitializer({ tracks }: PlaylistInitializerProps) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setPlaylist(tracks));
  }, [dispatch, tracks]);

  return null;
}
