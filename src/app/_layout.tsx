import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { useColorScheme } from '@/components/useColorScheme';
import AuthProvider from '@/providers/AuthProvider';
import QueryProvider from '@/providers/QueryProvider';
// import { darkTheme, lightTheme } from '@/constants/theme'
import React from 'react';
import Colors from '@/constants/Colors'
import {green, purple, beige, black, lightgreen, orange, darkgray } from '@/constants/Colors'
import { Theme } from '@/types';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();


export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

const darkTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    // primary: 'red', //delete
    // background: '#3d3d3d', //light gray
    // card: '#d6d6d6',
    // text: '#3d3d3d',
    // comment: '#999999',
    // border: '#d6d6d6',
    // notification: 'rgb(255, 69, 58)',
    // buttonBackground: purple,
    // buttonText: '#fff',
    // icon: '#ffffff',
    // selectedIcon: purple
    primary: lightgreen,
    background: '#476360',
    card: beige,
    text: '#F5F5F5',
    border: black,
    notification: lightgreen,
    buttonBackground: lightgreen,
    buttonText: beige,
    icon: darkgray,
    selectedIcon: orange
  }
};

const lightTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#fa04ff',
    background: '#ebebeb', //light gray
    card: '#ffffff',
    text: '#000000',
    comment: '#999999',
    border: '#d6d6d6',
    notification: 'rgb(255, 69, 58)',
    buttonBackground: green,
    buttonText: '#fff',
    icon: '#d6d6d6',
    selectedIcon: green
  },
};

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  // const colorScheme = 'light';
  console.log('colorScheme',colorScheme);

  return (
    <ThemeProvider value={colorScheme === 'dark' ? darkTheme : lightTheme}>
      <QueryProvider>
        <AuthProvider>
          <Stack>
            {/* <Stack.Screen name="index" options={{ headerShown: false  }} /> */}
            <Stack.Screen name="(tabs)" options={{ headerShown: false  }} />
            <Stack.Screen name="(auth)" options={{ headerShown: false  }} />
            {/* <Stack.Screen name="modal" options={{ presentation: 'modal' }} /> */}
          </Stack>
        </AuthProvider>
      </QueryProvider>
    </ThemeProvider>
  );
}
