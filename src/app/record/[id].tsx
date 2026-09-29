import { Link, useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { ComingSoon } from '@/components/ComingSoon';
import { RecordDetail } from '@/components/RecordDetail';
import { RecordGrid } from '@/components/RecordGrid';
import { Reveal } from '@/components/ScrollReveal';
import { Screen } from '@/components/Screen';
import { colors } from '@/constants/colors';
import { fonts } from '@/constants/typography';
import { albums, getAlbum } from '@/data/albums';
import { useOpenRecord } from '@/hooks/use-open-record';

export default function RecordScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const openRecord = useOpenRecord();
  const album = getAlbum(id);

  if (!album) return <NotFound />;

  const decade = Math.floor(album.year / 10) * 10;
  const related = albums.filter((other) => other.id !== album.id && Math.floor(other.year / 10) * 10 === decade).slice(0, 4);

  return (
    <Screen>
      <RecordDetail album={album} />
      {related.length > 0 && (
        <Reveal style={styles.related}>
          <Text style={styles.eyebrow}>MORE FROM THE {decade}s</Text>
          <RecordGrid albums={related} onSelect={openRecord} />
        </Reveal>
      )}
    </Screen>
  );
}

function NotFound() {
  return (
    <View style={styles.notFound}>
      <ComingSoon eyebrow="404" title="Record not found" />
      <Link href="/records" style={styles.link}>
        BROWSE ALL RECORDS
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  related: { paddingTop: 120, gap: 40 },
  eyebrow: { fontFamily: fonts.labelBold, fontSize: 14, letterSpacing: 4, color: colors.copperBright },
  notFound: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  link: { fontFamily: fonts.labelBold, fontSize: 15, letterSpacing: 3.4, color: colors.copperBright, paddingBottom: 80 },
});
