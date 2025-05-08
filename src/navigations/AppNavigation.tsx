import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/AppScreens/HomeScreen';

export type AppStackParamsList = {
  Home: undefined;
};

export default function AppNavigation() {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
}
