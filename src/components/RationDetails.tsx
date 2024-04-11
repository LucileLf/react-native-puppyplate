import { Pet, Ration } from '@/types';
import { Stack, Link } from 'expo-router';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import NutritionalTable from '@/components/NutritionTable'
import {RationIngredientDetails} from '@/components/RationIngredientDetails'
import { useRationIngredients } from '@/api/rations';

type RationDetailsProps = {
  ration: Ration
}

export const RationDetails = ({ ration }: RationDetailsProps) => {

  const {data: ration_ingredients, isLoading: isRationIngredientsLoading, error: rationIngredientsError} = useRationIngredients(ration.id)

  console.log('ration_ingredients', ration_ingredients);
  console.log('isRationIngredientsLoading', isRationIngredientsLoading);
  console.log('rationIngredientsError', rationIngredientsError);

  if (isRationIngredientsLoading) {return <ActivityIndicator/>}

  if (!ration_ingredients || rationIngredientsError) {return <Text>no ingredients</Text>}
    return (
      <ScrollView>
        <Stack.Screen options={{ title: ration.title}} />
        <Text style={{color: 'white', fontStyle: 'italic'}}>{ration.comment}</Text>
        <View style={styles.container}>
          <Text>{ration.protein} protein</Text>
          <Text>{ration.fat} fat</Text>
          <Text>{ration.carb} carb</Text>
          <Text>{ration.cendre} cendre</Text>
          <Text>{ration.fiber} fiber</Text>
          <Text>{ration.calcium} calcium</Text>
          <Text>{ration.potassium} potassium</Text>
          <Text>Pourcentage de nutrition e l'animal</Text>
          <NutritionalTable nutritionalNeeds={
            {
              pet_id: ration.pet_id,
              calories: 1000,
              rpc: 1000,
              calcium: ration.calcium
              // Add more nutritional properties
            }
          } />
          {/* <AntDesign name="edit" size={24} color="black" /> */}
          {ration_ingredients?.map((ration_ingredient) => {
            return(
              <View key={ration_ingredient.id} style={{flexDirection: 'row'}}>
                <RationIngredientDetails ingredient_id={ration_ingredient.ingredient_id} />
                <Text> ({ration_ingredient.quantity_g}g)</Text>
              </View>
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
