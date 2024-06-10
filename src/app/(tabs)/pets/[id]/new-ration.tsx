import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, TextInput, Button, Switch, StyleSheet, ScrollView, Image, Pressable, TouchableOpacity, ActivityIndicator, Platform, FlatList } from 'react-native';
import { useIngredientSubGroup, useInsertPetRation, useInsertRationIngredient, useIngredientsByName } from '@/api/rations';
import { AutocompleteDropdownContextProvider, AutocompleteDropdown  } from 'react-native-autocomplete-dropdown';
import { Picker } from '@react-native-picker/picker';
import { supabase } from '@/lib/supabase';
import { Link, useLocalSearchParams, useRouter } from 'expo-router';
import { usePetNutritionalNeeds } from '@/api/pets';
import { MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';
import {IngredientSearchItem} from '@/components/IngredientSearchItem'
import { log } from 'console';
import {Ingredient} from '@/types'

// import { usePet, usePetNutritionalNeeds } from '@/api/pets';

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
  const {mutate: insertRationIngredient, error: insertRationIngredientError} = useInsertRationIngredient(); // hook returns a function
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const {data: nutritionalNeeds, isLoading: isNutritionalNeedsLoading, error: nutritionalNeedsError} = usePetNutritionalNeeds(petId, {enabled: true});
  
  const [pickerOpened, setPickerOpened] = useState(false);
  const [ingredientSearchInput, setIngredientSearchInput] = useState('');
  const [ingredientsSearchResults, setIngredientsSearchResults] = useState([]);
  const [currentIngredientType, setCurrentIngredientType] = useState('');

  // const {data: ingredientsSearchResults, isLoading: isIngredientsSearchResultsLoading, error: ingredientsSearchResultsError} = useIngredientsByName();

  const filterIngredientsByType = (ingredientType: string, ingredients: Ingredient[]) => {
    let subgroups: String[]
    switch(ingredientType) {
      case 'viande':
        subgroups = ['viandes cuites', 'viandes crues', 'charcuteries et assimilés', 'autres produits à base de viande', 'poissons cuits', 'poissons crus', 'mollusques et crustacés cuits', 'mollusques et crustacés crus', 'produits à base de poissons et produits de la mer', 'substitus de produits carnés']
        break;
      case 'oeuf':
        subgroups = ['oeufs']
        break;
      case 'laitage':
        subgroups = ['laits', 'produits laitiers frais et assimilés', 'fromages et assimilés', 'crèmes et spécialités à base de crème']
        break;
      case 'legume':
        subgroups = ['légumes']
        break;
      case 'feculent':
        subgroups = ['légumineuses', 'pommes de terre et autres tubercules', 'pâtes, riz et céréales']
        break;
      case 'huile':
        subgroups = ['huiles et graisses végétales', 'huiles de poissons', 'autres matières grasses']
        break;
    }
    return ingredients.filter(ingredient => subgroups.includes(ingredient.alim_ssgrp_nom_fr));
  };

  const fetchSearchResults = useCallback(async (query: string, ingredientType: string) => {
    console.log('looking for ingredients with title like', query)
    if (!query) return;
    const { data: results, error } = await supabase.from('ingredients').select('*').ilike('title', `%${query}%`);
    if (error) {
      console.error('Error fetching search results:', error);
    } else {
      console.log('found', results)
      const filteredResults = filterIngredientsByType(ingredientType, results);
      setIngredientsSearchResults(filteredResults);
    }
  }, []);

  // useEffect(() => {
  //   if (ingredientSearchInput.length >= 3) {
  //     fetchSearchResults(ingredientSearchInput);
  //   }
  // }, [ingredientSearchInput, fetchSearchResults]);

  
  useEffect(() => {
    // fetch type_r
    async function fetchTypeREnum() {
      try {
        let { data: types_enum, error } = await supabase.rpc('get_enum_values_for_types_r');
        if (error) throw error;
        console.log('types_enum', types_enum);

        // Storing the result in the component state
        setTypeREnum(types_enum);
      } catch (error) {
        console.error(error);
      }
    }
    // fetch cmv
    async function fetchCmvEnum() {
      try {
        let { data: cmv_enum, error } = await supabase.rpc('get_enum_values_for_cmv');
        if (error) throw error;
        console.log('cmv_enum', cmv_enum);

        // Storing the result in the component state
        setCmvEnum(cmv_enum);
      } catch (error) {
        console.error(error);
      }
    }
    // fetch mode
    async function fetchModeEnum() {
      try {
        let { data: modes_enum, error } = await supabase.rpc('get_enum_values_for_modes');
        if (error) throw error;
        console.log('modes_enum', modes_enum);

        // Storing the result in the component state
        setModeEnum(modes_enum);
      } catch (error) {
        console.error(error);
      }
    }

    fetchTypeREnum();
    fetchCmvEnum();
    fetchModeEnum();
  }, []);

  const ingredientTypes = ['viande', 'oeuf', 'laitage', 'legume', 'feculent', 'huile'] as const;

type IngredientType = typeof ingredientTypes[number];

interface FormData {
  title: string;
  comment: string;
  type_r: string;
  cmv: string;
  mode: string;
  viande: { id: string; title: string };
  oeuf: { id: string; title: string };
  laitage: { id: string; title: string };
  legume: { id: string; title: string };
  feculent: { id: string; title: string };
  huile: { id: string; title: string };
  objective: number;
}

  const initialState: FormData = {
    title: '',
    comment: '',
    type_r: 'PRO BARF (sans amidon)',
    cmv: "Vit'i5 Orange (pot 600g)",
    mode: '100% ration ménagère',
    viande: { id: '', title: '' },
    oeuf: { id: '', title: '' },
    laitage: { id: '', title: '' },
    legume: { id: '', title: '' },
    feculent: { id: '', title: '' },
    huile: { id: '', title: '' },
    objective: 1,
  }

  const [formData, setFormData] = useState<FormData>(initialState);

  const calculate_quantity = (rationIngredient: { id: string, title: string }) => {
    // TO DO
    //fetch ingredient from id

    return 7;
    // need to gget ingredient info
  }
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setIsSubmitting(true);
    console.log('submitting Form data:', formData);

    //CALCULATE NUTRITION GOAL OF OVERALL RATION BASED ON OBJ
    // if (nutritionalNeeds) {
    const nutritionGoal = {...nutritionalNeeds,
        calories: 1/formData.objective * nutritionalNeeds.calories,
        // rpc: 1/formData.objective * nutritionalNeeds.rpc,  // rpc stays the same
        calcium: 1/formData.objective * nutritionalNeeds.calcium
      }
      //pet.veg_quantity
      console.log('nutritionGoal', nutritionGoal);
    // }

    //mode
    //type_r

    try {
      const quantities = await Promise.all([
        // Assuming calculate_quantity is an async function and returns a quantity
        calculate_quantity(formData.viande),
        calculate_quantity(formData.oeuf),
        calculate_quantity(formData.laitage),
        calculate_quantity(formData.legume),
        calculate_quantity(formData.feculent),
        calculate_quantity(formData.huile),
      ]);

      // Construct an array of ration ingredients with quantities
      const rationIngredients = [
        { ingredientId: formData.viande, quantity: quantities[0] },// id, title , quté
        { ingredientId: formData.oeuf, quantity: quantities[1] },
        { ingredientId: formData.laitage, quantity: quantities[2] },
        { ingredientId: formData.legume, quantity: quantities[3] },
        { ingredientId: formData.feculent, quantity: quantities[4] },
        { ingredientId: formData.huile, quantity: quantities[5] },
      ];

      // Insert the main ration first
      insertPetRation({
        petId: Array.isArray(petId) ? petId[0] : petId,
        data: formData
        //add nutrition info based on objective?? - quantities will depend on it
      }, {
        onSuccess: async (newRation) => {
          console.log('Ration inserted successfully', newRation);

          // Insert all ration ingredients with calculated quantities
          for (const { ingredientId, quantity } of rationIngredients) {
            if (ingredientId && quantity) { // Ensure there's an ID and a calculated quantity
              await insertRationIngredient({
                rationId: newRation.id,
                ingredientId: ingredientId,
                quantity: quantity // change API to supports a 'quantity' field
              });
            }
          }

          console.log('All ration ingredients inserted successfully');
          resetFields();
          router.back();
        },
        onError: (error) => {
          console.error('Error inserting new ration:', error);
          setIsSubmitting(false); // Submission failed, hide activity indicator
        },
      });
    } catch (error) {
      console.error('Error calculating quantities:', error);
      setIsSubmitting(false); // Error occurred, hide activity indicator
    }
  }


  const resetFields = () => {
    setFormData(initialState)
  }

  const handleChange = (field: string, value: any) => {
    setFormData({ ...formData, [field]: value});
    console.log('formdata.viande',formData.viande)
  };


  const selectItem = (ingredientType: string, item: {id: string, title: string} | null) => {
    if (item) {
      handleChange(ingredientType, item) 
      // console.log('viande', item);
      setPickerOpened(false);
    }
  }

  const handleIngredientSearchItemSelect = (item: Ingredient) => {
    console.log('choosing',item)
    if (currentIngredientType) {
      handleChange(currentIngredientType, item);
      setIngredientSearchInput('')
      setIngredientsSearchResults([])
      setPickerOpened(false);
    }
  };

  const openPicker = (ingredientType: string) => {
    setCurrentIngredientType(ingredientType);
    setPickerOpened(true);
  };


  if (isSubmitting || isNutritionalNeedsLoading || isViandeLoading || isOeufsLoading || isLaitagesLoading || isLegumesLoading || isFeculentsLoading || isHuilesLoading) return <ActivityIndicator size="large" color="#0000ff"/>
  if (viandeError || nutritionalNeedsError || oeufError || laitageError || legumeError || feculentError || huileError) return <Text>Erreur</Text>
  
  if (pickerOpened) {
    console.log('opening picker') 
    return (
      <View style={styles.pickerContainer}>
          <AntDesign onPress={() => setPickerOpened(false)} name="close" size={30} color="black" style={{position: 'absolute', right: 10, top: 10}}/>
          <View style={{flexDirection: 'row', alignItems: 'center',gap: 10}}>
            <TextInput value={ingredientSearchInput} onChangeText={setIngredientSearchInput} placeholder='Search...' style={styles.input}/>
            <Button title='Search' onPress={() => fetchSearchResults(ingredientSearchInput, currentIngredientType)} />
            {/* ingredientsSearchResults, isLoading: isIngredientsSearchResultsLoading, error: ingredientsSearchResultsError */}
          </View>
          {/* <Button title='Search' onPress={performSearch}/> */}

          {/* {loading && <ActivityIndicator/>} */}
          <FlatList
            data={ingredientsSearchResults}
            renderItem={({item})=> <IngredientSearchItem item={item} onSelect={handleIngredientSearchItemSelect}/>}
            ListEmptyComponent={() => <Text>Type something and click search to show results</Text>} // render when there is no data
            contentContainerStyle={{gap: 5}}
            style={styles.searchResultsContainer}
          />
      </View>
    )
  }


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



      {ingredientTypes.map((ingredientType) => (
        <Pressable key={ingredientType} style={styles.input} onPress={() => openPicker(ingredientType)}>
          <Text>
            {formData[ingredientType].title || ingredientType.charAt(0).toUpperCase() + ingredientType.slice(1)}
          </Text>
        </Pressable>
      ))}








      
      {/*<AutocompleteDropdown
        clearOnFocus={false}
        closeOnBlur={true}
        closeOnSubmit={false}
        initialValue={formData.viande}
        onSelectItem={(item) => selectItem('viande', item)}
        dataSet={showSuggestions ? viandes : null}
        onChangeText={(text) => {handleInputChange(text)}}
        inputContainerStyle={[styles.input, {position: 'relative'}]}

        showChevron={false}
      />*/}
{/* 
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
      /> */}


      <Text style={{color: 'white'}}>Objectif nutrition:</Text>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text style={{color: 'white'}}>1/</Text>
        <TextInput
          style={{flexShrink: 1,
            height: 40,
            marginHorizontal: 5,
            paddingHorizontal: 5,
            backgroundColor: 'white'}}
          keyboardType="numeric"
          value={formData.objective.toString()}
          onChangeText={(text) => handleChange('objective', text)}
          />
        <Text style={{color: 'white'}}>des apports journaliers</Text>
      </View>

      <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: '5%' }}>
        <Link href={`/pets/${id}` as any} asChild>
          <Text style={styles.link}>Cancel</Text>
        </Link>
        <Button title="Submit" onPress={handleSubmit} />
      </View>
    </ScrollView>
  </AutocompleteDropdownContextProvider>
  );
}


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
  },
  pickerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  // itemText: {
  //   backgroundColor: 'white',
  //   padding: 10,
  //   marginVertical: 5,
  //   borderRadius: 5,
  // }, 
  dropdown: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    justifyContent: 'center',
    borderRadius: 5,
    backgroundColor: 'white',
  },
  pickerOverlay: {
    position: 'absolute',
    top: 40,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    zIndex: 1000,
  },
  searchResultsContainer: {
    backgroundColor: 'white'
  }
});

export default AddPetRationForm;
