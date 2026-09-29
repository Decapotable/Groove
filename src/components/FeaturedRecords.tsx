import { StyleSheet, Text, View } from 'react-native';

import { RecordGrid } from '@/components/RecordGrid';
import { colors } from '@/constants/colors';
import { layout } from '@/constants/layout';
import { fonts } from '@/constants/typography';
import { featuredAlbumIds, getAlbums } from '@/data/albums';
import { useBreakpoint } from '@/hooks/use-breakpoint';
import { useOpenRecord } from '@/hooks/use-open-record';

const featured = getAlbums(featuredAlbumIds);

export function FeaturedRecords() {
  const { isMobile } = useBreakpoint();
  const openRecord = useOpenRecord();

  return (
    <View style={styles.section}>
      <View style={styles.header}>
        <Text style={styles.eyebrow}>01 — FEATURED RECORDS</Text>
        <Text style={[styles.heading, { fontSize: isMobile ? 40 : 64, lineHeight: isMobile ? 42 : 64 }]}>
          Records that{'\n'}
          <Text style={styles.headingItalic}>changed everything.</Text>
        </Text>
      </View>
      <RecordGrid albums={featured} onSelect={openRecord} columns={{ mobile: 2, tablet: 2, desktop: 4 }} staggered />
    </View>
  );
}

const styles = StyleSheet.create({
  section: { width: '100%', maxWidth: layout.maxContentWidth, alignSelf: 'center', paddingVertical: 96, gap: 56 },
  header: { gap: 18 },
  eyebrow: { fontFamily: fonts.labelBold, fontSize: 14, letterSpacing: 4, color: colors.copperBright },
  heading: { fontFamily: fonts.display, color: colors.ivory, letterSpacing: -1.5 },
  headingItalic: { fontFamily: fonts.displayItalic, color: colors.ivoryDim },
});
