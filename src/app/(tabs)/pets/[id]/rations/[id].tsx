import { useLocalSearchParams } from 'expo-router';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native'
import { useRation } from '@/api/rations';
import { RationDetails } from '@/components/RationDetails';
import { colors } from 'react-native-elements';
import { useTheme } from '@react-navigation/native';


const RationDetailsScreen = () => {
  console.log('hello from ration show')
  const { id } = useLocalSearchParams();
  const {colors} = useTheme();
  const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      backgroundColor: colors.card,
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

  const {data: ration, isLoading: isRationLoading, error: rationError} = useRation(id)

  if (isRationLoading) {return <ActivityIndicator/>}

  if (!ration || rationError) {
    return (
      <View style={styles.container}>
        <Text>No recipe data available</Text>
      </View>
    );
  }

  return <RationDetails ration={ration}/>
};





export default RationDetailsScreen;
