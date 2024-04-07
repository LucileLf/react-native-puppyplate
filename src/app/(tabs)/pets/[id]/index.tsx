import { Pet, Ration, Weight } from '@/types';
import { Stack, useLocalSearchParams, useSegments } from 'expo-router';
import { View, Text, Image, StyleSheet, ScrollView, FlatList, ActivityIndicator } from 'react-native'
import { usePetBreed, usePet, useActivity, useStage, useEnv, useVeg, usePetNutritionalNeeds, usePetWeights } from '@/api/pets';
import {PetDetails} from '@/components/PetDetails'


const PetDetailsScreen = () => {

  const { id } = useLocalSearchParams();
  console.log('id', id)
  const { data: pet, isLoading, error } =  usePet(id)
  console.log('pet', pet);
  console.log('isPetLoading', isLoading);
  console.log('petError', error);
  if (isLoading) {return <ActivityIndicator/>}
  if (error) {return <Text>Failed to fetch pets</Text> }

 return <PetDetails pet={pet} />

};

export default PetDetailsScreen;
