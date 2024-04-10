import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, Switch, StyleSheet, ScrollView, Image, Pressable, TouchableOpacity, ActivityIndicator, Platform, FlatList } from 'react-native';
import { useIngredientSubGroup, useInsertPetRation } from '@/api/rations';
import { AutocompleteDropdownContextProvider, AutocompleteDropdown  } from 'react-native-autocomplete-dropdown';
import { Picker } from '@react-native-picker/picker';
import { supabase } from '@/lib/supabase';
import { Link, useLocalSearchParams, useRouter } from 'expo-router';

const AddPetRationForm = () => {

  const router = useRouter();
  const { id } = useLocalSearchParams();
  const petId = id
  const [inputValue, setInputValue] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const [typeREnum, setTypeREnum] = useState([]);
  const [cmvEnum, setCmvEnum] = useState([]);
  const [modeEnum, setModeEnum] = useState([]);

  const {data: viandes, isLoading: isViandeLoading, error: viandeError} = useIngredientSubGroup('viande');
  const {data: oeufs, isLoading: isOeufsLoading, error: oeufError} = useIngredientSubGroup('oeuf');
  const {data: laitages, isLoading: isLaitagesLoading, error: laitageError} = useIngredientSubGroup('laitage');
  const {data: legumes, isLoading: isLegumesLoading, error: legumeError} = useIngredientSubGroup('legume');
  const {data: feculents, isLoading: isFeculentsLoading, error: feculentError} = useIngredientSubGroup('feculent');
  const {data: huiles, isLoading: isHuilesLoading, error: huileError} = useIngredientSubGroup('huile');
  const {mutate: insertPetRation, error: insertPetRationError} = useInsertPetRation(); // hook returns a function

  useEffect(() => {
    // fetch type_r
    async function fetchTypeREnum() {
      try {
        let { data, error } = await supabase.rpc('get_enum_values_for_types_r');
        if (error) throw error;

        // Storing the result in the component state
        setTypeREnum(data);
      } catch (error) {
        console.error(error);
      }
    }
    // fetch cmv
    async function fetchCmvEnum() {
      try {
        let { data, error } = await supabase.rpc('get_enum_values_for_cmv');
        if (error) throw error;

        // Storing the result in the component state
        setCmvEnum(data);
      } catch (error) {
        console.error(error);
      }
    }
    // fetch mode
    async function fetchModeEnum() {
      try {
        let { data, error } = await supabase.rpc('get_enum_values_for_cmv');
        if (error) throw error;

        // Storing the result in the component state
        setModeEnum(data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchTypeREnum();
    fetchCmvEnum();
    fetchModeEnum();
  }, []);


  const [formData, setFormData] = useState({
    title: '',
    comment: '',
    type_r: 'PRO BARF (sans amidon)',
    cmv: "Vit'i5 Orange (pot 600g)",
    mode: '100% ration ménagère',
    viande: '',
    oeuf: '',
    laitage: '',
    legume: '',
    feculent: '',
    huile: '',
  });



  const handleSubmit = async (event: any) => {
    event.preventDefault();
    console.log('submitting Form data:', formData);
    // insert ration
    // insertPetRation(petId, formData)
    try{
      insertPetRation({
        petId: Array.isArray(petId) ? petId[0] : petId,
        data: formData
      })
      resetFields();
      router.back()
    }  catch (error) {
      console.log('insertPetRation', insertPetRation)
    }

    // insert ration ingredients
    // calculate nutrition value
  }

  const resetFields = () => {
    // TO DO
  }

  const handleChange = (ingredient_type: string, id: string) => {
    setFormData({ ...formData, [ingredient_type]: id });
  };

  const handleInputChange = (text: string) => {
    setInputValue(text);
    setShowSuggestions(text.length >= 3);
  };

  const selectItem = (ingredient_type: string, item: {id: string, title: string | null} | null) => {
    if (item) {
      handleChange(ingredient_type, item.id)
      // console.log('viande', item);
    }
  }

  if (isViandeLoading || isOeufsLoading || isLaitagesLoading || isLegumesLoading || isFeculentsLoading || isHuilesLoading) return <ActivityIndicator/>
  if (viandeError || oeufError || laitageError || legumeError || feculentError || huileError) return <Text>Erreur</Text>
  return (
    <AutocompleteDropdownContextProvider>


    <ScrollView
      style={styles.container}
      contentContainerStyle={{ alignItems: 'center', justifyContent: 'center', paddingVertical: 50}}
    >

      <Text style={{color: 'white'}}>Titre</Text>
      <TextInput
        style={styles.input}
        placeholder="Titre"
        value={formData.title}
        onChangeText={(text) => handleChange('title', text)}
      />

      <Text style={{color: 'white'}}>Description</Text>
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={formData.comment}
        onChangeText={(text) => handleChange('comment', text)}
      />

      <Text style={{color: 'white'}}>Type de ration</Text>
      <Picker
        selectedValue={formData.type_r}
        style={styles.input}
        onValueChange={(itemValue) => handleChange('type_r', itemValue)}
      >
        {typeREnum?.map((type) => (
          <Picker.Item key={type} label={type} value={type} />
        ))}
      </Picker>
      {/* <Text style={{color: 'white'}}>{formData.type_r}</Text> */}

      <Text style={{color: 'white'}}>CMV</Text>
      <Picker
        selectedValue={formData.cmv}
        style={styles.input}
        onValueChange={(itemValue) => handleChange('cmv', itemValue)}
      >
        {cmvEnum?.map((cmv) => (
          <Picker.Item key={cmv} label={cmv} value={cmv} />
        ))}
      </Picker>
      {/* <Text style={{color: 'white'}}>{formData.cmv}</Text> */}

      <Text style={{color: 'white'}}>Mode de ration</Text>
      <Picker
        selectedValue={formData.mode}
        style={styles.input}
        onValueChange={(itemValue) => handleChange('mode', itemValue)}
      >
        {modeEnum?.map((mode) => (
          <Picker.Item key={mode} label={mode} value={mode} />
        ))}
      </Picker>
      {/* <Text style={{color: 'white'}}>{formData.mode}</Text> */}

      <Text style={{color: 'white'}}>Viande</Text>
      <AutocompleteDropdown
        clearOnFocus={false}
        closeOnBlur={true}
        closeOnSubmit={false}
        initialValue={formData.viande}
        onSelectItem={(item) => selectItem('viande', item)}
        dataSet={showSuggestions ? viandes : null}
        onChangeText={(text) => {handleInputChange(text)}}
        inputContainerStyle={[styles.input, {position: 'relative'}]}

        showChevron={false}
      />

      <Text style={{color: 'white'}}>Oeuf</Text>
      <AutocompleteDropdown
        clearOnFocus={false}
        closeOnBlur={true}
        closeOnSubmit={false}
        initialValue={formData.oeuf}
        onSelectItem={(item) => selectItem('oeuf', item)}
        dataSet={showSuggestions ? oeufs : null}
        onChangeText={(text) => {handleInputChange(text)}}
        inputContainerStyle={[styles.input, {position: 'relative'}]}
        suggestionsListContainerStyle={{
          position: 'absolute',
          top: -90, // Adjust this based on the height of your input field
          left: 0,
          right: 0,
          // height: '200px', // Set a maximum height for the suggestions list container
          overflow: 'scroll',
        }}
        showChevron={false}
      />

      <Text style={{color: 'white'}}>Laitage</Text>
      <AutocompleteDropdown
        clearOnFocus={false}
        closeOnBlur={true}
        closeOnSubmit={false}
        initialValue={formData.laitage}
        onSelectItem={(item) => selectItem('laitage', item)}
        dataSet={showSuggestions ? laitages : null}
        onChangeText={(text) => {handleInputChange(text)}}
        inputContainerStyle={[styles.input, {position: 'relative'}]}
        suggestionsListContainerStyle={{
          position: 'absolute',
          top: -90, // Adjust this based on the height of your input field
          left: 0,
          right: 0,
          // height: '200px', // Set a maximum height for the suggestions list container
          overflow: 'scroll',
        }}
        showChevron={false}
      />

      <Text style={{color: 'white'}}>Légume</Text>
      <AutocompleteDropdown
        clearOnFocus={false}
        closeOnBlur={true}
        closeOnSubmit={false}
        initialValue={formData.legume}
        onSelectItem={(item) => selectItem('legume', item)}
        dataSet={showSuggestions ? legumes : null}
        onChangeText={(text) => {handleInputChange(text)}}
        inputContainerStyle={[styles.input, {position: 'relative'}]}
        suggestionsListContainerStyle={{
          position: 'absolute',
          top: -90, // Adjust this based on the height of your input field
          left: 0,
          right: 0,
          // height: '200px', // Set a maximum height for the suggestions list container
          overflow: 'scroll',
        }}
        showChevron={false}
      />

      <Text style={{color: 'white'}}>Féculent</Text>
      <AutocompleteDropdown
        clearOnFocus={false}
        closeOnBlur={true}
        closeOnSubmit={false}
        initialValue={formData.feculent}
        onSelectItem={(item) => selectItem('feculent', item)}
        dataSet={showSuggestions ? feculents : null}
        onChangeText={(text) => {handleInputChange(text)}}
        inputContainerStyle={[styles.input, {position: 'relative'}]}
        suggestionsListContainerStyle={{
          position: 'absolute',
          top: -90, // Adjust this based on the height of your input field
          left: 0,
          right: 0,
          // height: '200px', // Set a maximum height for the suggestions list container
          overflow: 'scroll',
        }}
        showChevron={false}
      />

      <Text style={{color: 'white'}}>Huile</Text>
      <AutocompleteDropdown
        clearOnFocus={false}
        closeOnBlur={true}
        closeOnSubmit={false}
        initialValue={formData.huile}
        onSelectItem={(item) => selectItem('huile', item)}
        dataSet={showSuggestions ? huiles : null}
        onChangeText={(text) => {handleInputChange(text)}}
        inputContainerStyle={[styles.input, {position: 'relative'}]}
        suggestionsListContainerStyle={{
          position: 'absolute',
          top: -90, // Adjust this based on the height of your input field
          left: 0,
          right: 0,
          // height: '200px', // Set a maximum height for the suggestions list container
          overflow: 'scroll',
        }}
        showChevron={false}
      />

      <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: '5%' }}>
        <Link href={`/pets/${id}`} asChild>
          <Text style={styles.link}>Cancel</Text>
        </Link>
        <Button title="Submit" onPress={handleSubmit} />
      </View>
    </ScrollView>
  </AutocompleteDropdownContextProvider>
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
  itemText: {
    // Style for your list items
    backgroundColor: 'white',
    padding: 10,
  }
});

export default AddPetRationForm;
