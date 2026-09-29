import { useEffect, useMemo } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Animated, {
  cancelAnimation,
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

import Svg, { Circle, Defs, RadialGradient, Stop } from 'react-native-svg';

import { AlbumCover } from '@/components/AlbumCover';
import { Tonearm } from '@/components/Tonearm';
import { Vinyl } from '@/components/Vinyl';
import { colors } from '@/constants/colors';
import type { Album } from '@/data/albums';
import type { PlayerStatus } from '@/store/playerStore';

type Props = {
  album: Album;
  status: PlayerStatus;
  /** Côté de la pochette, en px. La scène fait 1,55 × ce côté de large. */
  size: number;
  /** Garde le vinyle sorti de sa pochette même à l'arrêt (page d'un disque). */
  revealed?: boolean;
  onPress: () => void;
};

const REST_ARM_ANGLE = -20;
const REVOLUTION_MS = 3600;

/** Géométrie de la scène : dérivée d'une seule valeur (le côté de la pochette). */
function computeStage(size: number) {
  const width = size * 1.55;
  const disc = size * 0.94;
  const discCenter = { x: size * 1.05, y: size / 2 };
  const pivot = size * 0.16;
  const pivotCenter = { x: width - size * 0.1, y: size * 0.09 };

  // Point d'atterrissage de l'aiguille : 36 % du diamètre, 25° sous l'horizontale.
  const radius = disc * 0.36;
  const target = {
    x: discCenter.x + radius * Math.cos((25 * Math.PI) / 180),
    y: discCenter.y + radius * Math.sin((25 * Math.PI) / 180),
  };
  const reach = Math.hypot(target.x - pivotCenter.x, target.y - pivotCenter.y);

  // L'aiguille est décalée de -0.22·pivot sur l'axe X et à (length - 0.42·pivot) sur Y.
  const needleOffsetX = -0.22 * pivot;
  const length = 0.42 * pivot + Math.sqrt(reach * reach - needleOffsetX * needleOffsetX);
  const needleAngle = Math.atan2(length - 0.42 * pivot, needleOffsetX);
  const targetAngle = Math.atan2(target.y - pivotCenter.y, target.x - pivotCenter.x);
  const playAngle = ((targetAngle - needleAngle) * 180) / Math.PI;

  return { width, disc, discCenter, pivot, pivotCenter, length, playAngle };
}

export function RecordStage({ album, status, size, revealed = false, onPress }: Props) {
  const stage = useMemo(() => computeStage(size), [size]);
  const slide = useSharedValue(0);
  const hover = useSharedValue(0);
  const spin = useSharedValue(0);
  const arm = useSharedValue(REST_ARM_ANGLE);

  useEffect(() => {
    if (status === 'playing') {
      slide.set(withTiming(1, { duration: 1300, easing: Easing.out(Easing.cubic) }));
      arm.set(withDelay(900, withTiming(stage.playAngle, { duration: 1600, easing: Easing.inOut(Easing.cubic) })));
      cancelAnimation(spin);
      const from = spin.get() % 360;
      spin.set(from);
      spin.set(
        withDelay(
          1900,
          withSequence(
            withTiming(from + 120, { duration: 1600, easing: Easing.in(Easing.quad) }),
            withRepeat(withTiming(from + 120 + 360, { duration: REVOLUTION_MS, easing: Easing.linear }), -1, false),
          ),
        ),
      );
    } else if (status === 'paused') {
      arm.set(withTiming(REST_ARM_ANGLE, { duration: 1100, easing: Easing.inOut(Easing.cubic) }));
      cancelAnimation(spin);
      spin.set(withTiming(spin.get() + 34, { duration: 1400, easing: Easing.out(Easing.cubic) }));
    } else {
      arm.set(withTiming(REST_ARM_ANGLE, { duration: 900, easing: Easing.inOut(Easing.cubic) }));
      slide.set(
        withDelay(revealed ? 800 : 500, withTiming(revealed ? 1 : 0, { duration: 1400, easing: Easing.inOut(Easing.cubic) })),
      );
      cancelAnimation(spin);
    }
  }, [status, revealed, stage.playAngle, slide, arm, spin]);

  const discSlide = useAnimatedStyle(() => ({
    transform: [{ translateX: (-0.4 * size + hover.value * 0.1 * size) * (1 - slide.value) }],
  }));
  const discSpin = useAnimatedStyle(() => ({ transform: [{ rotate: `${spin.value}deg` }] }));
  const armSwing = useAnimatedStyle(() => ({ transform: [{ rotate: `${arm.value}deg` }] }));

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${album.title} by ${album.artist}`}
      onPress={onPress}
      onHoverIn={() => hover.set(withTiming(1, { duration: 600, easing: Easing.out(Easing.cubic) }))}
      onHoverOut={() => hover.set(withTiming(0, { duration: 700, easing: Easing.out(Easing.cubic) }))}
      style={{ width: stage.width, height: size }}
    >
      <Svg
        pointerEvents="none"
        width={size * 2.4}
        height={size * 2.4}
        style={{
          position: 'absolute',
          left: stage.discCenter.x - size * 1.2,
          top: size / 2 - size * 1.2,
        }}
      >
        <Defs>
          <RadialGradient id="glow" cx="50%" cy="50%" r="50%">
            <Stop offset="0" stopColor={colors.copper} stopOpacity="0.2" />
            <Stop offset="0.55" stopColor={colors.copper} stopOpacity="0.05" />
            <Stop offset="1" stopColor={colors.copper} stopOpacity="0" />
          </RadialGradient>
        </Defs>
        <Circle cx={size * 1.2} cy={size * 1.2} r={size * 1.2} fill="url(#glow)" />
      </Svg>

      <Animated.View
        pointerEvents="none"
        style={[
          styles.disc,
          { width: stage.disc, height: stage.disc, left: stage.discCenter.x - stage.disc / 2, top: (size - stage.disc) / 2 },
          discSlide,
        ]}
      >
        <Animated.View style={discSpin}>
          <Vinyl size={stage.disc} labelColor={album.cover.accent} />
        </Animated.View>
      </Animated.View>

      <View pointerEvents="none" style={styles.sleeve}>
        <AlbumCover album={album} size={size} />
      </View>

      <Animated.View
        pointerEvents="none"
        style={[
          styles.arm,
          {
            left: stage.pivotCenter.x - stage.pivot / 2,
            top: stage.pivotCenter.y - stage.pivot / 2,
            transformOrigin: `${stage.pivot / 2}px ${stage.pivot / 2}px`,
          },
          armSwing,
        ]}
      >
        <Tonearm pivot={stage.pivot} length={stage.length} />
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  disc: { position: 'absolute', borderRadius: 999, boxShadow: '0 24px 60px rgba(0,0,0,0.6)' },
  sleeve: { position: 'absolute', left: 0, top: 0, boxShadow: '0 40px 80px rgba(0,0,0,0.65)' },
  arm: { position: 'absolute' },
});
