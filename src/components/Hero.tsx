import { StyleSheet, Text, View } from 'react-native';
import Animated, { FadeIn, FadeInUp } from 'react-native-reanimated';

import { Button } from '@/components/Button';
import { HeroTitle } from '@/components/HeroTitle';
import { PlaybackStatus } from '@/components/PlaybackStatus';
import { RecordStage } from '@/components/RecordStage';
import { colors } from '@/constants/colors';
import { layout } from '@/constants/layout';
import { fonts } from '@/constants/typography';
import { useBreakpoint } from '@/hooks/use-breakpoint';
import { useCurrentAlbum, usePlayerStore } from '@/store/playerStore';

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

export function Hero() {
  const { height, isMobile, isDesktop, contentWidth } = useBreakpoint();
  const album = useCurrentAlbum();
  const status = usePlayerStore((state) => state.status);
  const toggle = usePlayerStore((state) => state.toggle);

  const availableHeight = height - (isMobile ? layout.mobileNavHeight + 120 : layout.navHeightDesktop + 96);
  const stageSize = isDesktop
    ? clamp(Math.min(contentWidth * 0.34, availableHeight * 0.9), 260, 560)
    : Math.min(contentWidth / 1.55, 460);
  const titleSize = isDesktop ? clamp(contentWidth * 0.118, 96, 176) : clamp(contentWidth / 5.3, 56, 120);

  const action = (
    <View style={styles.actions}>
      <Button
        label={status === 'playing' ? 'PAUSE RECORD' : status === 'paused' ? 'RESUME RECORD' : 'PLAY RECORD'}
        icon={status === 'playing' ? 'pause' : 'play'}
        onPress={toggle}
      />
      <PlaybackStatus status={status} />
    </View>
  );

  const copy = (
    <View style={styles.copy}>
      <HeroTitle fontSize={titleSize} />
      <Animated.Text entering={FadeInUp.duration(1000).delay(900)} style={styles.tagline}>
        Discover the history of jazz.
      </Animated.Text>
      <Animated.View entering={FadeInUp.duration(1000).delay(1100)}>{action}</Animated.View>
    </View>
  );

  const stage = (
    <Animated.View entering={FadeIn.duration(1600).delay(500)} style={isDesktop ? styles.stageDesktop : styles.stageStacked}>
      <RecordStage album={album} status={status} size={stageSize} onPress={toggle} />
      <View style={[styles.caption, { width: stageSize * 1.55 }]}>
        <Text style={styles.captionIndex}>Nº 001</Text>
        <Text style={styles.captionText} numberOfLines={1}>
          {album.artist} — {album.title}, {album.year}
        </Text>
      </View>
    </Animated.View>
  );

  return (
    <View style={[styles.hero, isDesktop ? styles.heroDesktop : styles.heroStacked]}>
      {copy}
      {stage}
    </View>
  );
}

const styles = StyleSheet.create({
  hero: { width: '100%', maxWidth: layout.maxContentWidth, alignSelf: 'center' },
  heroDesktop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 720,
    paddingTop: 24,
  },
  heroStacked: { gap: 36, paddingTop: 20, paddingBottom: 24 },
  copy: { gap: 30, zIndex: 1 },
  tagline: { fontFamily: fonts.serif, fontSize: 22, color: colors.ivoryDim, fontStyle: 'italic' },
  actions: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', gap: 28 },
  stageDesktop: { zIndex: 2, marginLeft: -120 },
  stageStacked: { alignSelf: 'center', alignItems: 'center' },
  caption: { flexDirection: 'row', alignItems: 'baseline', gap: 14, marginTop: 28 },
  captionIndex: { fontFamily: fonts.labelBold, fontSize: 13, letterSpacing: 3, color: colors.copperBright },
  captionText: { flex: 1, fontFamily: fonts.label, fontSize: 15, letterSpacing: 2, color: colors.warmGrey },
});
