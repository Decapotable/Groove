import { Link } from 'expo-router';
import { StyleSheet, Text } from 'react-native';

import { colors } from '@/constants/colors';
import { fonts } from '@/constants/typography';

export function Logo({ size = 26 }: { size?: number }) {
  return (
    <Link href="/" accessibilityLabel="GROOVE, home">
      <Text style={[styles.logo, { fontSize: size, letterSpacing: size * 0.14 }]}>GROOVE</Text>
    </Link>
  );
}

const styles = StyleSheet.create({ logo: { fontFamily: fonts.display, color: colors.ivory } });
