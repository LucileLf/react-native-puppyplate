import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, Switch, StyleSheet, ScrollView, Image, Pressable, TouchableOpacity, ActivityIndicator, Platform, FlatList } from 'react-native';
import { useIngredientSubGroup } from '@/api/rations';
import { AutocompleteDropdownContextProvider, AutocompleteDropdown  } from 'react-native-autocomplete-dropdown';

const AddPetRationForm = () => {

  // const router = useRouter();
  // const { id } = useLocalSearchParams();
  const [inputValue, setInputValue] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  // fetch type_r
  // fetch cm
  // fetch mode
  // fetch viande
  const {data: viandes, isLoading: isViandeLoading, error: viandeError} = useIngredientSubGroup('viande');
  console.log(`${viandes?.length} viandes`);

  // const [selectedItem, setSelectedItem] = useState(null);

  // const viandes = [
  //   {
  //     id: 'V01',
  //     title: 'saumon'
  //   },
  //   {
  //     id: 'V02',
  //     title: 'chicken'
  //   }
  // ]

  // fetch Oeufs
  // fetch Laitages
  // fetch Légumes
  // fetch Féculents
  // fetch Huiles


  const [formData, setFormData] = useState({
    type_r: 'PRO BARF (sans amidon)',
    cmv: "Vit'i5 Orange (pot 600g)",
    mode: '100% ration ménagère',
    viande: '',
    oeuf: '',
    laitage: '',
    légume: '',
    féculent: '',
    huile: '',
  });

  // const handleSubmit = async (event: any) => {
  //   event.preventDefault();
  //   console.log('submitting Form data:', formData);
  //   try{
  //     insertPetWeight({
  //       petId: Array.isArray(id) ? id[0] : id,
  //       weight: formData.weight,
  //       date: formData.measurement_date
  //     })
  //     resetFields();
  //     router.back()
  //   }  catch (error) {
  //     console.log('insertWeightError', insertWeightError)
  //   }
  // }

  // const resetFields = () => {
  //   // TO DO
  // }

  const handleChange = (key: any, value: any) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleInputChange = (text: string) => {
    setInputValue(text);
    setShowSuggestions(text.length >= 3);
  };

  const selectItem = (item: {id: string, title: string} | null) => {
    if (item) {
      handleChange('viande', item.title)
      // console.log('viande', item);
    }
  }
  return (
    <AutocompleteDropdownContextProvider>


    <ScrollView
      style={styles.container}
      contentContainerStyle={{ alignItems: 'center', justifyContent: 'center', paddingVertical: 50}}
    >
      <Text style={{color: 'white'}}>Type de ration</Text>
      <TextInput
        style={styles.input}
        placeholder="Sélectionner..."
        value={formData.type_r}
        onChangeText={(text) => handleChange('type_r', text)}
      />

      <Text style={{color: 'white'}}>CMV</Text>
      <TextInput
        style={styles.input}
        placeholder="Sélectionner..."
        value={formData.cmv}
        onChangeText={(text) => handleChange('cmv', text)}
      />

      <Text style={{color: 'white'}}>Mode de ration</Text>
      <TextInput
        style={styles.input}
        placeholder="Sélectionner..."
        value={formData.mode}
        onChangeText={(text) => handleChange('mode', text)}
      />

      <Text style={{color: 'white'}}>Viande</Text>

      <AutocompleteDropdown
        clearOnFocus={false}
        closeOnBlur={true}
        closeOnSubmit={false}
        initialValue={formData.viande}
        onSelectItem={(item) => selectItem(item)}
        dataSet={showSuggestions ? viandes : null}
        onChangeText={(text) => {handleInputChange(text)}}

        // dataSet={viandes}
        inputContainerStyle={[styles.input, {position: 'relative'}]}
        suggestionsListContainerStyle={{
          // position: 'absolute',
          top: -90, // Adjust this based on the height of your input field
          left: 0,
          right: 0,
        }}
        showChevron={false}
      />

      <Text style={{color: 'white'}}>{formData.viande}</Text>
      {/* <TextInput
        style={styles.input}
        placeholder="Sélectionner..."
        value={formData.viande}
        onChangeText={(text) => handleChange('viande', text)}
      /> */}

      <Text style={{color: 'white'}}>Oeuf</Text>
      <TextInput
        style={styles.input}
        placeholder="Sélectionner..."
        value={formData.oeuf}
        onChangeText={(text) => handleChange('oeuf', text)}
      />

      <Text style={{color: 'white'}}>Laitage</Text>
      <TextInput
        style={styles.input}
        placeholder="Sélectionner..."
        value={formData.laitage}
        onChangeText={(text) => handleChange('laitage', text)}
      />

      <Text style={{color: 'white'}}>Légume</Text>
      <TextInput
        style={styles.input}
        placeholder="Sélectionner..."
        value={formData.légume}
        onChangeText={(text) => handleChange('légume', text)}
      />

      <Text style={{color: 'white'}}>Féculent</Text>
      <TextInput
        style={styles.input}
        placeholder="Sélectionner..."
        value={formData.féculent}
        onChangeText={(text) => handleChange('féculent', text)}
      />

      <Text style={{color: 'white'}}>Huile</Text>
      <TextInput
        style={styles.input}
        placeholder="Sélectionner..."
        value={formData.huile}
        onChangeText={(text) => handleChange('huile', text)}
      />

      {/* <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: '5%' }}>
        <Link href={`/pets/${id}`} asChild>
          <Text style={styles.link}>Cancel</Text>
        </Link>
        <Button title="Submit" onPress={handleSubmit} />
      </View> */}
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
