import type { PlayerStatus } from '@/store/playerStore';
import { usePlayerStore } from '@/store/playerStore';

/** État de lecture d'un album précis : « idle » tant que le lecteur global joue autre chose. */
export function useAlbumPlayback(albumId: string): { status: PlayerStatus; toggle: () => void } {
  const currentId = usePlayerStore((state) => state.albumId);
  const status = usePlayerStore((state) => state.status);
  const play = usePlayerStore((state) => state.play);
  const toggle = usePlayerStore((state) => state.toggle);
  const isCurrent = currentId === albumId;

  return {
    status: isCurrent ? status : 'idle',
    toggle: () => (isCurrent ? toggle() : play(albumId)),
  };
}
