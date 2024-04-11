import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, Switch, StyleSheet, ScrollView, Image, Pressable, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Link, Stack, useRouter } from 'expo-router';
import { Picker } from '@react-native-picker/picker';
// import { q_legumes } from '@assets/data/pets'
import choice1 from '@assets/images/chien1.jpg'
import choice2 from '@assets/images/chien2.jpg'
import choice3 from '@assets/images/chien3.jpg'
import choice4 from '@assets/images/chien4.jpg'
import choice5 from '@assets/images/chien5.jpg'
import choice6 from '@assets/images/chien6.jpg'
import choice7 from '@assets/images/chien7.jpg'
import choice8 from '@assets/images/chien8.jpg'
import choice9 from '@assets/images/chien9.jpg'
import defaultImage from '@assets/images/no-pet-image.webp'
import { Pet, NutritionalNeeds } from '@/types';
import * as ImagePicker from 'expo-image-picker';
import { useAuth } from '@/providers/AuthProvider';
import { useInsertPet, useBreedList, useActivityList, useStageList, useEnvList, useVegList, useInsertNutritionalNeeds, useAddPetToNN, useInsertInitialPetWeight } from '@/api/pets';
import { randomUUID } from 'expo-crypto'
import { supabase } from '@/lib/supabase';

const choices = [choice1, choice2, choice3, choice4, choice5, choice6, choice7, choice8, choice9]

