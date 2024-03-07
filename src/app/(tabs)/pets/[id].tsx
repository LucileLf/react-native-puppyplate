import { Stack, useLocalSearchParams } from 'expo-router';
import { View, Text } from 'react-native'

const PetDetailsScreen = () => {
  const {id} = useLocalSearchParams();
  return (
    <View>
      <Stack.Screen options={{ title: 'Details: ' + id}} />
      <Text>ProductDetailsScreen for id: {id}</Text>
    </View>
  )
}

export default PetDetailsScreen;
