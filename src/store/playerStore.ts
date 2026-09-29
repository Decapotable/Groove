import { create } from 'zustand';

import { defaultAlbum, getAlbum, type Album } from '@/data/albums';

export type PlayerStatus = 'idle' | 'playing' | 'paused';

type PlayerState = {
  albumId: string;
  status: PlayerStatus;
  /** Secondes écoulées du morceau en cours (horloge simulée pour le prototype). */
  elapsed: number;
  play: (albumId?: string) => void;
  toggle: () => void;
  stop: () => void;
  tick: (deltaSeconds: number) => void;
};

export const usePlayerStore = create<PlayerState>((set, get) => ({
  albumId: defaultAlbum.id,
  status: 'idle',
  elapsed: 0,
  play: (albumId) => {
    const { albumId: current, status } = get();
    const next = albumId ?? current;
    set({
      albumId: next,
      status: 'playing',
      elapsed: next === current && status !== 'idle' ? get().elapsed : 0,
    });
  },
  toggle: () => {
    const { status } = get();
    if (status === 'playing') set({ status: 'paused' });
    else set({ status: 'playing' });
  },
  stop: () => set({ status: 'idle', elapsed: 0 }),
  tick: (deltaSeconds) => {
    const album = getAlbum(get().albumId) ?? defaultAlbum;
    const elapsed = get().elapsed + deltaSeconds;
    if (elapsed >= album.track.seconds) set({ status: 'paused', elapsed: 0 });
    else set({ elapsed });
  },
}));

export function useCurrentAlbum(): Album {
  const id = usePlayerStore((state) => state.albumId);
  return getAlbum(id) ?? defaultAlbum;
}
