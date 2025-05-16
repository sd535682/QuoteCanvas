import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/AppScreens/HomeScreen';
import CreateScreen from '../screens/AppScreens/CreateScreen';
import AppStackNavigation from './AppStackNavigation';
import FloatingTabbar from '../components/navigationcomponents/FloatingTabbar';
import Lucide from '@react-native-vector-icons/lucide';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';

export type AppTabParamsList = {
  Home: undefined;
  Create: undefined;
  ProfileStack: undefined;
};

const Tab = createBottomTabNavigator();

const HomeIcon = ({focused}: {focused: boolean}) => (
  <Lucide name="rss" size={24} color={focused ? '#000' : '#777'} />
);

const CreateIcon = ({focused}: {focused: boolean}) => (
  <Lucide name="quote" size={24} color={focused ? '#000' : '#777'} />
);

const ProfileIcon = ({focused}: {focused: boolean}) => (
  <Lucide name="user" size={24} color={focused ? '#000' : '#777'} />
);

const renderFloatingTabBar = (props: BottomTabBarProps) => (
  <FloatingTabbar {...props} />
);

export default function AppNavigation() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}
      tabBar={renderFloatingTabBar}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: HomeIcon,
        }}
      />
      <Tab.Screen
        name="Create"
        component={CreateScreen}
        options={{
          tabBarLabel: 'Create',
          tabBarIcon: CreateIcon,
        }}
      />
      <Tab.Screen
        name="ProfileStack"
        component={AppStackNavigation}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ProfileIcon,
        }}
      />
    </Tab.Navigator>
  );
}
