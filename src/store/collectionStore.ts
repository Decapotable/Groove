import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type CollectionState = {
  /** Ids des albums, dans l'ordre d'ajout. */
  albumIds: string[];
  /** Vrai une fois la collection relue depuis le stockage local. */
  hydrated: boolean;
  add: (albumId: string) => void;
  remove: (albumId: string) => void;
  toggle: (albumId: string) => void;
};

export const useCollectionStore = create<CollectionState>()(
  persist(
    (set, get) => ({
      albumIds: [],
      hydrated: false,
      add: (albumId) => {
        if (!get().albumIds.includes(albumId)) set({ albumIds: [...get().albumIds, albumId] });
      },
      remove: (albumId) => set({ albumIds: get().albumIds.filter((id) => id !== albumId) }),
      toggle: (albumId) => (get().albumIds.includes(albumId) ? get().remove(albumId) : get().add(albumId)),
    }),
    {
      name: 'groove-collection',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ albumIds: state.albumIds }),
      onRehydrateStorage: () => () => useCollectionStore.setState({ hydrated: true }),
    },
  ),
);

export function useIsInCollection(albumId: string) {
  return useCollectionStore((state) => state.albumIds.includes(albumId));
}
