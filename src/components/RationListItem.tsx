import { Ration } from "@/types";
import { View, Text, Image, StyleSheet, ScrollView, FlatList, Pressable } from 'react-native'
import rationPicture from '@assets/images/dog-food.jpg'
import { Link } from 'expo-router';

interface RationListItemProps {
  ration: Ration | undefined
}

export const RationListItem = ({ ration }: RationListItemProps) => {
  return (
    <Link href={`/rations/${ration?.id}`} asChild>
      <Pressable style={styles.rationContainer}>
        <Image
          source={rationPicture}
          style={styles.image}
          resizeMode='contain'
        />
        <View style={styles.rationDetails}>
          <Text style={{fontWeight: 'bold'}}>{ration?.titre}</Text>
          <Text>{ration?.type_r}</Text>
          <Text>{ration?.cmv}</Text>
          <Text>{ration?.mode}</Text>
        </View>

      </Pressable>
    </Link>
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
