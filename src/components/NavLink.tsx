import { Link, usePathname, type Href } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors } from '@/constants/colors';
import { isActiveRoute } from '@/constants/routes';
import { fonts } from '@/constants/typography';

type Props = { label: string; href: Href; onPress?: () => void };

export function NavLink({ label, href, onPress }: Props) {
  const pathname = usePathname();
  const [hovered, setHovered] = useState(false);
  const active = typeof href === 'string' && isActiveRoute(pathname, href);

  return (
    <Link href={href} asChild>
      <Pressable
        accessibilityRole="link"
        accessibilityState={{ selected: active }}
        onPress={onPress}
        onHoverIn={() => setHovered(true)}
        onHoverOut={() => setHovered(false)}
        style={styles.link}
      >
        <Text style={[styles.label, (active || hovered) && styles.labelActive]}>{label}</Text>
        <View style={[styles.underline, (active || hovered) && styles.underlineOn]} />
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  link: { paddingVertical: 6, cursor: 'pointer' },
  label: { fontFamily: fonts.labelBold, fontSize: 15, letterSpacing: 3.4, color: colors.ivoryDim },
  labelActive: { color: colors.ivory },
  underline: { height: 1.5, marginTop: 4, backgroundColor: 'transparent' },
  underlineOn: { backgroundColor: colors.copper },
});
