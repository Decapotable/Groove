import { Pressable, StyleSheet, Text } from 'react-native';

import { colors } from '@/constants/colors';
import { fonts } from '@/constants/typography';

export function RemoveButton({ title, onPress }: { title: string; onPress: () => void }) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`Remove ${title} from collection`}
      onPress={onPress}
      hitSlop={8}
      style={styles.button}
    >
      <Text style={styles.label}>REMOVE</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: { alignSelf: 'flex-start', marginTop: 12, paddingVertical: 4, cursor: 'pointer' },
  label: {
    fontFamily: fonts.labelBold,
    fontSize: 13,
    letterSpacing: 3,
    color: colors.warmGrey,
    textDecorationLine: 'underline',
  },
});
