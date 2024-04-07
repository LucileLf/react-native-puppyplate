import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Stack, Tabs } from "expo-router";
// import { Pressable } from "react-native";

// import Colors from "@/constants/Colors";
// import { useColorScheme } from "@/components/useColorScheme";
// import { useClientOnlyValue } from "@/components/useClientOnlyValue";

// // You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
// function TabBarIcon(props: {
//   name: React.ComponentProps<typeof FontAwesome>["name"];
//   color: string;
// }) {
//   return <FontAwesome size={20} style={{ marginBottom: -3 }} {...props} />;
// }

export default function PetsStack () {
  // const colorScheme = useColorScheme();

  return <Stack>
   <Stack.Screen
        name="index"
        options={{ title: 'Mes animaux' }}
      />
   <Stack.Screen
        name="[id]"
        options={{ title: 'AnimalName', headerShown: false }}
      />
   <Stack.Screen
        name="new"
        options={{ title: 'Ajouter un animal' }}
      />

{/*
by default, title will be name of file (index, [id])
https://reactnavigation.org/docs/headers/#setting-the-header-title */}
  </Stack>;
}
