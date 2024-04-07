import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, Switch, StyleSheet, ScrollView, Image, Pressable, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Link, Stack, useLocalSearchParams, useRouter, usePathname } from 'expo-router';
import { Picker } from '@react-native-picker/picker';
// import { q_legumes } from '@assets/data/pets'
import { useAuth } from '@/providers/AuthProvider';
import { useInsertPet, useBreedList, useActivityList, useStageList, useEnvList, useVegList, useInsertNutritionalNeeds, useAddPetToNN, useInsertInitialPetWeight, useInsertPetWeight, usePet } from '@/api/pets';
import { randomUUID } from 'expo-crypto'
import { supabase } from '@/lib/supabase';


const AddPetWeightForm = () => {

  const router = useRouter();
  const { session, loading } = useAuth()
  // const {mutate: insertInitialPetWeight, error: insertWeightError} = useInsertInitialPetWeight(); // hook returns a function
  const {mutate: insertPetWeight, error: insertWeightError} = useInsertPetWeight(); // hook returns a function
  // const {mutate: addPetToNN, error: addPetToNNError} = useAddPetToNN(); // hook returns a function

  const { id } = useLocalSearchParams();
  console.log('idFromParams', id)

  const { data: pet, isLoading, error } = usePet(id)

  if (isLoading) return <ActivityIndicator/>
  if (error) return <Text>Error</Text>

  const [formData, setFormData] = useState({
    weight: Number,
    measurement_date: Date
  });

  // console.log(formData);
 const handleSubmit = async (event: any) => {
    event.preventDefault();
    console.log('submitting Form data:', formData);
    insertPetWeight(pet, formData.measurement_date)

    // resetFields();
    router.back()
  }


  const handleChange = (key: any, value: any) => {
    setFormData({ ...formData, [key]: value });
  };

  const resetFields = () => {
    // TO DO
  }

  return (

    <ScrollView
      style={styles.container}
      contentContainerStyle={{ alignItems: 'center', justifyContent: 'center', paddingVertical: 50}}
    >

      <TextInput
        style={styles.input}
        placeholder="Poids (kg)"
        keyboardType="numeric"
        value={formData.weight.toString()}
        onChangeText={(text) => handleChange('weight', parseFloat(text) || 0)}
      />

      {/* <TextInput
        style={styles.input}
        placeholder="Date de mesure"
        value={formData.measurement_date}
        onChangeText={(text) => handleChange('weight', text)}
      /> */}


      <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: '5%' }}>
        <Link href={`/pets/${id}`} asChild>
          <Text style={styles.link}>Cancel</Text>
        </Link>
        <Button title="Submit" onPress={handleSubmit} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: 'white'
  },
  choices: {
    // width: '100%',
    // flexDirection: 'row',
    // alignItems: 'center',
    // justifyContent: 'space-around'
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  choicePressable: {
    width: '33%',
    height: 100,
  },
  choice: {
    width: '100%',
    height: 100,
    resizeMode: 'contain'
  },
  label: {
    color: 'white',
  },
  switch: {
  },
  image: {
    width: '35%',
    aspectRatio: 1
  },
  imgButton: {
    backgroundColor: 'white',
    width: '10%',
    height: 'auto',
    borderRadius: 2
  },
  link: {
    marginTop: 20,
    color: 'white',
    textDecorationLine: 'underline',
  },
});

export default AddPetWeightForm;
