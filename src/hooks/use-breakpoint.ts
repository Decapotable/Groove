import { useWindowDimensions } from 'react-native';

import { breakpoints, layout } from '@/constants/layout';

export type Breakpoint = 'mobile' | 'tablet' | 'desktop';

export function useBreakpoint() {
  const { width, height } = useWindowDimensions();
  const breakpoint: Breakpoint =
    width >= breakpoints.desktop ? 'desktop' : width >= breakpoints.tablet ? 'tablet' : 'mobile';
  const isMobile = breakpoint === 'mobile';
  const gutter = isMobile ? layout.gutterMobile : layout.gutterDesktop;
  const contentWidth = Math.max(Math.min(width, layout.maxContentWidth) - gutter * 2, 240);

  return { width, height, breakpoint, isMobile, isDesktop: breakpoint === 'desktop', gutter, contentWidth };
}
