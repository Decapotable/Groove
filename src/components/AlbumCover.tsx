import { StyleSheet, Text, View } from 'react-native';

import { CoverArt } from '@/components/CoverArt';
import { colors } from '@/constants/colors';
import { fonts } from '@/constants/typography';
import type { Album } from '@/data/albums';

type Props = {
  album: Album;
  size: number;
  /** Masque le texte gravé sur la pochette (utile en très petit format). */
  showText?: boolean;
};

const LIGHT_BACKGROUNDS = ['#E4DBC7', '#D8D2C4', '#A7B0B4'];

/** Pochette carrée : illustration SVG en haut, panneau typographique (artiste + titre) en bas. */
export function AlbumCover({ album, size, showText = true }: Props) {
  const pad = size * 0.06;
  const light = LIGHT_BACKGROUNDS.includes(album.cover.background);

  return (
    <View style={[styles.frame, { width: size, height: size }]}>
      <CoverArt cover={album.cover} size={size} />
      {showText && size > 90 && (
        <View style={[styles.text, { left: pad, right: pad, bottom: pad * 0.9 }]}>
          <Text style={[styles.artist, { fontSize: size * 0.048, color: light ? '#3B352E' : colors.ivoryDim }]}>
            {album.artist.toUpperCase()}
          </Text>
          <Text
            numberOfLines={2}
            style={[styles.title, { fontSize: size * 0.085, lineHeight: size * 0.088, color: light ? colors.black : colors.ivory }]}
          >
            {album.title}
          </Text>
        </View>
      )}
      <View pointerEvents="none" style={styles.edge} />
    </View>
  );
}

const styles = StyleSheet.create({
  frame: { overflow: 'hidden', backgroundColor: colors.blackRaised },
  text: { position: 'absolute', gap: 3 },
  artist: { fontFamily: fonts.labelBold, letterSpacing: 1.6 },
  title: { fontFamily: fonts.display, letterSpacing: -0.4 },
  edge: { ...StyleSheet.absoluteFill, borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)' },
});
