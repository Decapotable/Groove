import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import { AlbumCover } from '@/components/AlbumCover';
import { colors } from '@/constants/colors';
import { fonts } from '@/constants/typography';
import type { Album } from '@/data/albums';

type Props = {
  album: Album;
  size: number;
  onPress: (album: Album) => void;
};

const EASE = Easing.out(Easing.cubic);

/** Carte album : soulèvement doux au survol / à la pression, infos qui apparaissent sur la pochette. */
export function RecordCard({ album, size, onPress }: Props) {
  const active = useSharedValue(0);
  const pressed = useSharedValue(0);

  const lift = useAnimatedStyle(() => ({
    transform: [
      { translateY: -active.value * 10 },
      { scale: 1 + active.value * 0.03 - pressed.value * 0.03 },
    ],
  }));
  const info = useAnimatedStyle(() => ({
    opacity: active.value,
    transform: [{ translateY: (1 - active.value) * 14 }],
  }));

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${album.title}, ${album.artist}, ${album.year}. Play`}
      onPress={() => onPress(album)}
      onHoverIn={() => active.set(withTiming(1, { duration: 550, easing: EASE }))}
      onHoverOut={() => active.set(withTiming(0, { duration: 650, easing: EASE }))}
      onPressIn={() => {
        pressed.set(withTiming(1, { duration: 140 }));
        active.set(withTiming(1, { duration: 300, easing: EASE }));
      }}
      onPressOut={() => {
        pressed.set(withTiming(0, { duration: 320, easing: EASE }));
        active.set(withTiming(0, { duration: 700, easing: EASE }));
      }}
      style={{ width: size, cursor: 'pointer' }}
    >
      <Animated.View style={[styles.cover, lift, { width: size, height: size }]}>
        <AlbumCover album={album} size={size} />
        <Animated.View style={[styles.overlay, { height: size * 0.26 }, info]} pointerEvents="none">
          <Text style={styles.overlayGenre}>{album.genre.toUpperCase()}</Text>
          <Text style={styles.overlayPlay}>PLAY</Text>
        </Animated.View>
      </Animated.View>
      <View style={styles.meta}>
        <Text style={styles.year}>{album.year}</Text>
        <Text style={styles.title} numberOfLines={1}>
          {album.title}
        </Text>
        <Text style={styles.artist} numberOfLines={1}>
          {album.artist}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  cover: { boxShadow: '0 24px 48px rgba(0,0,0,0.5)' },
  overlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.black,
    borderTopWidth: 1,
    borderTopColor: colors.copper,
  },
  overlayGenre: { fontFamily: fonts.label, fontSize: 13, letterSpacing: 2.4, color: colors.ivoryDim },
  overlayPlay: { fontFamily: fonts.labelBold, fontSize: 13, letterSpacing: 2.4, color: colors.copperBright },
  meta: { marginTop: 22, gap: 3 },
  year: { fontFamily: fonts.labelBold, fontSize: 14, letterSpacing: 3, color: colors.copperBright },
  title: { fontFamily: fonts.display, fontSize: 24, lineHeight: 28, color: colors.ivory },
  artist: { fontFamily: fonts.label, fontSize: 15, letterSpacing: 2, color: colors.warmGrey, textTransform: 'uppercase' },
});
