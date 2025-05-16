import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ProfileScreen from '../screens/AppScreens/ProfileScreen';
import MyQuotesScreen from '../screens/AppScreens/MyQuotesScreen';

export type AppStackParamsList = {
  Profile: undefined;
  MyQuotes: undefined;
};

const Stack = createNativeStackNavigator<AppStackParamsList>();

export default function AppNavigation() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="MyQuotes" component={MyQuotesScreen} />
    </Stack.Navigator>
  );
}
