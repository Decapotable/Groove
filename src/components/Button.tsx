import { Pressable, StyleSheet, Text } from 'react-native';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import Svg, { Path, Rect } from 'react-native-svg';

import { colors } from '@/constants/colors';
import { fonts } from '@/constants/typography';

type Props = {
  label: string;
  onPress: () => void;
  icon?: 'play' | 'pause';
  variant?: 'solid' | 'outline';
  accessibilityLabel?: string;
};

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const palette = {
  solid: { rest: colors.copper, hover: colors.copperBright, text: colors.black, border: colors.copper },
  outline: { rest: 'rgba(239,232,216,0)', hover: 'rgba(239,232,216,0.1)', text: colors.ivory, border: colors.ivoryDim },
} as const;

/** Bouton éditorial : survol (web) et pression (tactile) animés en douceur. */
export function Button({ label, onPress, icon, variant = 'solid', accessibilityLabel }: Props) {
  const hover = useSharedValue(0);
  const press = useSharedValue(0);
  const tone = palette[variant];

  const animatedStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(hover.value, [0, 1], [tone.rest, tone.hover]),
    transform: [{ scale: 1 - press.value * 0.03 }, { translateY: -hover.value * 2 }],
  }));

  return (
    <AnimatedPressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? label}
      onPress={onPress}
      onHoverIn={() => hover.set(withTiming(1, { duration: 300 }))}
      onHoverOut={() => hover.set(withTiming(0, { duration: 400 }))}
      onPressIn={() => press.set(withTiming(1, { duration: 120 }))}
      onPressOut={() => press.set(withTiming(0, { duration: 260 }))}
      style={[styles.button, { borderColor: tone.border }, animatedStyle]}
    >
      {icon && (
        <Svg width={12} height={14} viewBox="0 0 12 14">
          {icon === 'play' ? (
            <Path d="M1 1 L11 7 L1 13 Z" fill={tone.text} />
          ) : (
            <>
              <Rect x={1} y={1} width={3.4} height={12} fill={tone.text} />
              <Rect x={7.6} y={1} width={3.4} height={12} fill={tone.text} />
            </>
          )}
        </Svg>
      )}
      <Text style={[styles.label, { color: tone.text }]}>{label}</Text>
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 14,
    borderWidth: 1,
    borderRadius: 999,
    paddingVertical: 18,
    paddingHorizontal: 34,
    alignSelf: 'flex-start',
    cursor: 'pointer',
  },
  label: { fontFamily: fonts.labelBold, fontSize: 17, letterSpacing: 3.4 },
});
