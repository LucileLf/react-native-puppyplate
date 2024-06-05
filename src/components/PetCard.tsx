import Colors from '@/constants/Colors';
import { Dimensions, StyleSheet, Text, View, Image, Pressable } from 'react-native';
import { Pet } from '@/types'
import { Link } from 'expo-router';
// import {defaultPetImage} from '@assets/images/no-pet-image.webp'
// import defaultPetImage from '@assets/images/no-pet-image.webp'
import defaultPetImage from '@assets/images/no-pet-image.webp'
import { useTheme } from '@react-navigation/native';
import { petImages } from '@assets/data/pets'
import { orange } from '@/constants/Colors'

type PetCardProps = {
  pet: Pet;
}

export const PetCard = ({ pet }: PetCardProps) => {
  // const imagePath = `@assets/images/${pet.name}.jpg`
  // console.log('pet iamge', pet.image);
// const imageName = pet.image
const {colors} = useTheme();

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.card,
    padding: 10,
    borderRadius: 20,
    flex: 1,
    maxWidth: '50%',
    height: screenHeight / 3,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: '10%',
    marginTop: 16
    //     borderColor: orange,
    // borderWidth: 4,
  },
  image: {
    width: '100%',
    height: '70%',
    borderRadius: 16,
    alignSelf: 'flex-start',
    // borderColor: orange,
    // borderWidth: 8,
  },
  titleContainer: {
    // height: '10%',
    height: 'fit-content',
    paddingBottom: 8,
    borderBottomColor: orange,
    borderBottomWidth: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  price: {
    color: Colors.light.tint,
    fontWeight: 'bold',
  },
});


  return (
    // <View style={{marginTop: 8}}>

    <Link href={`/pets/${pet.id}` as any} asChild>
      <Pressable style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>  {pet.name}  </Text>
        </View>
        <Image
          source={pet.image ? petImages[pet.id] : petImages.defaultImage}
          style={styles.image}
          resizeMode='cover'
          />
      </Pressable>
    </Link>
          // </View>
  )
}

const screenHeight = Dimensions.get('window').height;
