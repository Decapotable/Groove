import { useMemo, useState } from 'react';
import { View } from 'react-native';

import { FilterChips } from '@/components/FilterChips';
import { PageHeader } from '@/components/PageHeader';
import { RecordGrid } from '@/components/RecordGrid';
import { Reveal } from '@/components/ScrollReveal';
import { Screen } from '@/components/Screen';
import { albums } from '@/data/albums';
import { useOpenRecord } from '@/hooks/use-open-record';

const ALL = 'All';
const genres = [ALL, ...Array.from(new Set(albums.map((album) => album.genre)))];

export default function RecordsScreen() {
  const [genre, setGenre] = useState(ALL);
  const openRecord = useOpenRecord();
  const visible = useMemo(
    () => albums.filter((album) => genre === ALL || album.genre === genre).sort((a, b) => a.year - b.year),
    [genre],
  );

  return (
    <Screen>
      <Reveal>
        <PageHeader
          eyebrow="03 — RECORDS"
          title="The archive,"
          italic="in order."
          subtitle={`${albums.length} records, from 1927 to today. Choose a sound.`}
        />
        <View style={{ marginBottom: 56 }}>
          <FilterChips options={genres} selected={genre} onSelect={setGenre} />
        </View>
        <RecordGrid key={genre} albums={visible} onSelect={openRecord} />
      </Reveal>
    </Screen>
  );
}
