import { ActivityIndicator, FlatList, StyleSheet, Text } from 'react-native';
import { useEffect, useState } from 'react'
import {PetCard} from "@/components/PetCard"
import AddButton from '@/components/AddButton'
import { Link } from 'expo-router';
import { supabase } from '@/lib/supabase';
import { useQuery } from '@tanstack/react-query'
import { Pet } from '@/types';
import { usePetList } from '@/api/pets';

export default function PetsScreen() {

  const { data: pets, error, isLoading } =  usePetList()
console.log('pets', pets);
console.log('error', error);
console.log('isLoading', isLoading);

  if (isLoading) { return <ActivityIndicator/>}
  if (error) { return <Text>Failed to fetch pets</Text> }

  console.log('pets fetched from supabase', pets);

  return (
    <>
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
    </>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
