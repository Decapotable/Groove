import { createContext, useContext, useState, type ReactNode } from 'react';
import type { LayoutChangeEvent, StyleProp, ViewStyle } from 'react-native';
import { useWindowDimensions } from 'react-native';
import Animated, {
  useAnimatedRef,
  useAnimatedStyle,
  useScrollOffset,
  type SharedValue,
} from 'react-native-reanimated';

import { layout } from '@/constants/layout';

const ScrollContext = createContext<SharedValue<number> | null>(null);

type ScrollProps = {
  children: ReactNode;
  contentContainerStyle?: StyleProp<ViewStyle>;
};

/** ScrollView qui expose son offset aux blocs `Reveal` enfants. */
export function RevealScrollView({ children, contentContainerStyle }: ScrollProps) {
  const ref = useAnimatedRef<Animated.ScrollView>();
  const offset = useScrollOffset(ref);

  return (
    <ScrollContext.Provider value={offset}>
      <Animated.ScrollView
        ref={ref}
        style={{ flex: 1 }}
        contentContainerStyle={contentContainerStyle}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
      >
        {children}
      </Animated.ScrollView>
    </ScrollContext.Provider>
  );
}

const APPEAR_DISTANCE = 0.22;

/**
 * Bloc qui apparaît (fondu + glissement) quand il entre dans la fenêtre.
 * Doit être un enfant direct du contenu d'un `RevealScrollView`.
 */
export function Reveal({ children, style }: { children: ReactNode; style?: StyleProp<ViewStyle> }) {
  const offset = useContext(ScrollContext);
  const { height } = useWindowDimensions();
  const [top, setTop] = useState(0);

  const animated = useAnimatedStyle(() => {
    if (!offset) return { opacity: 1 };
    const visible = offset.get() + height - top;
    const progress = Math.min(Math.max(visible / (height * APPEAR_DISTANCE), 0), 1);
    return { opacity: progress, transform: [{ translateY: (1 - progress) * 48 }] };
  });

  return (
    <Animated.View
      onLayout={(event: LayoutChangeEvent) => setTop(event.nativeEvent.layout.y)}
      style={[{ width: '100%', maxWidth: layout.maxContentWidth, alignSelf: 'center' }, style, animated]}
    >
      {children}
    </Animated.View>
  );
}
