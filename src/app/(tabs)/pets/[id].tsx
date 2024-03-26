import { Pet } from '@/types';
import { Stack, useLocalSearchParams } from 'expo-router';
import { View, Text, Image, StyleSheet } from 'react-native'
import petsData from '@assets/data/pets'
import defaultPetImage from '@assets/images/no-pet-image.webp'
import Colors from '@/constants/Colors';
import { AntDesign } from '@expo/vector-icons'


const PetDetailsScreen = () => {
  const { id } = useLocalSearchParams();
  const petIds: string[] = Array.isArray(id) ? id : [id];
  let pet: Pet | undefined; // Declare pet outside the loop

  petIds.forEach((petId: string) => {
    pet = petsData.find((pet) => pet.id === parseInt(petId, 10));
  });

  return( pet &&
    <View>
      <Stack.Screen options={{ title: pet.name}} />
      <View style={styles.container}>
      <AntDesign name="edit" size={24} color="black" />
        <View style={styles.profile}>
          <Image
            style={styles.profilePicture}
            source={ pet.image ? pet.image : defaultPetImage }
            resizeMode='contain'
            />
          <View style={styles.profileDetails}>
            <Text>{pet.breed}</Text>
            <Text>{pet.activity}</Text>
            <Text>{pet.life_stage}</Text>
            <Text>{pet.sterilized}</Text>
            <Text>{pet.lieu_de_vie}</Text>
          </View>
        </View>

        <View style={styles.nutritionContainer}>
          <Text style={styles.title}>Besoins nutritionnels</Text>
          <View style={styles.nutritionTable}>
            <View style={styles.row}>
              <Text style={styles.cell}>Calories</Text>
              <Text style={styles.cell}>RPC</Text>
              <Text style={styles.cell}>Calcium</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.cell}>{pet.nutritional_needs?.calories}</Text>
              <Text style={styles.cell}>{pet.nutritional_needs?.rpc}</Text>
              <Text style={styles.cell}>{pet.nutritional_needs?.calcium}</Text>
            </View>
          </View>
        </View>

        <View style={styles.weightContainer}>
          <Text style={styles.title}>Courbe de poids</Text>
          <View style={styles.weightGraph}></View>
        </View>

      </View>
    </View>
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
    justifyContent: 'space-between',
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

  },
  weightGraph: {

  },
});


export default PetDetailsScreen;
