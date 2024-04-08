import { Ingredient, Pet, Ration, Weight } from '@/types';
import { Stack, useLocalSearchParams } from 'expo-router';
import { View, Text, Image, StyleSheet, ScrollView, FlatList, ActivityIndicator } from 'react-native'
import { pets, weights } from '@assets/data/pets'
import { rations, ingredients, rations_ingredients } from '@assets/data/food'
import defaultPetImage from '@assets/images/no-pet-image.webp'
import Colors from '@/constants/Colors';
import { AntDesign } from '@expo/vector-icons'
import { Chart, Line, Area, HorizontalAxis, VerticalAxis } from 'react-native-responsive-linechart'
import ChartComponent from '@/components/ChartComponent';
import RationListItem from '@/components/RationListItem';
import { useRation } from '@/api/pets';
import NutritionalTable from '@/components/NutritionTable'


const RationDetailsScreen = () => {

  const { id } = useLocalSearchParams();

  const {data: ration, isLoading, error} = useRation(id)

  if (isLoading) {return <ActivityIndicator/>}

  if (!ration || error) {
    return (
      <View style={styles.container}>
        <Text>No recipe data available</Text>
      </View>
    );
  }

  //find rationingredient with ration_id = raiton.id, get ingredient info
  const rationsIngredients = rations_ingredients.filter((rationIngredient) => rationIngredient.ration_id === ration?.id);

  return (
    <ScrollView>
      <Stack.Screen options={{ title: ration.title}} />
      <Text style={{color: 'white'}}>{ration.comment}</Text>
      <View style={styles.container}>

        <AntDesign name="edit" size={24} color="black" />
        {rationsIngredients.map((rationIngredient) => {
          // Find the corresponding ingredient object
          const ingredient = ingredients.find((ingredient) => ingredient.id === rationIngredient.ingredient_id);
          // Display the quantity and details of the ingredient if found
          if (ingredient) {
            return (
              <View key={ingredient.id} style={{flexDirection: 'row'}}>
                <Text>{rationIngredient.quantity_g} g </Text>
                <Text>{ingredient.name}</Text>
                {/* Display other details of the ingredient */}
                {/* For example: <Text>{ingredient.description}</Text> */}
              </View>
            );
          } else {
            // If ingredient not found, display a placeholder or handle the case accordingly
            return <Text key={rationIngredient.ingredient_id}>Ingredient not found</Text>;
          }
        })}
        <Text>{ration.protein}</Text>
        <Text>{ration.fat}</Text>
        <Text>{ration.carb}</Text>
        <Text>{ration.cendre}</Text>
        <Text>{ration.fiber}</Text>
        <Text>{ration.calcium}</Text>
        <Text>{ration.potassium}</Text>
        <Text>Pourcentage de nutrition pour Frida</Text>
        <NutritionalTable nutritionalNeeds={

          {
            pet_id: ration.pet_id,
            calories: ration.calories,
            rpc: ration.rpc,
            calcium: ration.calcium
            // Add more nutritional properties
          }

        } />
      </View>
    </ScrollView>
  )
};



const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: 'gainsboro',
    padding: 10,
    borderRadius: 20,
    justifyContent: 'space-between',
  },
  // title: {

  // },
  profile: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    backgroundColor: 'white',
    borderRadius: 8,
    marginVertical: 4,
    paddingVertical: 4,
  },
  profilePicture: {
    width: '50%',
    aspectRatio: 1,
    borderRadius: 12,
  },
  profileDetails: {
    fontSize: 18,
    fontWeight: '600',
    marginVertical: 10,
    textAlign: 'right'
  },
  nutritionContainer: {
    // color: Colors.light.tint,
    // fontWeight: 'bold',
  },
  title: {
    fontWeight: 'bold'
  },
  nutritionTable: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    margin: 10,
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: 'black',
  },
  cell: {
    flex: 1,
    padding: 10,
    textAlign: 'center',
    borderLeftWidth: 1,
    borderColor: 'black',
  },
  weightContainer: {
    width: '100%',
    // overflow: 'scroll',

  },
  weightGraph: {
    // maxWidth: '100%'
    // flex: 1
  },
  chart: {
  },
  currentRationContainer: {

  },
  rationsContainer: {

  },
  rationsList: {

  }
});


export default RationDetailsScreen;
