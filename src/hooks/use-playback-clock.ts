import { useEffect } from 'react';

import { usePlayerStore } from '@/store/playerStore';

const TICK_MS = 250;

/** Fait avancer l'horloge simulée du lecteur tant que le statut est « playing ». */
export function usePlaybackClock() {
  const status = usePlayerStore((state) => state.status);
  const tick = usePlayerStore((state) => state.tick);

  useEffect(() => {
    if (status !== 'playing') return;
    const id = setInterval(() => tick(TICK_MS / 1000), TICK_MS);
    return () => clearInterval(id);
  }, [status, tick]);
}
