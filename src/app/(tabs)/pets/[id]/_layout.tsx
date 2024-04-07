import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Stack, Tabs, useLocalSearchParams } from "expo-router";
import { usePet } from "@/api/pets";
import { ActivityIndicator } from "react-native";
import { Text } from "react-native";

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

export default function PetStack () {
  // const colorScheme = useColorScheme();

  const { id } = useLocalSearchParams();
  const { data: pet, isLoading, error } = usePet(id)

  if (isLoading) return <ActivityIndicator/>
  if (error) return <Text>Error</Text>

  return <Stack>

    <Stack.Screen
      name="index"
      options={{ title: 'Animal' }}
    />
    <Stack.Screen
      name="new_weight"
      options={{ title: `Enregistrez un poids pour ${pet.name}` }}
    />

  </Stack>;
}
