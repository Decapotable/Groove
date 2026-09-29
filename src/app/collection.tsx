import { useRouter } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { Button } from '@/components/Button';
import { PageHeader } from '@/components/PageHeader';
import { RecordGrid } from '@/components/RecordGrid';
import { RemoveButton } from '@/components/RemoveButton';
import { Reveal } from '@/components/ScrollReveal';
import { Screen } from '@/components/Screen';
import { colors } from '@/constants/colors';
import { fonts } from '@/constants/typography';
import { getAlbums } from '@/data/albums';
import { useOpenRecord } from '@/hooks/use-open-record';
import { useCollectionStore } from '@/store/collectionStore';

export default function CollectionScreen() {
  const router = useRouter();
  const openRecord = useOpenRecord();
  const albumIds = useCollectionStore((state) => state.albumIds);
  const hydrated = useCollectionStore((state) => state.hydrated);
  const remove = useCollectionStore((state) => state.remove);
  const saved = getAlbums(albumIds);

  return (
    <Screen>
      <Reveal>
        <PageHeader
          eyebrow="04 — COLLECTION"
          title="Your"
          italic="collection."
          subtitle={hydrated ? `${saved.length} ${saved.length === 1 ? 'record' : 'records'} saved on this device.` : undefined}
        />
        {hydrated && saved.length === 0 && (
          <View style={styles.empty}>
            <Text style={styles.emptyTitle}>Turn the record.</Text>
            <Text style={styles.emptyText}>Nothing here yet. Add a record from its page and it will wait for you here.</Text>
            <Button label="BROWSE RECORDS" onPress={() => router.push('/records')} />
          </View>
        )}
        {saved.length > 0 && (
          <RecordGrid
            albums={saved}
            onSelect={openRecord}
            renderExtra={(album) => <RemoveButton title={album.title} onPress={() => remove(album.id)} />}
          />
        )}
      </Reveal>
    </Screen>
  );
}

const styles = StyleSheet.create({
  empty: { gap: 24, paddingVertical: 48, borderTopWidth: 1, borderTopColor: colors.blackLine, maxWidth: 560 },
  emptyTitle: { fontFamily: fonts.displayItalic, fontSize: 40, color: colors.ivory },
  emptyText: { fontFamily: fonts.serif, fontSize: 18, lineHeight: 26, color: colors.ivoryDim },
});
