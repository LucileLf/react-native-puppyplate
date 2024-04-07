import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Redirect, Stack, Tabs } from "expo-router";
import { useAuth } from "@/providers/AuthProvider";

export default function ProfileStack () {
  const {session, loading} = useAuth();

  // const colorScheme = useColorScheme();
  if(!session) {
    return <Redirect href='/' />
  }
  return <Stack>
   <Stack.Screen
        name="index"
        options={{ title: 'Mon profil' }}
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
