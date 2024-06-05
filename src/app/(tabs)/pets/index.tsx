import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
import { useEffect, useState } from 'react'
import {PetCard} from "@/components/PetCard"
import AddButton from '@/components/AddButton'
import { Link } from 'expo-router';
import { supabase } from '@/lib/supabase';
import { useQuery } from '@tanstack/react-query'
import { Pet } from '@/types';
import { usePetList } from '@/api/pets';

export default function PetsScreen() {
  // supabase.auth.signOut()
  const { data: pets, error, isLoading } =  usePetList()
  // console.log('pets', pets);
  // console.log('error', error);
  // console.log('isLoading', isLoading);

  if (isLoading) { return <ActivityIndicator/>}
  if (error) { return <Text>Failed to fetch pets</Text> }

  console.log('pets fetched from supabase', pets);

  const styles = StyleSheet.create({
    container: {
      paddingVertical: 10
      // flex: 1,
      // alignItems: 'center',
      // justifyContent: 'center',
    },

  });

  return (
    <>
        <View style={styles.container}>
      <FlatList
        data={pets}
        renderItem={({item}) => <PetCard pet={item}/>}
        numColumns={2}
        contentContainerStyle={{gap: 10, padding: 10}}
        columnWrapperStyle={{gap: 10}}
      />
        <Link href={`/pets/new`} asChild>
          <AddButton text='Ajouter un animal'/>
        </Link>
      </View>
    </>

  );
}
