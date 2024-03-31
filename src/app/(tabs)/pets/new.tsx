import React, { useState } from 'react';
import { View, Text, TextInput, Button, Switch, StyleSheet, ScrollView, Image, Pressable, TouchableOpacity } from 'react-native';
import { Link, Stack } from 'expo-router';
import { Picker } from '@react-native-picker/picker';
import { breeds, activity, stades, lieux, q_legumes } from '@assets/data/pets'
import choice1 from '@assets/images/chien1.jpg'
import choice2 from '@assets/images/chien2.jpg'
import choice3 from '@assets/images/chien3.jpg'
import choice4 from '@assets/images/chien4.jpg'
import choice5 from '@assets/images/chien5.jpg'
import choice6 from '@assets/images/chien6.jpg'
import choice7 from '@assets/images/chien7.jpg'
import choice8 from '@assets/images/chien8.jpg'
import choice9 from '@assets/images/chien9.jpg'


const choices = [choice1, choice2, choice3, choice4, choice5, choice6, choice7, choice8, choice9]

const AddPetForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    animal: '',
    breed: '',
    weight: '',
    ideal_weight: 0,
    activity: '',
    life_stage: '',
    sterilized: false,
    lieu_de_vie: '',
    quantite_legumes: '',
    sexe: '',
  });

  const handleChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleSubmit = () => {
    // Perform submission logic here, e.g., sending data to server
    console.log('Form data:', formData);
  };

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
    const calculatedIdealWeight = parseInt(formData.weight) + parseInt(formData.weight) * percentage;
    console.log('calculatedIdealWeight', calculatedIdealWeight);

    setFormData({ ...formData, ideal_weight: calculatedIdealWeight })
  }

  return (

    <ScrollView
      style={styles.container}
      contentContainerStyle={{ alignItems: 'center', justifyContent: 'center'}}
    >
      <Stack.Screen options={{ title: 'Ajouter un animal'}} />

      <Text style={{color:'white'}}>Cat or dog</Text>
      {/* value={formData.animal} */}

      <TextInput
        style={styles.input}
        placeholder="Nom"
        value={formData.name}
        onChangeText={(text) => handleChange('name', text)}
      />

      <Text style={{color:'white'}}>Image</Text>

      <Text style={{ color: 'white' }}>Race</Text>
      {/* Dropdown for selecting the animal type */}
      <Picker
        selectedValue={formData.breed}
        style={styles.input}
        onValueChange={(itemValue) => handleChange('breed', itemValue)}>
          {breeds.map((breed) =>
            <Picker.Item label={breed} value={breed} />
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
        value={formData.weight}
        onChangeText={(text) => handleChange('weight', text)}
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
        {activity.map((act) => (
          <Picker.Item key={act} label={act} value={act} />
        ))}
      </Picker>

      <Text style={{ color: 'white' }}>Stade de vie</Text>
      <Picker
        selectedValue={formData.life_stage}
        style={styles.input}
        onValueChange={(itemValue) => handleChange('life_stage', itemValue)}
      >
        {stades.map((stade) => (
          <Picker.Item key={stade} label={stade} value={stade} />
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
        {lieux.map((lieu) => (
          <Picker.Item key={lieu} label={lieu} value={lieu} />
        ))}
      </Picker>

      <Text style={{ color: 'white' }}>Quantité de légumes</Text>
      <Picker
        selectedValue={formData.quantite_legumes}
        style={styles.input}
        onValueChange={(itemValue) => handleChange('quantite_legumes', itemValue)}
      >
        {q_legumes.map((q) => (
          <Picker.Item key={q} label={q} value={q} />
        ))}
      </Picker>

      <Button title="Submit" onPress={handleSubmit} />
      <Link href="/pets" asChild>
        <Text style={styles.link}>Cancel</Text>
      </Link>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  link: {
    marginTop: 20,
    color: 'blue',
    textDecorationLine: 'underline',
  },
});

export default AddPetForm;
