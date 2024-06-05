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
      options={{ title: 'Mon profil', headerShown: false}}
    />
   {/* <Stack.Screen
        name="[id]"
        options={{ title: 'Modifier mon profil details' }}
      /> */}
   {/* <Stack.Screen
        name="[id]"
        options={{ title: 'Inviter' }}
      /> */}
   {/* <Stack.Screen
        name="[id]"
        options={{ title: 'ressouces' }}
      /> */}
   {/* <Stack.Screen
        name="[id]"
        options={{ title: 'parametres' }}
      /> */}

{/*
by default, title will be name of file (index, [id])
https://reactnavigation.org/docs/headers/#setting-the-header-title */}
  </Stack>;
}
