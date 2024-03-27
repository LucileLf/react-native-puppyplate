import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Stack, Tabs } from "expo-router";

export default function RationsStack () {
  // const colorScheme = useColorScheme();

  return <Stack>
   <Stack.Screen
        name="index"
        options={{ title: 'Mes recettes' }}
      />
   {/* <Stack.Screen
        name="[id]"
        options={{ title: 'Product details' }}
      /> */}

{/*
by default, title will be name of file (index, [id])
https://reactnavigation.org/docs/headers/#setting-the-header-title */}
  </Stack>;
}
