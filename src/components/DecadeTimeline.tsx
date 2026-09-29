import { ScrollView, StyleSheet, View } from 'react-native';

import { TimelineNode } from '@/components/TimelineNode';
import type { Decade } from '@/data/decades';
import { useBreakpoint } from '@/hooks/use-breakpoint';

type Props = {
  decades: readonly Decade[];
  selectedId: string;
  onSelect: (id: string) => void;
};

/** Timeline horizontale : répartie sur toute la largeur en desktop, défilante au doigt sur mobile. */
export function DecadeTimeline({ decades, selectedId, onSelect }: Props) {
  const { isMobile } = useBreakpoint();

  const nodes = decades.map((decade) => (
    <TimelineNode
      key={decade.id}
      label={decade.label}
      compact={isMobile}
      active={decade.id === selectedId}
      onPress={() => onSelect(decade.id)}
    />
  ));

  if (!isMobile) return <View accessibilityRole="tablist" style={styles.row}>{nodes}</View>;

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} accessibilityRole="tablist" contentContainerStyle={styles.scroll}>
      {nodes}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row' },
  scroll: { paddingRight: 24 },
});
