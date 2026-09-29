import type { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';

import { RecordCard } from '@/components/RecordCard';
import type { Album } from '@/data/albums';
import { useBreakpoint } from '@/hooks/use-breakpoint';

type Columns = { mobile: number; tablet: number; desktop: number };

type Props = {
  albums: readonly Album[];
  onSelect: (album: Album) => void;
  columns?: Columns;
  /** Décale une carte sur deux vers le bas (composition éditoriale, desktop uniquement). */
  staggered?: boolean;
  /** Contenu sous chaque carte (ex. bouton « Remove »). */
  renderExtra?: (album: Album) => ReactNode;
};

const DEFAULT_COLUMNS: Columns = { mobile: 2, tablet: 3, desktop: 4 };

/** Grille responsive de cartes d'albums. */
export function RecordGrid({ albums, onSelect, columns = DEFAULT_COLUMNS, staggered, renderExtra }: Props) {
  const { breakpoint, isMobile, isDesktop, contentWidth } = useBreakpoint();
  const count = columns[breakpoint];
  const gap = isMobile ? 18 : 36;
  const cardSize = Math.floor((contentWidth - gap * (count - 1)) / count);

  return (
    <View style={[styles.grid, { gap }]}>
      {albums.map((album, index) => (
        <Animated.View
          key={album.id}
          entering={FadeInUp.duration(900).delay(Math.min(index, 8) * 90)}
          style={staggered && isDesktop && index % 2 === 1 ? styles.offset : undefined}
        >
          <RecordCard album={album} size={cardSize} onPress={onSelect} />
          {renderExtra?.(album)}
        </Animated.View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: { flexDirection: 'row', flexWrap: 'wrap' },
  offset: { marginTop: 56 },
});
