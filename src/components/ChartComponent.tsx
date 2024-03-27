import { Pet, Weight } from '@/types';
import { pets, weights } from '@assets/data/pets'
import { Chart, Line, Area, HorizontalAxis, VerticalAxis } from 'react-native-responsive-linechart'
import { View, Text, Image, StyleSheet } from 'react-native'


const transformData = (weightData: Weight[]) => {
  return weightData.map((item) => ({
    x: item.measurement_date.getTime(), // Use timestamp as x value
    y: item.weight
  }));
};

const ChartComponent = ({ weightData }: { weightData: Weight[] | undefined }) => {
  if (!weightData) {
    return (
      <View style={styles.container}>
        <Text>No weight data available</Text>
      </View>
    );
  }
  const data = transformData(weightData);

  return (
    // <View style={styles.container}>
      <Chart
        style={{ height: 200, width: 400 }}
        data={data}
        padding={{ left: 40, bottom: 20, right: 20, top: 20 }}
        xDomain={{ min: weightData[0].measurement_date.getTime(), max: weightData[weightData.length - 1].measurement_date.getTime() }}
        yDomain={{ min: 0, max: Math.max(...weightData.map((item) => item.weight)) }}
      >
        <VerticalAxis tickCount={5} />
        <HorizontalAxis tickCount={3} />
        <Area theme={{ gradient: { from: { color: '#44bd32' }, to: { color: '#44bd32', opacity: 0.2 } }}} />
        <Line theme={{ stroke: { color: '#44bd32', width: 2 } }} />
      </Chart>
    // </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ChartComponent;
