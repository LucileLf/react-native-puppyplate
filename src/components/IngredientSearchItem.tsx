
import { View, Text, Image, StyleSheet, Button, TouchableOpacity } from 'react-native'
// import rationPicture from '@assets/images/dog-food.jpg'
import { Link, useLocalSearchParams } from 'expo-router';
import AntDesign from "@expo/vector-icons/build/AntDesign";
import { Feather } from '@expo/vector-icons';
import { colors } from "react-native-elements";
import { useQueryClient } from "@tanstack/react-query";
import { Ingredient } from "@/types";
import { log } from 'console';

interface IngredientSearchItemProps {
    item: Ingredient;
    onSelect: (item: Ingredient) => void
}


export const IngredientSearchItem = ({ item, onSelect }: IngredientSearchItemProps) => {
    // console.log('searchitem for', item);
//   const { id: petId } = useLocalSearchParams();
//   const {colors} = useTheme();
//   const queryClient = useQueryClient();

//   console.log('id from aparms', petId)
//   const { mutate: updateRationToCurrent, error: errorSettingToCurrent } = useUpdateRationToCurrent(ration.id)
//   const { mutate: updateRationToNotCurrent, error: errorSettingToNotCurrent } = useUpdateRationToNotCurrent(ration.id)
//   console.log('errorSettingToCurrent', errorSettingToCurrent)
//   console.log('errorSettingToNotCurrent', errorSettingToNotCurrent)
//   console.log('updateRationToCurrent', updateRationToCurrent)

  //   console.log('title', ration.title);
  //   console.log('type', ration.type_r);
//   const handleMakeRationCurrent = async (ration:Ration) => {
//     try {
//       if (ration.current) {
//         await updateRationToNotCurrent();
//       } else {
//         await updateRationToCurrent();
//       }
//     } catch (error) {
//       console.error('Failed to update ration:', error);
//     }
//   };
//     const styles = StyleSheet.create({
//       rationContainer: {
//         borderRadius: 8,
//         borderBottomColor: '',
//         borderBottomWidth: 1,
//         paddingBottom: 8,
//       },
//       rationSubContainer: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'center',
//         borderRadius: 8,
//         padding: 8,
//       },
//       image: {
//         // flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         // height: '100%',
//         maxWidth: '25%',
//         aspectRatio: 1,
//       },
//       rationDetails:{
//         flex: 1,
//         paddingTop: 0,
//         marginTop: 0
//       },
//       checkMark: {
//         width: '10%',
//       }
//     });
//     if (!ration) {
//       return null;
//     }


const styles = StyleSheet.create({
    itemContainer: {
      borderRadius: 8,
      borderBottomColor: '',
      borderBottomWidth: 1,
      paddingBottom: 8,
    },
    rationSubContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 8,
      padding: 8,
    },
    image: {
      // flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      // height: '100%',
      maxWidth: '25%',
      aspectRatio: 1,
    },
    rationDetails:{
      flex: 1,
      paddingTop: 0,
      marginTop: 0
    },
    checkMark: {
      width: '10%',
    }
  });


  return (
    <>
      <TouchableOpacity style={styles.itemContainer} onPress={() => onSelect(item)}> 
        <Text>{item.title}</Text>
       </TouchableOpacity>
    </>
  )
};
