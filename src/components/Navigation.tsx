import { StyleSheet, View } from 'react-native';

import { Logo } from '@/components/Logo';
import { NavLink } from '@/components/NavLink';
import { layout } from '@/constants/layout';
import { desktopLinks } from '@/constants/routes';
import { useBreakpoint } from '@/hooks/use-breakpoint';

/** Navigation haute (tablette / desktop). */
export function Navigation() {
  const { gutter } = useBreakpoint();

  return (
    <View style={[styles.bar, { paddingHorizontal: gutter }]} role="navigation">
      <View style={styles.inner}>
        <Logo size={28} />
        <View style={styles.links}>
          {desktopLinks.map((item) => (
            <NavLink key={item.href} label={item.label} href={item.href} />
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: { height: layout.navHeightDesktop, justifyContent: 'center', zIndex: 5 },
  inner: {
    width: '100%',
    maxWidth: layout.maxContentWidth,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  links: { flexDirection: 'row', gap: 44 },
});
