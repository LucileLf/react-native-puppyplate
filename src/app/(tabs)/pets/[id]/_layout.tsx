import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Stack, Tabs, useLocalSearchParams } from "expo-router";
import { usePet } from "@/api/pets";
import { ActivityIndicator } from "react-native";
import { Text } from "react-native";
import { useTheme } from "@react-navigation/native";

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
  const {colors} = useTheme();

  const { id } = useLocalSearchParams();
  const { data: pet, isLoading, error } = usePet(id)

  if (isLoading) return <ActivityIndicator/>
  if (error) return <Text>Error</Text>

  return <Stack
    screenOptions={{
      headerStyle: {
        backgroundColor: colors.background, // Background color of the header
      },
      headerTintColor: colors.buttonText, // Color of the header title and buttons
      headerTitleStyle: {
        fontWeight: 'bold', // Example for setting font weight of the title
      }
    }}
  >

    {/* <Stack.Screen
      name="index"
      options={{ title: 'Animal' }}
    /> */}
    <Stack.Screen
      name="new-weight"
      options={{
        title: `Enregistrez un poids pour ${pet.name}`,
        headerTitleStyle: {
          // fontFamily: 'YourFontFamily',
          fontSize: 16,
        }
      }}
    />
    <Stack.Screen
      name="new-ration"
      options={{
        title: `Créez une ration pour ${pet.name}`,
        headerTitleStyle: {
          fontWeight: 'bold',
        }
      }}
    />
    <Stack.Screen
      name="rations"
      options={{ title: `Ration`}}
    />

  </Stack>;
}
