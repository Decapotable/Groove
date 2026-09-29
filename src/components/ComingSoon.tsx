import { StyleSheet, Text, View } from 'react-native';

import { colors } from '@/constants/colors';
import { fonts } from '@/constants/typography';

/** Page provisoire pour les routes pas encore construites. */
export function ComingSoon({ title, eyebrow = "COMING SOON" }: { title: string; eyebrow?: string }) {
  return (
    <View style={styles.container}>
      <Text style={styles.eyebrow}>{eyebrow}</Text>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 16, padding: 24 },
  eyebrow: { fontFamily: fonts.labelBold, fontSize: 14, letterSpacing: 4, color: colors.copperBright },
  title: { fontFamily: fonts.display, fontSize: 56, color: colors.ivory, textAlign: 'center' },
});
