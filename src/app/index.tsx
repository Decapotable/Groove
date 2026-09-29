import { StyleSheet, Text } from 'react-native';

import { FeaturedRecords } from '@/components/FeaturedRecords';
import { Hero } from '@/components/Hero';
import { Reveal } from '@/components/ScrollReveal';
import { Screen } from '@/components/Screen';
import { colors } from '@/constants/colors';
import { fonts } from '@/constants/typography';

export default function HomeScreen() {
  return (
    <Screen>
      <Hero />
      <FeaturedRecords />
      <Reveal style={styles.footer}>
        <Text style={styles.footerText}>LISTEN. EXPLORE. REMEMBER.</Text>
        <Text style={styles.footerText}>GROOVE — THE SOUND OF JAZZ</Text>
      </Reveal>
    </Screen>
  );
}

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
    paddingTop: 28,
    borderTopWidth: 1,
    borderTopColor: colors.blackLine,
  },
  footerText: { fontFamily: fonts.label, fontSize: 13, letterSpacing: 3.2, color: colors.warmGrey },
});
