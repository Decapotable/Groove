import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors } from '@/constants/colors';
import { fonts } from '@/constants/typography';

type Props = {
  options: readonly string[];
  selected: string;
  onSelect: (option: string) => void;
};

/** Rangée de filtres exclusifs, façon onglets éditoriaux. */
export function FilterChips({ options, selected, onSelect }: Props) {
  return (
    <View accessibilityRole="tablist" style={styles.row}>
      {options.map((option) => {
        const active = option === selected;
        return (
          <Pressable
            key={option}
            accessibilityRole="tab"
            accessibilityState={{ selected: active }}
            onPress={() => onSelect(option)}
            style={[styles.chip, active && styles.chipActive]}
          >
            <Text style={[styles.label, active && styles.labelActive]}>{option.toUpperCase()}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  chip: {
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderWidth: 1,
    borderColor: colors.blackLine,
    borderRadius: 999,
    cursor: 'pointer',
  },
  chipActive: { backgroundColor: colors.copper, borderColor: colors.copper },
  label: { fontFamily: fonts.labelBold, fontSize: 13, letterSpacing: 2.6, color: colors.ivoryDim },
  labelActive: { color: colors.black },
});
