import type { ReactNode } from 'react';
import Animated, { FadeIn } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { RevealScrollView } from '@/components/ScrollReveal';
import { colors } from '@/constants/colors';
import { layout } from '@/constants/layout';
import { useBreakpoint } from '@/hooks/use-breakpoint';

/** Conteneur standard d'une page : fondu d'entrée, gouttières, espace pour le lecteur et la barre basse. */
export function Screen({ children }: { children: ReactNode }) {
  const insets = useSafeAreaInsets();
  const { gutter, isMobile } = useBreakpoint();
  const bottom = (isMobile ? layout.mobileNavHeight + insets.bottom : 0) + layout.playerHeightDesktop + 48;

  return (
    <Animated.View entering={FadeIn.duration(700)} style={{ flex: 1, backgroundColor: colors.black }}>
      <RevealScrollView contentContainerStyle={{ paddingHorizontal: gutter, paddingBottom: bottom }}>
        {children}
      </RevealScrollView>
    </Animated.View>
  );
}
