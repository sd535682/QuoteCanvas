import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/AppScreens/HomeScreen';
import CreateScreen from '../screens/AppScreens/CreateScreen';
import ProfileScreen from '../screens/AppScreens/ProfileScreen';

export type AppTabParamsList = {
  Home: undefined;
  Profile: undefined;
  Create: undefined;
};

const Tab = createBottomTabNavigator<AppTabParamsList>();

export default function AppNavigation() {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}} initialRouteName="Home">
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Create" component={CreateScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
