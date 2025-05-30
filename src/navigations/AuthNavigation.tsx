import {createNativeStackNavigator} from '@react-navigation/native-stack';
import GetStarted from '../screens/AuthScreens/GetStarted';
import Login from '../screens/AuthScreens/Login';
import Register from '../screens/AuthScreens/Register';

export type AuthStackParamsList = {
  GetStarted: undefined;
  Login: undefined;
  Register: undefined;
};

const Stack = createNativeStackNavigator<AuthStackParamsList>();

export default function AuthNavigation() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="GetStarted" component={GetStarted} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
  );
}
