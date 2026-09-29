import { StyleSheet, Text, View } from 'react-native';

import { colors } from '@/constants/colors';
import { fonts } from '@/constants/typography';

type Props = { items: readonly { label: string; value: string }[] };

/** Liste « étiquette / valeur » façon fiche technique de pochette. */
export function InfoList({ items }: Props) {
  return (
    <View style={styles.list}>
      {items.map((item) => (
        <View key={item.label} style={styles.row}>
          <Text style={styles.label}>{item.label}</Text>
          <Text style={styles.value}>{item.value}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  list: { borderTopWidth: 1, borderTopColor: colors.blackLine },
  row: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    gap: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.blackLine,
  },
  label: { fontFamily: fonts.labelBold, fontSize: 13, letterSpacing: 3.4, color: colors.warmGrey },
  value: { flexShrink: 1, fontFamily: fonts.display, fontSize: 22, color: colors.ivory, textAlign: 'right' },
});
