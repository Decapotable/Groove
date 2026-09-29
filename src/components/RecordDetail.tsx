import { StyleSheet, Text, View } from 'react-native';
import Animated, { FadeIn, FadeInUp } from 'react-native-reanimated';

import { Button } from '@/components/Button';
import { InfoList } from '@/components/InfoList';
import { PlaybackStatus } from '@/components/PlaybackStatus';
import { RecordStage } from '@/components/RecordStage';
import { colors } from '@/constants/colors';
import { layout } from '@/constants/layout';
import { fonts } from '@/constants/typography';
import type { Album } from '@/data/albums';
import { useAlbumPlayback } from '@/hooks/use-album-playback';
import { useBreakpoint } from '@/hooks/use-breakpoint';
import { useCollectionStore, useIsInCollection } from '@/store/collectionStore';

/** Vue immersive d'un disque : pochette, vinyle qui sort, fiche, actions. */
export function RecordDetail({ album }: { album: Album }) {
  const { isDesktop, isMobile, contentWidth, height } = useBreakpoint();
  const { status, toggle } = useAlbumPlayback(album.id);
  const inCollection = useIsInCollection(album.id);
  const toggleCollection = useCollectionStore((state) => state.toggle);

  const stageSize = isDesktop
    ? Math.min(contentWidth * 0.4, Math.max(height - 260, 300), 600)
    : Math.min(contentWidth / 1.55, 480);

  const info = [
    { label: 'ALBUM', value: album.title },
    { label: 'ARTIST', value: album.artist },
    { label: 'YEAR', value: String(album.year) },
    { label: 'GENRE', value: album.genre },
    { label: 'DURATION', value: `${album.minutes} min` },
  ];

  return (
    <View style={[styles.wrap, isDesktop && styles.wrapDesktop]}>
      <Animated.View entering={FadeIn.duration(1200)} style={[styles.stage, !isDesktop && styles.stageStacked]}>
        <RecordStage album={album} status={status} size={stageSize} revealed onPress={toggle} />
      </Animated.View>

      <Animated.View entering={FadeInUp.duration(1000).delay(300)} style={[styles.panel, isDesktop && styles.panelDesktop]}>
        <Text style={styles.eyebrow}>{album.genre.toUpperCase()} — {album.year}</Text>
        <Text accessibilityRole="header" style={[styles.title, { fontSize: isMobile ? 44 : 68, lineHeight: isMobile ? 46 : 68 }]}>
          {album.title}
        </Text>
        <Text style={styles.artist}>{album.artist}</Text>
        <Text style={styles.note}>{album.note}</Text>
        <InfoList items={info} />
        <View style={styles.actions}>
          <Button
            label={status === 'playing' ? 'PAUSE' : 'PLAY'}
            icon={status === 'playing' ? 'pause' : 'play'}
            onPress={toggle}
          />
          <Button
            label={inCollection ? 'IN YOUR COLLECTION' : 'ADD TO COLLECTION'}
            variant="outline"
            onPress={() => toggleCollection(album.id)}
            accessibilityLabel={inCollection ? `Remove ${album.title} from collection` : `Add ${album.title} to collection`}
          />
          <PlaybackStatus status={status} />
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { width: '100%', maxWidth: layout.maxContentWidth, alignSelf: 'center', gap: 48, paddingTop: 32 },
  wrapDesktop: { flexDirection: 'row', alignItems: 'center', gap: 72, minHeight: 640 },
  stage: { zIndex: 2 },
  stageStacked: { alignSelf: 'center' },
  panel: { gap: 18 },
  panelDesktop: { flex: 1, maxWidth: 560 },
  eyebrow: { fontFamily: fonts.labelBold, fontSize: 14, letterSpacing: 4, color: colors.copperBright },
  title: { fontFamily: fonts.display, color: colors.ivory, letterSpacing: -1.5 },
  artist: { fontFamily: fonts.displayItalic, fontSize: 28, color: colors.ivoryDim },
  note: { fontFamily: fonts.serif, fontSize: 18, lineHeight: 26, color: colors.ivoryDim, marginBottom: 12 },
  actions: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', gap: 16, marginTop: 20 },
});
