import { Pet, Ration } from '@/types';
import { Stack, Link } from 'expo-router';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import NutritionalTable from '@/components/NutritionTable'
import {RationIngredientDetails} from '@/components/RationIngredientDetails'
import { useRationIngredients } from '@/api/rations';
import { useTheme } from '@react-navigation/native';

type RationDetailsProps = {
  ration: Ration
}

export const RationDetails = ({ ration }: RationDetailsProps) => {
console.log('hello from rationdetails')
  const {data: ration_ingredients, isLoading: isRationIngredientsLoading, error: rationIngredientsError} = useRationIngredients(ration.id)

  console.log('ration_ingredients', ration_ingredients);
  console.log('isRationIngredientsLoading', isRationIngredientsLoading);
  console.log('rationIngredientsError', rationIngredientsError);


  const {colors} = useTheme();

  const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      backgroundColor: colors.card,
      padding: 10,
      borderRadius: 20,
      justifyContent: 'space-between',
      marginHorizontal: 20,
      marginBottom: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 5,
      elevation: 3,
    },
    header: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
      textAlign: 'center',
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 5,
    },
    label: {
      fontSize: 16,
      color: '#333',
    },
    value: {
      fontSize: 16,
      fontWeight: 'bold',
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

  if (isRationIngredientsLoading) return <ActivityIndicator/>
  if ( !ration_ingredients || ration_ingredients.length === 0 || rationIngredientsError) return <View style={styles.container}><Text>Pas d'ingrédients</Text></View>

  return (
      <ScrollView>
        <Stack.Screen options={{ title: ration.title || 'Titre'}} />
        <Text style={{color: colors.card, fontStyle: 'italic', paddingLeft: '8%', fontSize: 15, paddingVertical: '2%'}}>{ration.comment || 'pas de commentaire '}</Text>
        <View style={styles.container}>

          {/* {ration_ingredients?.map((ration_ingredient) => {
            return(
              <View key={ration_ingredient.id} style={{flexDirection: 'row'}}>
                <RationIngredientDetails ingredient_id={ration_ingredient.ingredient_id} />
                <Text> ({ration_ingredient.quantity_g}g)</Text>
              </View>
            )
          })} */}


        <View style={styles.container}>
          <Text style={styles.header}>Nutritional Information</Text>
          {/* <View style={styles.row}>
            <Text style={styles.label}>Calories:</Text>
            <Text style={styles.value}>{ration.calories}</Text>
          </View> */}
          {/* <View style={styles.row}>
            <Text style={styles.label}>RPC:</Text>
            <Text style={styles.value}>{ration.rpc}</Text>
          </View> */}
          <View style={styles.row}>
            <Text style={styles.label}>Calcium:</Text>
            <Text style={styles.value}>{ration.calcium} mg</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Protein:</Text>
            <Text style={styles.value}>{ration.protein} g</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Fat:</Text>
            <Text style={styles.value}>{ration.fat} g</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Carbohydrates:</Text>
            <Text style={styles.value}>{ration.carb} g</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Cendre:</Text>
            <Text style={styles.value}>{ration.cendre} g</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Fiber:</Text>
            <Text style={styles.value}>{ration.fiber} g</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Potassium:</Text>
            <Text style={styles.value}>{ration.potassium} mg</Text>
          </View>
        </View>

{/*
          <Text>{ration.protein} protein</Text>
          <Text>{ration.fat} fat</Text>
          <Text>{ration.carb} carb</Text>
          <Text>{ration.cendre} cendre</Text>
          <Text>{ration.fiber} fiber</Text>
          <Text>{ration.calcium} calcium</Text>
          <Text>{ration.potassium} potassium</Text>
          <Text>Pourcentage de nutrition e l'animal</Text> */}
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

        </View>
      </ScrollView>

    );
  }



;
