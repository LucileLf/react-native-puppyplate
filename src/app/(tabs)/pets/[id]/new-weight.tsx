import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Link, useLocalSearchParams, useRouter } from 'expo-router';
import { useInsertPetWeight } from '@/api/pets';
import DateTimePicker from '@react-native-community/datetimepicker';


const AddPetWeightForm = () => {

  const router = useRouter();
  const {mutate: insertPetWeight, error: insertWeightError} = useInsertPetWeight(); // hook returns a function
  const [showDatePicker, setShowDatePicker] = useState(false);

  const { id } = useLocalSearchParams();

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
      setFormData({
        weight: 0,
        measurement_date: new Date()
      });
    }

  const handleChange = (key: any, value: any) => {
    setFormData({ ...formData, [key]: value });
  };

  const showDatepicker = () => {
    setShowDatePicker(true)
  };

  const onDateChange = (selectedDate: Date) => {
    const currentDate = selectedDate;
    setShowDatePicker(false);
    setFormData({...formData, measurement_date: currentDate});
    console.log('selectedDate', selectedDate);
  };

  const formatDate = (date: Date) => {
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
        />
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={new Date(formData.measurement_date)}
          mode="date"
          display="default"
          onChange={onDateChange}
        />
      )}

      <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: '5%' }}>
        <Link href={`/pets/${id}` as any} asChild>
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
  choices: {
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
