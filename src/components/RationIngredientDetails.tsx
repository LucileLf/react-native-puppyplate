import { Ration } from "@/types";
import { View, Text, Image, StyleSheet, ScrollView, FlatList, Pressable, ActivityIndicator } from 'react-native'
// import rationPicture from '@assets/images/dog-food.jpg'
import { Link } from 'expo-router';
import { useIngredient } from "@/api/rations";

type RationIngredientDetailsProps = {
  ingredient_id: string
}

export const RationIngredientDetails = ({ ingredient_id }: RationIngredientDetailsProps) => {
  const {data: ingredient, isLoading: isIngredientLoading, error: ingredientError} = useIngredient(ingredient_id)

  console.log('ingredient', ingredient);
  console.log('isIngredientLoading', isIngredientLoading);
  console.log('ingredientError', ingredientError);

  if (isIngredientLoading) {return <ActivityIndicator/>}

  if (!ingredient || ingredientError) {return <Text>ingredient details not found</Text>}

  return (
    <Text>{ingredient.title}</Text>
    // <Link href={`/rations/${ration?.id}`} asChild>
    //   <Pressable style={styles.rationContainer}>
    //     <Image
    //       source={rationPicture}
    //       style={styles.image}
    //       resizeMode='contain'
    //     />
    //     <View style={styles.rationDetails}>
    //       <Text style={{color: 'green', fontWeight: "500"}}>{ration?.current && "Ration actuelle"}</Text>
    //       <Text style={{fontWeight: 'bold'}}>{ration?.title}</Text>
    //       <Text>{ration?.type_r}</Text>
    //       <Text>{ration?.cmv}</Text>
    //       <Text>{ration?.mode}</Text>
    //     </View>

    //   </Pressable>
    // </Link>
  )
};

const styles = StyleSheet.create({
  rationContainer: {
   flexDirection: 'row',
   alignItems: 'center',
   backgroundColor: 'white',
   borderRadius: 8,
  //  marginHorizontal: 1,
   marginVertical: 4,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '35%',
    aspectRatio: 1,
  },
  rationDetails:{

  },
  titre: {

  }
});

// export default RationListItem;
