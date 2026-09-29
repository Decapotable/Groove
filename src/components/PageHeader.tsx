import { StyleSheet, Text } from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';

import { colors } from '@/constants/colors';
import { fonts } from '@/constants/typography';
import { useBreakpoint } from '@/hooks/use-breakpoint';

type Props = {
  eyebrow: string;
  title: string;
  /** Fin du titre, composée en italique atténué. */
  italic?: string;
  subtitle?: string;
};

export function PageHeader({ eyebrow, title, italic, subtitle }: Props) {
  const { isMobile } = useBreakpoint();
  const size = isMobile ? 46 : 92;

  return (
    <Animated.View entering={FadeInUp.duration(900)} style={styles.header}>
      <Text style={styles.eyebrow}>{eyebrow}</Text>
      <Text accessibilityRole="header" style={[styles.title, { fontSize: size, lineHeight: size * 0.95 }]}>
        {title}
        {italic ? <Text style={styles.italic}>{`\n${italic}`}</Text> : null}
      </Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  header: { gap: 20, paddingTop: 40, paddingBottom: 56 },
  eyebrow: { fontFamily: fonts.labelBold, fontSize: 14, letterSpacing: 4, color: colors.copperBright },
  title: { fontFamily: fonts.display, color: colors.ivory, letterSpacing: -2 },
  italic: { fontFamily: fonts.displayItalic, color: colors.ivoryDim },
  subtitle: { fontFamily: fonts.serif, fontSize: 20, lineHeight: 28, color: colors.ivoryDim, maxWidth: 620 },
});
