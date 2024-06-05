import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable } from 'react-native';

import palette from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';
import { colors } from 'react-native-elements';
import { useTheme } from '@react-navigation/native';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  const {colors} = useTheme();
  console.log('colors', colors)

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.selectedIcon,
        tabBarInactiveTintColor: colors.icon,
        headerShown: useClientOnlyValue(false, true),
        tabBarStyle: {
          backgroundColor: colors.card,
          borderColor: colors.background
          // Set your desired background color here
          // Additional styles can be added here if needed
        },
        headerStyle: {
          backgroundColor: colors.background,
        },
        headerShadowVisible: false,
        headerTintColor: colors.buttonText, // Color of the header title and buttons
        headerTitleStyle: {
          fontWeight: 'bold', // Example for setting font weight of the title
        }
      }}
    >

      <Tabs.Screen
        name="index"
        options={{
          href: null,
          headerShown: false,
          tabBarIcon: ({ focused, color }) => (
            <TabBarIcon name="home" color={color} />
          )

        }}
      />
      <Tabs.Screen
        name="rations"
        options={{
          href: null,
          headerShown: false
        }}
      />

      <Tabs.Screen
        name="pets"
        options={{
          title: 'Mes animaux',
          headerShown: false,
          tabBarIcon: ({ focused, color }) => (
            <TabBarIcon name="paw" color={color} />
          )
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Mon profil',
          // headerShown: false,
          tabBarIcon: ({ focused, color }) => (
            <TabBarIcon name='user' color={color} />
          )
        }}
      />
    </Tabs>
  );
}
