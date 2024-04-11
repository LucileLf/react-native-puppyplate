import { Pet } from '@/types';
import { Stack, Link } from 'expo-router';
import { View, Text, Image, StyleSheet, ScrollView, FlatList, ActivityIndicator } from 'react-native'
import defaultPetImage from '@assets/images/no-pet-image.webp'
import { AntDesign } from '@expo/vector-icons'
import { usePetBreed, usePet, useActivity, useStage, useEnv, useVeg, usePetNutritionalNeeds, usePetWeights } from '@/api/pets';
import { usePetRations } from '@/api/rations';
import NutritionalTable from '@/components/NutritionTable'
import AddButton from './AddButton';
import ChartComponent from './ChartComponent';
import { RationListItem } from './RationListItem';

type PetDetailsProps = {
  pet: Pet;
}

export const PetDetails = ({ pet }: PetDetailsProps) => {

  console.log('pet from pet details', pet)
  const { data: breedData, isLoading: isBreedLoading, error: breedError } = usePetBreed(pet?.breed, {
    enabled: !!pet // This query will only run if pet.breed is truthy
  });
  const { data: activityData, isLoading: isActivityLoading, error: activityError } = useActivity(pet?.activity, {
    enabled: !!pet
  });
  const { data: stageData, isLoading: isStageLoading, error: stageError } = useStage(pet?.life_stage, {
    enabled: !!pet
  });
  const { data: vegData, isLoading: isVegLoading, error: vegError } = useVeg(pet?.veg_quantity, {
    enabled: !!pet
  });
  const { data: envData, isLoading: isEnvLoading, error: envError } = useEnv(pet?.environment, {
    enabled: !!pet
  });

  const { data: nutritionalNeedsData, isLoading: isNutritionalNeedsLoading, error: nutritionalNeedsError } = usePetNutritionalNeeds(pet.id, {
    enabled: !!pet
  });

  const { data: weightsData, isLoading: isWeightsLoading, error: weightsError } = usePetWeights(pet.id, {
    enabled: !!pet
  });

  const { data: rationsData, isLoading: isRationsLoading, error: rationsError } = usePetRations(pet.id, {
    enabled: !!pet
  });

  console.log('rationsData', rationsData)
  console.log('isRationsLoading', isRationsLoading)
  console.log('rationsError', rationsError)
  // console.log("weightsData", weightsData);
  // console.log('isBreedLoading', isBreedLoading);
  // console.log('isActivityLoading', isActivityLoading);
  // console.log('isStageLoading', isStageLoading);
  // console.log('isEnvLoading', isEnvLoading);
  // console.log('isVegLoading', isVegLoading);


  const isLoading = isBreedLoading || isActivityLoading || isStageLoading || isEnvLoading || isVegLoading;
  const error = breedError || activityError || stageError || envError || vegError || weightsError; // shows first error encountered

  if (isLoading) { return <ActivityIndicator/>}
  if (error) { return <Text>Failed to fetch pets</Text> }

  if (!pet) {
    return (
      <View style={styles.container}>
        <Text>No pet data available</Text>
      </View>
    );
  }

  // TODO: REPLACE WITH API CALLS
  // const currentRation: Ration | undefined = rations.find(ration => ration.current && ration.pet_id === pet?.id);
  // const otherRations: Ration[] | undefined = rations.filter(ration => ration.current === false && ration.pet_id === pet?.id);

  return (
    <ScrollView>
      <Stack.Screen options={{ title: pet.name}} />
      <View style={styles.container}>

        <AntDesign name="edit" size={24} color="black" />

        <View style={styles.profile}>
          <Image
            style={styles.profilePicture}
            source={ pet.image || defaultPetImage }
            // source={pet.image ? { uri: pet.image } : require('@assets/images/no-pet-image.webp')}
            resizeMode='contain'
            />
          <View style={styles.profileDetails}>
            <Text>{breedData.breed}</Text>
            <Text>{activityData.activityLevel}</Text>
            <Text>{stageData.lifeStage}</Text>
            <Text>{pet.sterilized ? "Stérilizé.e" : "Entièr.e"}</Text>
            <Text>Lieu de vie: {envData.environment}</Text>
            <Text>Quantité de légumes: {vegData.vegQuantity}</Text>
          </View>
        </View>

          <View style={styles.nutritionContainer}>
            <Text style={styles.title}>Besoins nutritionnels</Text>

            {isNutritionalNeedsLoading && <ActivityIndicator/>}
            {nutritionalNeedsError && <Text>No nutritional needs</Text>}
            {(!isNutritionalNeedsLoading && !nutritionalNeedsError) &&
              <NutritionalTable nutritionalNeeds={nutritionalNeedsData} />
            }
        </View>

       <View style={styles.weightContainer}>
           <Text style={styles.title}>Courbe de poids</Text>
          {isWeightsLoading && <ActivityIndicator/>}
          {(weightsData && !weightsError) &&
            <View style={styles.weightGraph}>
              <ChartComponent weightData={weightsData} idealWeight={pet.ideal_weight} />
            </View>
          }
          <Link href={`/pets/${pet.id}/new-weight` as any} asChild>
            <AddButton text={`Enregistrer un poids pour ${pet.name}`}/>
          </Link>
        </View>


{/* si pas de ration, text aucune ration */}

{/* current ration: if loading, act.ind. / if none, Text: pas de ration sélectionnée */}
        {/* <View style={styles.currentRationContainer}>
          <Text style={styles.title}>Ration actuelle</Text>
          <RationListItem ration={currentRation}/>
        </View> */}

{/* other rations: if loadgin, act.ind / if none, dipaly nothing but button */}

        <View style={styles.rationsContainer}>
          <Text style={styles.title}>Rations</Text>
          {isRationsLoading && <ActivityIndicator/>}
          {(!rationsData || rationsError) && <Text>No rations</Text>}
          {rationsData &&
            rationsData.map((ration)=> <RationListItem key={ration.id} ration={ration}/>)
          }
        <Link href={`/pets/${pet.id}/new-ration` as any} asChild>
          <AddButton text={`Ajouter une recette pour ${pet.name}`}/>
        </Link>
        </View>

      </View>
    </ScrollView>
  )







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
