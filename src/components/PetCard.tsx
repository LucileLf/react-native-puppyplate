import Colors from '@/constants/Colors';
import { Dimensions, StyleSheet, Text, View, Image, Pressable } from 'react-native';
import { Pet } from '@/types'
import { Link } from 'expo-router';
// import {defaultPetImage} from '@assets/images/no-pet-image.webp'
// import defaultPetImage from '@assets/images/no-pet-image.webp'

type PetCardProps = {
  pet: Pet;
}

export const PetCard = ({ pet }: PetCardProps) => {
  // const imagePath = `@assets/images/${pet.name}.jpg`
  // console.log('pet iamge', pet.image);
// const imageName = pet.image
  return (
    <Link href={`/pets/${pet.id}`} asChild>
      <Pressable style={styles.container}>
        <Text>{pet.name}</Text>
        <Image
          source={{uri: pet.image}}
          style={styles.image}
          resizeMode='contain'
        />
      </Pressable>
    </Link>
  )
}

const screenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 20,
    flex: 1,
    maxWidth: '50%',
    height: screenHeight / 2,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  image: {
    width: '100%',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginVertical: 10
  },
  price: {
    color: Colors.light.tint,
    fontWeight: 'bold',
  },
});
