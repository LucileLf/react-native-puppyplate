import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, Switch, StyleSheet, ScrollView, Image, Pressable, TouchableOpacity, ActivityIndicator, Platform } from 'react-native';
import { Link, Stack, useLocalSearchParams, useRouter, usePathname } from 'expo-router';
import { Picker } from '@react-native-picker/picker';
// import { q_legumes } from '@assets/data/pets'
import { useAuth } from '@/providers/AuthProvider';
import { useInsertPetWeight, usePet } from '@/api/pets';
import { randomUUID } from 'expo-crypto'
import { supabase } from '@/lib/supabase';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns';


const AddPetWeightForm = () => {

  const router = useRouter();
  const { session, loading } = useAuth()
  // const {mutate: insertInitialPetWeight, error: insertWeightError} = useInsertInitialPetWeight(); // hook returns a function
  const {mutate: insertPetWeight, error: insertWeightError} = useInsertPetWeight(); // hook returns a function
  // const {mutate: addPetToNN, error: addPetToNNError} = useAddPetToNN(); // hook returns a function
  const [showDatePicker, setShowDatePicker] = useState(false);

  const { id } = useLocalSearchParams();
  console.log('idFromParams', id)
  console.log('typeofidFromParams', typeof(id))
  console.log('showDatePicker', showDatePicker)



  const [formData, setFormData] = useState({
    weight: 0,
    measurement_date: new Date()
  });


  // console.log(formData);
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    console.log('submitting Form data:', formData);
    try{
      insertPetWeight({
        petId: Array.isArray(id) ? id[0] : id,
        weight: formData.weight,
        date: formData.measurement_date
      })
      resetFields();
      router.back()
    }  catch (error) {
      console.log('insertWeightError', insertWeightError)
    }
  }

    const resetFields = () => {
      // TO DO
    }

  const handleChange = (key: any, value: any) => {
    setFormData({ ...formData, [key]: value });
  };

  // const setDate = (event: any) => {
  //   console.log('event from stdate', event);
  //   // console.log('ondatachange hi');

  //   // const currentDate = selectedDate || formData.measurement_date;
  //   // setShowDatePicker(Platform.OS === 'ios');

  //   // setFormData({ ...formData, measurement_date: currentDate.toISOString() });
  //   // console.log('Date selected:', currentDate);
  // };
  const showDatepicker = () => {
    setShowDatePicker(true)
  };

  const onDateChange = (event: any, selectedDate: Date) => {
    const currentDate = selectedDate;
    setShowDatePicker(false);
    setFormData({...formData, measurement_date: currentDate});
    console.log('selectedDate', selectedDate);
  };

  const formatDate = (date: Date) => {
    // Format date as you prefer
    return date.toLocaleDateString('fr-FR');
  };


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


      <TouchableOpacity onPress={showDatepicker} >
        <TextInput
          style={styles.input}
          placeholder="Date de mesure"
          value={formatDate(formData.measurement_date)}
          editable={false}
          // onChangeText={(text) => handleChange('weight', text)}
        />
      </TouchableOpacity>


      {/* <Button onPress={showDatepicker} title="Show date picker!" />
      <Text>selected: {formData.measurement_date.toLocaleString()}</Text> */}

      {showDatePicker && (
        <DateTimePicker
          value={new Date(formData.measurement_date)}
          mode="date"
          display="default"
          onChange={onDateChange}
        />
      )}

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
  datePickerButton: {
    width: '100%'
  },
  // datePicker: {
  //   backgroundColor: 'white',
  //   width: '100%'
  // },
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
