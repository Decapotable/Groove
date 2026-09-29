import { Link, usePathname } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors } from '@/constants/colors';
import { layout } from '@/constants/layout';
import { isActiveRoute, mobileTabs } from '@/constants/routes';
import { fonts } from '@/constants/typography';

/** Barre de navigation basse (mobile). */
export function MobileNavigation() {
  const pathname = usePathname();
  const insets = useSafeAreaInsets();

  return (
    <View
      accessibilityRole="tablist"
      style={[styles.bar, { height: layout.mobileNavHeight + insets.bottom, paddingBottom: insets.bottom }]}
    >
      {mobileTabs.map((tab) => {
        const active = isActiveRoute(pathname, tab.href);
        return (
          <Link key={tab.href} href={tab.href} asChild>
            <Pressable accessibilityRole="tab" accessibilityState={{ selected: active }} style={styles.tab}>
              <View style={[styles.dot, active && styles.dotActive]} />
              <Text style={[styles.label, active && styles.labelActive]}>{tab.label}</Text>
            </Pressable>
          </Link>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    zIndex: 15,
    backgroundColor: colors.black,
    borderTopWidth: 1,
    borderTopColor: colors.blackLine,
  },
  tab: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 7 },
  dot: { width: 5, height: 5, borderRadius: 3, backgroundColor: 'transparent' },
  dotActive: { backgroundColor: colors.copperBright },
  label: { fontFamily: fonts.labelBold, fontSize: 12.5, letterSpacing: 2, color: colors.warmGrey },
  labelActive: { color: colors.ivory },
});
