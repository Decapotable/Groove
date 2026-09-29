import {
  BarlowCondensed_500Medium,
  BarlowCondensed_600SemiBold,
  BarlowCondensed_700Bold,
} from '@expo-google-fonts/barlow-condensed';
import {
  Fraunces_400Regular,
  Fraunces_400Regular_Italic,
  Fraunces_900Black,
} from '@expo-google-fonts/fraunces';
import { DarkTheme, Stack, ThemeProvider } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';

import { Grain } from '@/components/Grain';
import { MiniPlayer } from '@/components/MiniPlayer';
import { MobileHeader } from '@/components/MobileHeader';
import { MobileNavigation } from '@/components/MobileNavigation';
import { Navigation } from '@/components/Navigation';
import { colors } from '@/constants/colors';
import { useBreakpoint } from '@/hooks/use-breakpoint';

SplashScreen.preventAutoHideAsync();

const grooveTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: colors.black,
    card: colors.black,
    text: colors.ivory,
    border: colors.blackLine,
    primary: colors.copper,
  },
};

export default function RootLayout() {
  const { isMobile } = useBreakpoint();
  const [fontsLoaded, fontError] = useFonts({
    Fraunces_900Black,
    Fraunces_400Regular,
    Fraunces_400Regular_Italic,
    BarlowCondensed_500Medium,
    BarlowCondensed_600SemiBold,
    BarlowCondensed_700Bold,
  });
  const ready = fontsLoaded || fontError;

  useEffect(() => {
    if (ready) SplashScreen.hideAsync();
  }, [ready]);

  if (!ready) return null;

  return (
    <ThemeProvider value={grooveTheme}>
      <StatusBar style="light" />
      <View style={styles.root}>
        {isMobile ? <MobileHeader /> : <Navigation />}
        <View style={styles.content}>
          <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.black } }} />
        </View>
        <MiniPlayer />
        {isMobile && <MobileNavigation />}
        <Grain />
      </View>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.black },
  content: { flex: 1 },
});
