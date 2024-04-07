import { FetchedWeightData, Weight } from '@/types';
import { Chart, Line, Area, HorizontalAxis, VerticalAxis } from 'react-native-responsive-linechart'
import { View, Text, Image, StyleSheet } from 'react-native'
import index from '@/app';

interface ChartComponentProps {
  weightData: FetchedWeightData[] | undefined | null
  idealWeight: number
}

const transformData = (weightData : FetchedWeightData[]) => {
  return weightData.map((item, index) => ({
    x: index + 1, // Use timestamp as x value
    y: item.weight
  }));
};

const createIdealWeightData = (data: any[], idealWeight: number) => {
  return data.map(item => ({
    x: item.x,
    y: idealWeight
  }));
};

const ChartComponent = ({weightData, idealWeight} : ChartComponentProps) => {
  console.log("weights from chart component", weightData);

  if (!weightData || weightData.length === 0) {
    return (
      <View style={styles.container}>
        <Text>Aucun poids enregistré</Text>
      </View>
    );
  }
  const data = transformData(weightData);
  console.log("trasnformed data", data);

  console.log('idealWeight', idealWeight);
  const idealWeightData = createIdealWeightData(data, idealWeight)
console.log('idealWeightData', idealWeightData);

const dateLabels = weightData.map(item => item.measurement_date); // Array of date strings
// console.log('dateLabels', dateLabels)
const xValues = data.map(d => d.x);
const yValues = data.map(d => d.y);

// console.log("xValues", xValues)
// console.log("yValues", yValues)

if (xValues.length === 0 || yValues.length === 0) {
  return (
    <View style={styles.container}>
      <Text>Invalid Data for Chart</Text>
    </View>
  );
}

// const staticData = [{x: 1, y: 5}, {x: 2, y: 26}];

// console.log('min de x values', Math.min(...xValues))
// console.log('max de x values', Math.max(...xValues) )
// console.log('max de y value', Math.max(...weightData.map((item) => item.weight)))
// console.log('xValues.length', xValues.length);

const tickValues = [];
for (let i = 0; i <= Math.max(...yValues); i += 1) {
  tickValues.push(i);
}

  return (
    // <Text>HELLO</Text>
    <View style={styles.container}>
      <Chart
        style={{ height: 200, width: '100%' }}
        padding={{ left: 40, bottom: 20, right: 20, top: 20 }}
        xDomain={{ min: 1, max: Math.max(...xValues)}}
        yDomain={{ min: Math.min(...yValues, idealWeight), max: Math.max(...yValues, idealWeight) }}
      >
        <VerticalAxis
          tickValues={tickValues}
        />
        <HorizontalAxis
          tickValues={xValues}
          theme={{ labels: { formatter: (value) => {
            const index = Math.round(value) - 1; // Ensure the index is a whole number
            return dateLabels[index] ? dateLabels[index] : '';
          }
        } }}/>
        {/* <Area theme={{ gradient: { from: { color: '#44bd32' }, to: { color: '#44bd32', opacity: 0.2 } }}} /> */}
        <Line data={data} theme={{ stroke: { color: 'blue', width: 2 } }} />
        <Line data={idealWeightData} theme={{ stroke: { color: 'red', width: 2 } }} />
      </Chart>
    </View>
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
