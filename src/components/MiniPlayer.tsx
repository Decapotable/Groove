import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, {
  Easing,
  FadeInDown,
  FadeOutDown,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Path, Rect } from 'react-native-svg';
import { useEffect } from 'react';

import { AlbumCover } from '@/components/AlbumCover';
import { colors } from '@/constants/colors';
import { layout } from '@/constants/layout';
import { fonts } from '@/constants/typography';
import { useBreakpoint } from '@/hooks/use-breakpoint';
import { usePlaybackClock } from '@/hooks/use-playback-clock';
import { useCurrentAlbum, usePlayerStore } from '@/store/playerStore';

const formatTime = (seconds: number) => {
  const total = Math.floor(seconds);
  return `${Math.floor(total / 60)}:${String(total % 60).padStart(2, '0')}`;
};

/** Lecteur global : reste visible pendant la navigation, horizontal en desktop, compact en mobile. */
export function MiniPlayer() {
  usePlaybackClock();
  const { isMobile, gutter } = useBreakpoint();
  const insets = useSafeAreaInsets();
  const album = useCurrentAlbum();
  const { status, elapsed, toggle, stop } = usePlayerStore();
  const progress = useSharedValue(0);
  const duration = album.track.seconds;

  useEffect(() => {
    progress.set(withTiming(Math.min(elapsed / duration, 1), { duration: 260, easing: Easing.linear }));
  }, [elapsed, duration, progress]);

  const fill = useAnimatedStyle(() => ({ width: `${progress.value * 100}%` }));

  if (status === 'idle') return null;

  const bottom = isMobile ? layout.mobileNavHeight + insets.bottom + 10 : 24;
  const playing = status === 'playing';
  const coverSize = isMobile ? 44 : 56;

  return (
    <Animated.View
      entering={FadeInDown.duration(800)}
      exiting={FadeOutDown.duration(500)}
      style={[
        styles.player,
        isMobile ? styles.compact : styles.wide,
        { bottom, left: isMobile ? 12 : gutter, right: isMobile ? 12 : gutter },
      ]}
      accessibilityRole="toolbar"
      accessibilityLabel="Audio player"
    >
      <AlbumCover album={album} size={coverSize} showText={false} />
      <View style={styles.info}>
        <Text style={styles.track} numberOfLines={1}>
          {album.track.title}
        </Text>
        <Text style={styles.artist} numberOfLines={1}>
          {album.artist} — {album.title}
        </Text>
      </View>

      <Pressable
        accessibilityRole="button"
        accessibilityLabel={playing ? 'Pause' : 'Play'}
        onPress={toggle}
        style={styles.playButton}
      >
        <Svg width={16} height={16} viewBox="0 0 16 16">
          {playing ? (
            <>
              <Rect x={2} y={1} width={4} height={14} fill={colors.black} />
              <Rect x={10} y={1} width={4} height={14} fill={colors.black} />
            </>
          ) : (
            <Path d="M3 1 L15 8 L3 15 Z" fill={colors.black} />
          )}
        </Svg>
      </Pressable>

      {!isMobile && (
        <View style={styles.timeline}>
          <Text style={styles.time}>{formatTime(elapsed)}</Text>
          <View style={styles.track_}>
            <Animated.View style={[styles.fill, fill]} />
          </View>
          <Text style={styles.time}>{formatTime(duration)}</Text>
        </View>
      )}

      {!isMobile && (
        <Pressable accessibilityRole="button" accessibilityLabel="Close player" onPress={stop} hitSlop={10}>
          <Svg width={14} height={14} viewBox="0 0 14 14">
            <Path d="M2 2 L12 12 M12 2 L2 12" stroke={colors.warmGrey} strokeWidth={1.6} />
          </Svg>
        </Pressable>
      )}

      {isMobile && (
        <View style={styles.thinTrack}>
          <Animated.View style={[styles.fill, fill]} />
        </View>
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  player: {
    position: 'absolute',
    zIndex: 30,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    backgroundColor: 'rgba(20,18,16,0.96)',
    borderWidth: 1,
    borderColor: colors.blackLine,
    boxShadow: '0 20px 50px rgba(0,0,0,0.6)',
    overflow: 'hidden',
  },
  wide: { height: layout.playerHeightDesktop, paddingHorizontal: 14, gap: 24, alignSelf: 'center', maxWidth: layout.maxContentWidth, marginHorizontal: 'auto' },
  compact: { height: layout.playerHeightMobile, paddingLeft: 12, paddingRight: 14, borderRadius: 4 },
  info: { flex: 1, minWidth: 0, gap: 2 },
  track: { fontFamily: fonts.display, fontSize: 18, color: colors.ivory },
  artist: { fontFamily: fonts.label, fontSize: 13, letterSpacing: 1.8, color: colors.warmGrey, textTransform: 'uppercase' },
  playButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.copperBright,
    cursor: 'pointer',
  },
  timeline: { flex: 2, flexDirection: 'row', alignItems: 'center', gap: 14 },
  time: { width: 40, fontFamily: fonts.label, fontSize: 13, letterSpacing: 1.4, color: colors.ivoryDim, textAlign: 'center' },
  track_: { flex: 1, height: 2, backgroundColor: colors.blackLine },
  thinTrack: { position: 'absolute', left: 0, right: 0, bottom: 0, height: 2, backgroundColor: colors.blackLine },
  fill: { height: '100%', backgroundColor: colors.copperBright },
});
