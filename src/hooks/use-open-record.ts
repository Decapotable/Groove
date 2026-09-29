import { useRouter } from 'expo-router';

import type { Album } from '@/data/albums';

/** Retourne un gestionnaire qui ouvre la page d'un disque. */
export function useOpenRecord() {
  const router = useRouter();
  return (album: Album) => router.push({ pathname: '/record/[id]', params: { id: album.id } });
}
