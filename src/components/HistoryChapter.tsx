import { Pressable, StyleSheet, Text, View } from 'react-native';

import { AlbumCover } from '@/components/AlbumCover';
import { SleeveWithDisc } from '@/components/SleeveWithDisc';
import { colors } from '@/constants/colors';
import { fonts } from '@/constants/typography';
import { getAlbums } from '@/data/albums';
import type { Chapter } from '@/data/history';
import { useBreakpoint } from '@/hooks/use-breakpoint';
import { useOpenRecord } from '@/hooks/use-open-record';

type Props = { chapter: Chapter; index: number };

/** Un chapitre de l'histoire du jazz, composé comme une double page de magazine. */
export function HistoryChapter({ chapter, index }: Props) {
  const { isDesktop, isMobile, contentWidth } = useBreakpoint();
  const openRecord = useOpenRecord();
  const albums = getAlbums(chapter.albumIds);
  const [lead, ...others] = albums;
  const flipped = isDesktop && index % 2 === 1;
  const periodSize = isMobile ? 96 : isDesktop ? 220 : 150;
  const coverSize = isDesktop ? Math.min(contentWidth * 0.3, 420) : Math.min(contentWidth / 1.4, 420);

  return (
    <View style={[styles.chapter, isDesktop && styles.chapterDesktop, flipped && styles.chapterFlipped]}>
      <View style={styles.text}>
        <Text style={styles.index}>Nº {String(index + 1).padStart(2, '0')}</Text>
        <Text style={[styles.period, { fontSize: periodSize, lineHeight: periodSize * 0.88, letterSpacing: -periodSize * 0.045 }]}>
          {chapter.period}
        </Text>
        <Text accessibilityRole="header" style={[styles.title, { fontSize: isMobile ? 30 : 42, lineHeight: isMobile ? 34 : 48 }]}>
          {chapter.title}
        </Text>
        <Text style={styles.body}>{chapter.text}</Text>
        <Text style={styles.artists}>{chapter.artists.join('  /  ')}</Text>
        {others.length > 0 && (
          <View style={styles.minis}>
            {others.map((album) => (
              <Pressable
                key={album.id}
                accessibilityRole="button"
                accessibilityLabel={`${album.title}, ${album.artist}`}
                onPress={() => openRecord(album)}
                style={styles.mini}
              >
                <AlbumCover album={album} size={96} showText={false} />
              </Pressable>
            ))}
          </View>
        )}
      </View>
      {lead && (
        <View style={styles.art}>
          <SleeveWithDisc album={lead} size={coverSize} onPress={() => openRecord(lead)} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  chapter: { gap: 40, paddingVertical: 72, borderTopWidth: 1, borderTopColor: colors.blackLine },
  chapterDesktop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 72 },
  chapterFlipped: { flexDirection: 'row-reverse' },
  text: { flex: 1, gap: 20, maxWidth: 680 },
  index: { fontFamily: fonts.labelBold, fontSize: 14, letterSpacing: 4, color: colors.copperBright },
  period: { fontFamily: fonts.display, color: colors.ivory },
  title: { fontFamily: fonts.displayItalic, color: colors.ivoryDim, marginTop: 8 },
  body: { fontFamily: fonts.serif, fontSize: 19, lineHeight: 30, color: colors.ivoryDim },
  artists: { fontFamily: fonts.label, fontSize: 15, letterSpacing: 2.2, lineHeight: 26, color: colors.warmGrey, textTransform: 'uppercase' },
  minis: { flexDirection: 'row', gap: 14, marginTop: 8 },
  mini: { cursor: 'pointer' },
  art: { alignItems: 'center' },
});
