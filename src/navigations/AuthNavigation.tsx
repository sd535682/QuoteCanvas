import {createNativeStackNavigator} from '@react-navigation/native-stack';
import GetStarted from '../screens/AuthScreens/GetStarted';

export default function AuthNavigation() {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="GetStarted" component={GetStarted} />
    </Stack.Navigator>
  );
}
