import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';

import { Logo } from '@/components/Logo';
import { NavLink } from '@/components/NavLink';
import { colors } from '@/constants/colors';
import { layout } from '@/constants/layout';
import { menuLinks } from '@/constants/routes';

/** Header mobile : logo + hamburger qui déplie un menu plein écran. */
export function MobileHeader() {
  const insets = useSafeAreaInsets();
  const [open, setOpen] = useState(false);

  return (
    <View style={[styles.wrap, { paddingTop: insets.top }]} role="navigation">
      <View style={styles.bar}>
        <Logo size={24} />
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={open ? 'Close menu' : 'Open menu'}
          accessibilityState={{ expanded: open }}
          hitSlop={12}
          onPress={() => setOpen((value) => !value)}
        >
          <Svg width={28} height={20} viewBox="0 0 28 20">
            {open ? (
              <Path d="M4 2 L24 18 M24 2 L4 18" stroke={colors.ivory} strokeWidth={2} />
            ) : (
              <Path d="M0 3 H28 M8 10 H28 M0 17 H28" stroke={colors.ivory} strokeWidth={2} />
            )}
          </Svg>
        </Pressable>
      </View>
      {open && (
        <Animated.View entering={FadeIn.duration(350)} exiting={FadeOut.duration(250)} style={styles.menu}>
          {menuLinks.map((item) => (
            <NavLink key={item.href} label={item.label} href={item.href} onPress={() => setOpen(false)} />
          ))}
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { zIndex: 20, backgroundColor: colors.black },
  bar: {
    height: 64,
    paddingHorizontal: layout.gutterMobile,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  menu: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    gap: 22,
    paddingHorizontal: layout.gutterMobile,
    paddingVertical: 32,
    backgroundColor: colors.black,
    borderBottomWidth: 1,
    borderBottomColor: colors.blackLine,
  },
});
