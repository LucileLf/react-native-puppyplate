import { Pet, Weight, FetchedWeightData, NutritionalNeeds } from '@/types';
import { Chart, Line, Area, HorizontalAxis, VerticalAxis } from 'react-native-responsive-linechart'
import { View, Text, Image, StyleSheet } from 'react-native'

interface NutritionTableProps {
  nutritionalNeeds: NutritionalNeeds
}

const NutritionTable = ({nutritionalNeeds} : NutritionTableProps) => {




  console.log('nutritionalNeeds', nutritionalNeeds)

  return (
    <View style={styles.nutritionTable}>
      <View style={styles.row}>
        <Text style={styles.cell}>Calories</Text>
        <Text style={styles.cell}>RPC</Text>
        <Text style={styles.cell}>Calcium</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.cell}>{nutritionalNeeds.calories}</Text>
        <Text style={styles.cell}>{nutritionalNeeds.rpc}</Text>
        <Text style={styles.cell}>{nutritionalNeeds.calcium}</Text>
      </View>
    </View>
  );
  };

  const styles = StyleSheet.create({
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
})

export default NutritionTable;
