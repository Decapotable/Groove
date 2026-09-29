import { Pressable, StyleSheet, View } from 'react-native';

import { AlbumCover } from '@/components/AlbumCover';
import { Vinyl } from '@/components/Vinyl';
import type { Album } from '@/data/albums';

type Props = { album: Album; size: number; onPress: () => void };

/** Pochette avec son disque qui dépasse, sans animation : illustration éditoriale cliquable. */
export function SleeveWithDisc({ album, size, onPress }: Props) {
  const disc = size * 0.94;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${album.title}, ${album.artist}, ${album.year}`}
      onPress={onPress}
      style={{ width: size * 1.35, height: size, cursor: 'pointer' }}
    >
      <View style={[styles.disc, { left: size * 0.4, top: (size - disc) / 2 }]}>
        <Vinyl size={disc} labelColor={album.cover.accent} />
      </View>
      <View style={styles.sleeve}>
        <AlbumCover album={album} size={size} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  disc: { position: 'absolute', borderRadius: 999, boxShadow: '0 24px 60px rgba(0,0,0,0.55)' },
  sleeve: { position: 'absolute', left: 0, top: 0, boxShadow: '0 30px 70px rgba(0,0,0,0.6)' },
});
