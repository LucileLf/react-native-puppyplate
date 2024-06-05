import { Ration } from "@/types";
import { View, Text, Image, StyleSheet, ScrollView, FlatList, Pressable, TouchableOpacity } from 'react-native'
// import rationPicture from '@assets/images/dog-food.jpg'
import { Link, useLocalSearchParams } from 'expo-router';
import AntDesign from "@expo/vector-icons/build/AntDesign";
import { Feather } from '@expo/vector-icons';
import { useUpdateRationToCurrent, useUpdateRationToNotCurrent } from "@/api/rations";
import { colors } from "react-native-elements";
import { useTheme } from "@react-navigation/native";
import {green, lightgray, orange, darkbeige, indent} from '@/constants/Colors'
import { useQueryClient } from "@tanstack/react-query";
interface RationListItemProps {
  ration: Ration
}


export const RationListItem = ({ ration }: RationListItemProps) => {
  const { id: petId } = useLocalSearchParams();
  const {colors} = useTheme();
  const queryClient = useQueryClient();

  console.log('id from aparms', petId)
  const { mutate: updateRationToCurrent, error: errorSettingToCurrent } = useUpdateRationToCurrent(ration.id)
  const { mutate: updateRationToNotCurrent, error: errorSettingToNotCurrent } = useUpdateRationToNotCurrent(ration.id)
  console.log('errorSettingToCurrent', errorSettingToCurrent)
  console.log('errorSettingToNotCurrent', errorSettingToNotCurrent)
  console.log('updateRationToCurrent', updateRationToCurrent)

  //   console.log('title', ration.title);
  //   console.log('type', ration.type_r);
  const handleMakeRationCurrent = async (ration:Ration) => {
    try {
      if (ration.current) {
        await updateRationToNotCurrent();
      } else {
        await updateRationToCurrent();
      }
    } catch (error) {
      console.error('Failed to update ration:', error);
    }
  };
    const styles = StyleSheet.create({
      rationContainer: {
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
    if (!ration) {
      return null;
    }
  return (
    <>
      {/* <View style={styles.rationContainer}> */}
        <Link href={`/pets/${petId}/rations/${ration.id}` as any} asChild>
          <Pressable style={styles.rationContainer}>
            {ration.current &&
              <Text style={{color: colors.buttonBackground, fontWeight: "500", paddingLeft: '2.5%', paddingBottom:0, marginBottom: 0,paddingTop: 4}}>Ration actuelle</Text>
            }
            <View style={styles.rationSubContainer}>

              {/* <Image
                source={rationPicture}
                style={styles.image}
                resizeMode='contain'
                /> */}
              <View style={styles.rationDetails}>
                <Text style={{fontWeight: 'bold'}}>{ration.title || 'titre'}</Text>
                <Text>{ration.comment}</Text>
                <Text>{ration.type}</Text>
                <Text>{ration.cmv}</Text>
                <Text>{ration.mode}</Text>
              </View>

              <Pressable
                style={styles.checkMark}
                onPress={() => {
                  handleMakeRationCurrent(ration)
                  // ration.current ? updateRationToNotCurrent() : updateRationToCurrent()
                }}
              >
                <Feather name={ration.current ? "check-circle" : "circle"} size={24} color={ration.current ? colors.buttonBackground : indent} />
              </Pressable>
            </View>
          </Pressable>
        </Link>
      {/* </View> */}
    </>
  )
};
