import { Pet, Ration } from '@/types';
import { Stack, Link } from 'expo-router';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import NutritionalTable from '@/components/NutritionTable'
import { useRationIngredients } from '@/api/rations';

type RationDetailsProps = {
  ration: Ration
}

export const RationDetails = ({ ration }: RationDetailsProps) => {

  const {data: ration_ingredients_ids, isLoading: isRationIngredientsLoading, error: rationIngredientsError} = useRationIngredients(ration.id)

  console.log('ration_ingredients', ration_ingredients_ids);
  console.log('isRationIngredientsLoading', isRationIngredientsLoading);
  console.log('rationIngredientsError', rationIngredientsError);

  if (isRationIngredientsLoading) {return <ActivityIndicator/>}

  if (!ration_ingredients_ids || rationIngredientsError) {return <Text>no ingredients</Text>}
    return (
      <ScrollView>
        <Stack.Screen options={{ title: ration.title}} />
        <Text style={{color: 'white'}}>{ration.comment}</Text>
        <View style={styles.container}>
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
              calories: 1000,
              rpc: 1000,
              calcium: ration.calcium
              // Add more nutritional properties
            }
          } />
          <AntDesign name="edit" size={24} color="black" />
          {ration_ingredients_ids?.map((ingredient_id) => {
            return(
              <Text>{ingredient_id.ingredient_id}</Text>
              // a custom component with ingredient_id as prop
              // const {data: ingredients, isLoading: isIngredientsLoading, error: ingredientsError} = useIngredients(ration_ingredients_ids)
              // console.log('ingredients', ingredients);
              // console.log('isIngredientsLoading', isIngredientsLoading);
              // console.log('rationIngredientsError', rationIngredientsError);
              // <Text key={ingredient.id}>{ingredient.FOOD_LABEL}</Text>
            )
          })}
        </View>
      </ScrollView>

    );
  }


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
    borderRadius: 12
  },
  profileDetails: {
    width: '50%',
    fontSize: 18,
    fontWeight: '600',
    marginVertical: 10,
    // textAlign: 'right',
  },
  nutritionContainer: {
    // color: Colors.light.tint,
    // fontWeight: 'bold',
  },
  title: {
    fontWeight: 'bold'
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
;