const AddPetForm = () => {

  const router = useRouter();
  const { session, loading } = useAuth()
  const {mutateAsync: insertPet, data: newPet, isSuccess, isError, error: insertPetError} = useInsertPet(); // hook returns a function
  const {mutate: insertNutritionalNeeds, error: insertNNError} = useInsertNutritionalNeeds(); // hook returns a function
  const {mutate: insertInitialPetWeight, error: insertWeightError} = useInsertInitialPetWeight(); // hook returns a function
  // const {mutate: addPetToNN, error: addPetToNNError} = useAddPetToNN(); // hook returns a function

  const {data: breedsData, isLoading: isBreedsLoading, error: breedsError} = useBreedList()

  const {data: activitiesData, isLoading: isActivitiesLoading, error: activitiesError} = useActivityList()
  const {data: stagesData, isLoading: isStagesLoading, error: stagesError} = useStageList()
  const {data: envData, isLoading: isEnvLoading, error: envError} = useEnvList()
  const {data: vegData, isLoading: isVegLoading, error: vegError} = useVegList()

//   console.log('activitiesData', activitiesData);
// console.log('isActivitiesLoading', isActivitiesLoading);
// console.log('activitiesError', activitiesError);

  // const isLoading = loading || isBreedsLoading || isActivitiesLoading // || isStageLoading || isEnvLoading || isNutritionalNeedsLoading;
  // const error = breedsError || activitiesError // || stageError || envError || nutritionalNeedsError; // shows first error encountered

  // if (isLoading) { return <ActivityIndicator/>}
  // if (error) { return <Text>Failed to fetch pets</Text> }

  const [formData, setFormData] = useState({
    // id: '',
    name: '',
    // animal: 'Chien',
    image: '',
    breed: {"breed": "Akita Américain", "id": "b1"},
    weight: 0.00,
    ideal_weight: 0.00,
    activity: {"activityLevel": "Normal", "id": "a1"},
    life_stage: {"lifeStage": "Adulte (2 à 7 ans)", "id": "s2"},
    sterilized: false,
    lieu_de_vie: {"environment": "Intérieur", "id": "e1"},
    quantite_legumes: {"vegQuantity": "Normale", "id": "v1"},
    sexe: 'F',
  });

  // console.log(formData);
 const handleSubmit = async (event: any) => {
  event.preventDefault();
    console.log('submitting Form data:', formData);

    // insert pet
    try{
      const newPet = await insertPet({
        user_id: session?.user.id,
        petData: formData,
        // onSuccess: () => {
      })
      console.log('Pet inserted successfully:', newPet);

      // insert pet nutritional needs
      const nutri_needs = calculate_nutri_needs()
      console.log(nutri_needs)
      const pet_nutri_needs = {...nutri_needs, pet_id: newPet.id}
      insertNutritionalNeeds(pet_nutri_needs)

      // insert current weight
      //const current_weight = {pet_id: newPet.id, weight: newPet.weight, measurement_date: newPet.created_on}
      insertInitialPetWeight(newPet)
      console.log("insertWeightError", insertWeightError);

    } catch (error) {
      console.error('Error inserting pet:', error);
      // Handle errors, e.g., show an error message
    }
        resetFields(); // definition
        router.back()
  }

  const handleChange = (key: any, value: any) => {
    setFormData({ ...formData, [key]: value });
  };

  const resetFields = () => {
    // TO DO
    setFormData({
      name: '',
      image: '',
      breed: {"breed": "Akita Américain", "id": "b1"},
      weight: 0.00,
      ideal_weight: 0.00,
      activity: {"activityLevel": "Normal", "id": "a1"},
      life_stage: {"lifeStage": "Adulte (2 à 7 ans)", "id": "s2"},
      sterilized: false,
      lieu_de_vie: {"environment": "Intérieur", "id": "e1"},
      quantite_legumes: {"vegQuantity": "Normale", "id": "v1"},
      sexe: 'F',
    });
  }

  const calculate_bmr = (rer: number) => {
    let bmr = 0;
    if (formData.life_stage === "Chiot (0 à 2 ans)") {
      bmr = rer * 2.0
    } else {
      if (formData.sterilized) {
        bmr = rer * 1.6
      } else {
        bmr = rer * 1.8
      }
    }
    return bmr;
  }

  const  calculate_calories = (bmr: number) => {
    let calories = 0;
    console.log('formData.activity', formData.activity.activityLevel);

    switch (formData.activity.activityLevel) {
      case "HyperactifGrandSportif (+2h)":
        calories = bmr * 1.9
        break;
      case "ActifSportif (+1h30 de sortie)":
        calories = bmr * 1.725
        break;
      case "Normal":
        calories = bmr * 1.55
        break;
      case "Calme":
        calories = bmr * 1.375
        break;
      case "TrèsCalme":
        calories = bmr * 1.2
        break;
      default:
        console.log('Unmatched activity level:', formData.activity);
        break;
    }
    return calories
  }

  const calculate_rpc = () => {
    let rpc = 0;
    // Entier ET actif
    if (!formData.sterilized && (("Normal" || "ActifSportif (+1h30 de sortie)" || "HyperactifGrandSportif (+2h)").includes(formData.activity.activityLevel))) {
      // chiot
      if (formData.life_stage.lifeStage === "Chiot (0 à 2 ans)") {
        rpc = 75
      } else {
        if (formData.weight < 10) rpc = 55;
        else if (formData.weight >= 10 && formData.weight < 25) rpc = 60;
        else rpc = 65;
      }
    }  else if (formData.sterilized || ("Calme" || "TrèsCalme" || "Convalescence").includes(formData.activity.activityLevel)) {
      if (formData.life_stage.lifeStage === "Chiot (0 à 2 ans)") {
        rpc = 94;
      } else {
        if (formData.weight < 10) rpc = 69;
        else if (formData.weight >= 10 && formData.weight < 25) rpc = 75;
        else rpc = 81;
      }
    }
    // Stérilisé ET sédentaire
    else {
      if (formData.life_stage.lifeStage === "Chiot (0 à 2 ans)") {
        rpc = 117;
      } else {
        if (formData.weight < 10) rpc = 86;
        else if (formData.weight >= 10 && formData.weight < 25) rpc = 94;
        else rpc = 102;
      }
    }
    return rpc
  };

  const calculate_nutri_needs = () => {
    // calculate RER
    const rer = 70 * ((formData.weight)*0.75)
    console.log('rer', rer);

    // calculate bmr (factor in sterilisé)
    const bmr = calculate_bmr(rer)
    console.log('bmr', bmr);

    // calculate calories (factor in activity)
    const calories = calculate_calories(bmr)
    console.log('calories', calories);

    // calculate rpc
    const rpc = calculate_rpc()
    console.log('rpc', rpc);

    //CALCIUM
    const calcium = (calories * 1.25)/1000
    console.log('calcium', calcium);

    // create nutritional needs anf assign to pet
    const nutritional_needs: NutritionalNeeds ={
      pet_id: 1, // TO DO !
      calories,
      rpc,
      calcium
    };
    // return nutritional needs obj
    return {
      calories: calories,
      rpc: rpc,
      calcium: calcium,
    }
    //save to db
  }


  const calculateIdealWeight = (index: number) => {
    let percentage: number = 0;
    // console.log(index);
    const choice = index + 1;
    switch (choice) {
      case 1:
        percentage = 0.4; // 40% increase
        break;
      case 2:
        percentage = 0.3; // 30% increase
        break;
      case 3:
        percentage = 0.2; // 20% increase
        break;
      case 4:
        percentage = 0.1; // 10% increase
        break;
      case 6:
        percentage = -0.1; // 10% decrease
        break;
      case 7:
        percentage = -0.2; // 20% decrease
        break;
      case 8:
        percentage = -0.3; // 30% decrease
        break;
      case 9:
        percentage = -0.4; // 40% decrease
        break;
      // Default case (5 is ideal, no percentage change)
      default:
        percentage = 0; // No change
    }

    // console.log('formData.weight', typeof(formData.weight));

    const calculatedIdealWeight = formData.weight + formData.weight * percentage;

    setFormData({ ...formData, ideal_weight: calculatedIdealWeight })
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result);

    if (!result.canceled) {
      // setImage(result.assets[0].uri);
      setFormData({ ...formData, image: result.assets[0].uri })
    }
  };

  // <Stack.Screen options={{ title: 'Ajouter un animal'}} />

  return (

    <ScrollView
      style={styles.container}
      contentContainerStyle={{ alignItems: 'center', justifyContent: 'center', paddingVertical: 50}}
    >

      <Text style={{color:'white'}}>Cat or dog</Text>

      <TextInput
        style={styles.input}
        placeholder="Nom"
        value={formData.name}
        onChangeText={(text) => handleChange('name', text)}
      />

      <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
        <Image source={ formData.image || defaultImage } style={styles.image}/>
        <Text style={{color: 'white'}}>Selectionner </Text>
        <TouchableOpacity onPress={pickImage} style={styles.imgButton}>
          <Text style={{textAlign: 'center', fontWeight: '500'}}>...</Text>
        </TouchableOpacity>
        {/* <Text onPress={pickImage} style={styles.textButton}>Select Image</Text> */}
      </View>

      <Text style={{ color: 'white' }}>Race</Text>
      <Picker
        selectedValue={formData.breed}
        style={styles.input}
        onValueChange={(itemValue) => handleChange('breed', itemValue)}>
          {breedsData?.map((breed) =>
            <Picker.Item key={breed.id} label={breed.breed} value={breed} />
          )}
      </Picker>

      <Text style={{ color: 'white' }}>Sexe</Text>
      <Picker
        selectedValue={formData.sexe}
        style={styles.input}
        onValueChange={(itemValue) => handleChange('sexe', itemValue)}>
          <Picker.Item label='femelle' value='F' />
          <Picker.Item label='male' value='M' />
      </Picker>

      <TextInput
        style={styles.input}
        placeholder="Poids"
        keyboardType="numeric"
        value={formData.weight.toString()}
        onChangeText={(text) => handleChange('weight', parseFloat(text) || 0)}
      />
      <View style={styles.choices}>
        {choices.map((image, index)=>
          <TouchableOpacity style={styles.choicePressable} key={index} onPress={() => calculateIdealWeight(index)}>
            <Image
                source={image}
                style={styles.choice}
                resizeMode='contain'
                />
          </TouchableOpacity>
        )}
      </View>

      <Text>Poids idéal:</Text>
      <TextInput
        editable={false}
        style={styles.input}
        placeholder="Poids idéal"
        keyboardType="numeric"
        value={formData.ideal_weight.toString()}
      />
      <Text>placeholder visible? + checkbox to allow custom target weight</Text>

      <Text style={{ color: 'white' }}>Niveau d'activité</Text>
      <Picker
        selectedValue={formData.activity}
        style={styles.input}
        onValueChange={(itemValue) => handleChange('activity', itemValue)}
      >
        {activitiesData?.map((act) => (
          <Picker.Item key={act.id} label={act.activityLevel} value={act} />
        ))}
      </Picker>

      <Text style={{ color: 'white' }}>Stade de vie</Text>
      <Picker
        selectedValue={formData.life_stage}
        style={styles.input}
        onValueChange={(itemValue) => handleChange('life_stage', itemValue)}
      >
        {stagesData?.map((stage) => (
          <Picker.Item key={stage.id} label={stage.lifeStage} value={stage} />
        ))}
      </Picker>

      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
        <Text style={styles.label}>Stérilisé.e ?</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={formData.sterilized ? "#f5dd4b" : "#f4f3f4"}
          value={formData.sterilized}
          onValueChange={(value) => handleChange('sterilized', value)}
        />
      </View>

      <Text style={{ color: 'white' }}>Lieu de vie</Text>
      <Picker
        selectedValue={formData.lieu_de_vie}
        style={styles.input}
        onValueChange={(itemValue) => handleChange('lieu_de_vie', itemValue)}
      >
        {envData?.map((lieu) => (
          <Picker.Item key={lieu.id} label={lieu.environment} value={lieu} />
        ))}
      </Picker>

      <Text style={{ color: 'white' }}>Quantité de légumes</Text>
      <Picker
        selectedValue={formData.quantite_legumes}
        style={styles.input}
        onValueChange={(itemValue) => handleChange('quantite_legumes', itemValue)}
      >
        {vegData?.map((q) => (
          <Picker.Item key={q.id} label={q.vegQuantity} value={q} />
        ))}
      </Picker>

      <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: '5%' }}>
        <Link href="/pets/" asChild>
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

export default AddPetForm;
