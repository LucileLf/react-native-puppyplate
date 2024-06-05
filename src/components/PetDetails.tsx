import { Pet, Ration } from '@/types';
import { Stack, Link } from 'expo-router';
import { View, Text, Image, StyleSheet, ScrollView, FlatList, ActivityIndicator } from 'react-native'
// import defaultPetImage from '@assets/images/no-pet-image.webp'
import { AntDesign } from '@expo/vector-icons'
import { usePetBreed, usePet, useActivity, useStage, useEnv, useVeg, usePetNutritionalNeeds, usePetWeights } from '@/api/pets';
import { useCurrentPetRation, usePetRations } from '@/api/rations';
import NutritionalTable from '@/components/NutritionTable'
import AddButton from './AddButton';
import ChartComponent from './ChartComponent';
import { RationListItem } from './RationListItem';
// import { colors } from 'react-native-elements';
import { useTheme } from '@react-navigation/native';
import { orange } from '@/constants/Colors'
import { petImages } from '@assets/data/pets'

type PetDetailsProps = {
  pet: Pet;
}

export const PetDetails = ({ pet }: PetDetailsProps) => {
  const {colors} = useTheme();
// 
  const styles = StyleSheet.create({

    container: {
      flexGrow: 1,
      backgroundColor: colors.card,
      padding: 10,
      marginHorizontal: 20,
      borderRadius: 20,
      justifyContent: 'space-between',
      marginBottom: 10,
    },
    profileContainer: {
      flexDirection: 'row',
      backgroundColor: colors.card,
      marginHorizontal: 20,
      marginBottom: 10,
      borderRadius: 20,
    },
    profile: {
      width: '32%',
      // borderWidth: 2,
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      // backgroundColor: 'white',
      borderRadius: 8,
      marginVertical: 4,
      paddingVertical: 4,
      paddingHorizontal: 8
      // padding: 0

    },
    profilePicture: {
      width: '100%',
      aspectRatio: 1,
      borderRadius: 100,
      // position: 'top'
      // objectFit: 'top'
      // alignSelf: 'flex-start',
      // alignContent: 'flex-start'
    },
    profileDetails: {
      // alignItems: 'center',
      justifyContent: 'center',
      width: '68%',
      fontSize: 18,
      fontWeight: '600',
      marginVertical: 10,
      position: 'relative'
    },
    editIcon: {
      position: 'absolute',
      right: 16,
      top: 4,
      textDecorationLine: 'none'
    },
    petName: {
      fontWeight: 'bold',
      // color: orange
    },
    nutritionContainer: {
      // color: Colors.light.tint,
      // fontWeight: 'bold',
    },
    title: {
      fontWeight: 'bold',
      paddingBottom: 1,
      borderBottomColor: orange,
      borderBottomWidth: 2,
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
    legend: {
      height: 20,
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
    poids: {
      fontSize: 12
      // paddingTop: 4,
      // zIndex: 20
    },
    currentRationContainer: {

    },
    rationsContainer: {

    },
    rationsList: {

    }
  });
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
  // const { data: currentRationData, isLoading: isCurrentRationLoading, error: currentRationError } = useCurrentPetRation(pet.id, {
  //   enabled: !!pet
  // });

  console.log('rationsData', rationsData)
  console.log('isRationsLoading', isRationsLoading)
  console.log('rationsError', rationsError)
  // console.log("weightsData", weightsData);
  // console.log('isBreedLoading', isBreedLoading);
  // console.log('isActivityLoading', isActivityLoading);
  // console.log('isStageLoading', isStageLoading);
  // console.log('isEnvLoading', isEnvLoading);
  // console.log('isVegLoading', isVegLoading);
  // console.log('currentRationData', currentRationData)
  // console.log('isCurrentRationLoading', isCurrentRationLoading)
  // console.log('currentRationError', currentRationError)

  const isLoading = isBreedLoading || isActivityLoading || isStageLoading || isEnvLoading || isVegLoading || isRationsLoading ;
  const error = breedError || activityError || stageError || envError || vegError || weightsError || rationsError; // shows first error encountered

  if (isLoading) { return <ActivityIndicator/>}
  if (error) { return <Text>Failed to fetch pets</Text> }
  // console.log('rationsData.length', rationsData.length)

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
      <View style={styles.profileContainer}>
        <View style={styles.profile}>
          <Image
            style={styles.profilePicture}
            source={pet.image ? petImages[pet.id] : petImages.defaultImage}
            resizeMode='cover'
            />
        </View>
          <View style={styles.profileDetails}>
            {/* <Text style={styles.petName}>{pet.name}</Text> */}
            <Text>{breedData.breed}</Text>
            <Text>Activité: {activityData.activityLevel}</Text>
            {/* <Text>{stageData.lifeStage}</Text> */}
            {/* <Text>{pet.sterilized ? "Stérilizé.e" : "Entièr.e"}</Text> */}
            <Text>Lieu de vie: {envData.environment}</Text>
            <Text>Quantité de légumes: {vegData.vegQuantity}</Text>
          </View>
          <AntDesign style={styles.editIcon} name="edit" size={24} color="black" />
      </View>


      <View style={styles.container}>
        <Text style={styles.title}>Besoins nutritionnels</Text>
        {isNutritionalNeedsLoading && <ActivityIndicator/>}
        {nutritionalNeedsError && <Text>No nutritional needs</Text>}
        {(!isNutritionalNeedsLoading && !nutritionalNeedsError) &&
          <NutritionalTable nutritionalNeeds={nutritionalNeedsData} />
        }
      </View>

      <View style={styles.container}>
        <Text style={styles.title}>Courbe de poids</Text>
        {isWeightsLoading && <ActivityIndicator/>}
        {(weightsData && !weightsError) &&
          <View style={styles.weightGraph}>
            <ChartComponent weightData={weightsData} idealWeight={pet.ideal_weight} />
          </View>
        }
        <View style={styles.legend}>
          <View style={styles.legend}>
            <View
              style={{
                borderBottomColor: 'blue',
                borderBottomWidth: 1,
                width: 12,
                marginBottom: 10,
                marginRight: 6
              }}
            />
            <Text style={styles.poids}>Poids</Text>
          </View>

          <View style={styles.legend}>
            <View
              style={{
                borderBottomColor: 'red',
                borderBottomWidth: 1,
                width: 12,
                marginBottom: 10,
                marginRight: 6
              }}
            />
            <Text style={styles.poids}>Poids idéal</Text>
          </View>

        </View>
        <Link href={`/pets/${pet.id}/new-weight` as any} asChild>
          <AddButton text={`Enregistrer un poids pour ${pet.name}`}/>
        </Link>
      </View>

        <View style={styles.container}>
          <Text style={styles.title}>Rations</Text>
          {isRationsLoading && <ActivityIndicator />}
          {/* {(rationsError || !rationsData ) ? <Text>Error fetching rations</Text>
            :
          rationsData.map((ration) => <RationListItem key={ration.id} ration={ration} />)
          } */}
          {!isRationsLoading && !rationsError && rationsData && rationsData.length > 0 ? (
            rationsData
              // .filter((ration) => ration.id !== currentRationData.id)
              .map((ration) => <RationListItem key={ration.id} ration={ration} />)
          ) : (
            <Text>No rations available</Text>
          )}
        <Link href={`/pets/${pet.id}/new-ration` as any} asChild>
          <AddButton text={`Ajouter une recette pour ${pet.name}`}/>
        </Link>
        </View>

    </ScrollView>
  )


}



;
