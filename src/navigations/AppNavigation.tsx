import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/AppScreens/HomeScreen';
import CreateScreen from '../screens/AppScreens/CreateScreen';
import ProfileScreen from '../screens/AppScreens/ProfileScreen';
import FloatingTabbar from '../components/navigationcomponents/FloatingTabbar';
import Lucide from '@react-native-vector-icons/lucide';

export type AppTabParamsList = {
  Home: undefined;
  Create: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator();

export default function AppNavigation() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}
      tabBar={props => <FloatingTabbar {...props} />}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({focused}) => (
            <Lucide name="rss" size={24} color={focused ? '#000' : '#777'} />
          ),
        }}
      />
      <Tab.Screen
        name="Create"
        component={CreateScreen}
        options={{
          tabBarLabel: 'Create',
          tabBarIcon: ({focused}) => (
            <Lucide name="quote" size={24} color={focused ? '#000' : '#777'} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({focused}) => (
            <Lucide name="user" size={24} color={focused ? '#000' : '#777'} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
