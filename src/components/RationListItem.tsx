import { Ration } from "@/types";
import { View, Text, Image, StyleSheet, ScrollView, FlatList, Pressable, TouchableOpacity } from 'react-native'
import rationPicture from '@assets/images/dog-food.jpg'
import { Link } from 'expo-router';
import AntDesign from "@expo/vector-icons/build/AntDesign";
import { Feather } from '@expo/vector-icons';
import { useUpdateRationToCurrent, useUpdateRationToNotCurrent } from "@/api/rations";

interface RationListItemProps {
  ration: Ration
}

export const RationListItem = ({ ration }: RationListItemProps) => {
  const { mutate: updateRationToCurrent, error: errorSettingToCurrent } = useUpdateRationToCurrent(ration.id)
  const { mutate: updateRationToNotCurrent, error: errorSettingToNotCurrent } = useUpdateRationToNotCurrent(ration.id)
  console.log('errorSettingToCurrent', errorSettingToCurrent)
  console.log('errorSettingToNotCurrent', errorSettingToNotCurrent)
  console.log('updateRationToCurrent', updateRationToCurrent)

  return (
    <>
      <Link href={`/rations/${ration.id}`} asChild>
        <Pressable style={styles.rationContainer}>
          <Image
            source={rationPicture}
            style={styles.image}
            resizeMode='contain'
          />
          <View style={styles.rationDetails}>
            <Text style={{color: 'green', fontWeight: "500"}}>{ration.current && "Ration actuelle"}</Text>
            <Text style={{fontWeight: 'bold'}}>{ration.title}</Text>
            <Text>{ration.type_r}</Text>
            <Text>{ration.cmv}</Text>
            <Text>{ration.mode}</Text>
          </View>

        </Pressable>
      </Link>
      <TouchableOpacity onPress={() => {
        ration.current ? updateRationToNotCurrent() : updateRationToCurrent()
      }}>
        <Feather name="check-circle" size={24} color={ration.current ? 'green' : 'lightgray'} style={styles.checkMark} />
      </TouchableOpacity>
    </>
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
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '25%',
    aspectRatio: 1,
  },
  rationDetails:{
    width: '65%'
  },
  checkMark: {
    width: '10%',
  }
});

// export default RationListItem;
