import { StyleSheet, Text, View } from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';

import { colors } from '@/constants/colors';
import { fonts } from '@/constants/typography';

const ENTRANCE_MS = 1200;
const STAGGER_MS = 220;

/** « THE / SOUND / OF JAZZ » : trois lignes, la taille de base pilote toute la composition. */
export function HeroTitle({ fontSize }: { fontSize: number }) {
  const big = { fontSize, lineHeight: fontSize * 0.86, letterSpacing: -fontSize * 0.03 };

  return (
    <View accessibilityRole="header" accessible accessibilityLabel="The sound of jazz">
      <Animated.View entering={FadeInUp.duration(ENTRANCE_MS).delay(150)}>
        <Text style={[styles.italic, { fontSize: fontSize * 0.42, lineHeight: fontSize * 0.5 }]}>THE</Text>
      </Animated.View>
      <Animated.View entering={FadeInUp.duration(ENTRANCE_MS).delay(150 + STAGGER_MS)}>
        <Text style={[styles.display, big]}>SOUND</Text>
      </Animated.View>
      <Animated.View entering={FadeInUp.duration(ENTRANCE_MS).delay(150 + STAGGER_MS * 2)}>
        <Text style={[styles.display, big]}>
          <Text style={[styles.italic, styles.copper, { fontSize: fontSize * 0.5, letterSpacing: 0 }]}>OF </Text>
          JAZZ
        </Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  display: { fontFamily: fonts.display, color: colors.ivory },
  italic: { fontFamily: fonts.displayItalic, color: colors.ivoryDim },
  copper: { color: colors.copperBright },
});
