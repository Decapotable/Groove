import { StyleSheet, Text, View } from 'react-native';
import Animated, { FadeIn, FadeInUp } from 'react-native-reanimated';

import { RecordGrid } from '@/components/RecordGrid';
import { colors } from '@/constants/colors';
import { fonts } from '@/constants/typography';
import { getAlbums } from '@/data/albums';
import type { Decade } from '@/data/decades';
import { useBreakpoint } from '@/hooks/use-breakpoint';
import { useOpenRecord } from '@/hooks/use-open-record';

/** Contenu d'une décennie : grand libellé, phrase d'accroche, artistes, albums. À remonter (key) à chaque changement. */
export function DecadePanel({ decade }: { decade: Decade }) {
  const { isMobile, isDesktop } = useBreakpoint();
  const openRecord = useOpenRecord();
  const size = isMobile ? 88 : 200;
  const albums = [...getAlbums(decade.albumIds)].sort((a, b) => a.year - b.year);

  return (
    <Animated.View entering={FadeIn.duration(600)} style={styles.panel}>
      <View style={[styles.intro, isDesktop && styles.introDesktop]}>
        <Animated.Text
          entering={FadeInUp.duration(900)}
          style={[styles.year, { fontSize: size, lineHeight: size * 0.9, letterSpacing: -size * 0.04 }]}
        >
          {decade.label}
        </Animated.Text>
        <Animated.View entering={FadeInUp.duration(900).delay(150)} style={styles.meta}>
          <Text style={[styles.headline, { fontSize: isMobile ? 28 : 40, lineHeight: isMobile ? 32 : 46 }]}>{decade.headline}</Text>
          <Text style={styles.eyebrow}>KEY ARTISTS</Text>
          <Text style={styles.artists}>{decade.artists.join('  /  ')}</Text>
        </Animated.View>
      </View>
      <RecordGrid albums={albums} onSelect={openRecord} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  panel: { gap: 56, paddingTop: 48 },
  intro: { gap: 28 },
  introDesktop: { flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', gap: 56 },
  year: { fontFamily: fonts.display, color: colors.ivory },
  meta: { gap: 14, maxWidth: 520, flexShrink: 1 },
  headline: { fontFamily: fonts.displayItalic, color: colors.ivoryDim },
  eyebrow: { fontFamily: fonts.labelBold, fontSize: 13, letterSpacing: 4, color: colors.copperBright, marginTop: 10 },
  artists: { fontFamily: fonts.label, fontSize: 17, letterSpacing: 2, lineHeight: 28, color: colors.ivoryDim, textTransform: 'uppercase' },
});
