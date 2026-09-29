import { useEffect } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import { colors } from '@/constants/colors';
import { fonts } from '@/constants/typography';

type Props = {
  label: string;
  active: boolean;
  compact: boolean;
  onPress: () => void;
};

/** Un repère de la timeline : libellé, point sur la ligne, animation douce à la sélection. */
export function TimelineNode({ label, active, compact, onPress }: Props) {
  const progress = useSharedValue(active ? 1 : 0);

  useEffect(() => {
    progress.set(withTiming(active ? 1 : 0, { duration: 600, easing: Easing.out(Easing.cubic) }));
  }, [active, progress]);

  const dot = useAnimatedStyle(() => ({
    transform: [{ scale: 1 + progress.value * 0.9 }],
    backgroundColor: progress.value > 0.5 ? colors.copperBright : colors.warmGrey,
  }));

  return (
    <Pressable
      accessibilityRole="tab"
      accessibilityState={{ selected: active }}
      accessibilityLabel={label}
      onPress={onPress}
      style={[styles.node, compact ? styles.nodeCompact : styles.nodeFluid]}
    >
      <Text style={[styles.label, compact && styles.labelCompact, active && styles.labelActive]}>{label}</Text>
      <View style={styles.marker}>
        <View style={styles.line} />
        <Animated.View style={[styles.dot, dot]} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  node: { alignItems: 'center', gap: 16, paddingTop: 4, cursor: 'pointer' },
  nodeFluid: { flex: 1 },
  nodeCompact: { width: 96 },
  label: { fontFamily: fonts.display, fontSize: 30, letterSpacing: -1, color: colors.warmGrey },
  labelCompact: { fontSize: 24 },
  labelActive: { color: colors.ivory },
  marker: { width: '100%', height: 14, alignItems: 'center', justifyContent: 'center' },
  line: { position: 'absolute', left: 0, right: 0, height: 1, backgroundColor: colors.blackLine },
  dot: { width: 8, height: 8, borderRadius: 4 },
});
