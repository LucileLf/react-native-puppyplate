import { Pet, Ration, Weight } from '@/types';
import { Stack, useLocalSearchParams } from 'expo-router';
import { View, Text, Image, StyleSheet, ScrollView, FlatList } from 'react-native'
import { pets, weights } from '@assets/data/pets'
import { rations } from '@assets/data/food'
import defaultPetImage from '@assets/images/no-pet-image.webp'
import Colors from '@/constants/Colors';
import { AntDesign } from '@expo/vector-icons'
import { Chart, Line, Area, HorizontalAxis, VerticalAxis } from 'react-native-responsive-linechart'
import ChartComponent from '@/components/ChartComponent';
import { RationListItem } from '@/components/RationListItem';


const PetDetailsScreen = () => {

  const { id } = useLocalSearchParams();
  const petIds: string[] = Array.isArray(id) ? id : [id];
  let pet: Pet | undefined;

  petIds.forEach((petId: string) => {
    pet = pets.find((pet) => pet.id === parseInt(petId, 10));
  });

  if (!pet) {
    return (
      <View style={styles.container}>
        <Text>No pet data available</Text>
      </View>
    );
  }

  const petWeights: Weight[] | undefined = weights.filter(weight => weight.pet_id === pet?.id);
  const currentRation: Ration | undefined = rations.find(ration => ration.current && ration.pet_id === pet?.id);
  const otherRations: Ration[] | undefined = rations.filter(ration => ration.current === false && ration.pet_id === pet?.id);
console.log("otherRations", otherRations);

  return (
    <ScrollView>
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
          <View style={styles.weightGraph}>
            <ChartComponent weightData={petWeights} />
          </View>
        </View>

        <View style={styles.currentRationContainer}>
          <Text style={styles.title}>Ration actuelle</Text>
          <RationListItem ration={currentRation}/>
        </View>

        <View style={styles.rationsContainer}>
          <Text style={styles.title}>Rations</Text>
          {otherRations.map((item)=> <RationListItem ration={item}/>)}
        </View>

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


export default PetDetailsScreen;
