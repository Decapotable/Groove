import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, {
  cancelAnimation,
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

import { colors } from '@/constants/colors';
import { fonts } from '@/constants/typography';
import type { PlayerStatus } from '@/store/playerStore';

const LABELS: Record<PlayerStatus, string> = { idle: 'READY', playing: 'PLAYING', paused: 'PAUSED' };

export function PlaybackStatus({ status }: { status: PlayerStatus }) {
  const pulse = useSharedValue(1);

  useEffect(() => {
    cancelAnimation(pulse);
    if (status === 'playing') {
      pulse.set(withRepeat(withTiming(0.25, { duration: 1100, easing: Easing.inOut(Easing.quad) }), -1, true));
    } else {
      pulse.set(withTiming(1, { duration: 300 }));
    }
  }, [status, pulse]);

  const dotStyle = useAnimatedStyle(() => ({ opacity: pulse.value }));

  return (
    <View style={styles.row} accessibilityLiveRegion="polite" accessibilityLabel={`Status: ${LABELS[status]}`}>
      <Animated.View style={[styles.dot, status === 'playing' && styles.dotActive, dotStyle]} />
      <Text style={[styles.text, status === 'playing' && styles.textActive]}>{LABELS[status]}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.warmGrey },
  dotActive: { backgroundColor: colors.copperBright },
  text: { fontFamily: fonts.labelBold, fontSize: 14, letterSpacing: 3.2, color: colors.warmGrey },
  textActive: { color: colors.copperBright },
});
