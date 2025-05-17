import {SafeAreaView} from 'react-native-safe-area-context';
import {StatusBar, StyleSheet} from 'react-native';
import AuthNavigation from './AuthNavigation';
import {NavigationContainer} from '@react-navigation/native';
import {useContext} from 'react';
import {AuthContext} from '../context/AuthContext';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AppNavigation from './AppNavigation';
import BootSplash from 'react-native-bootsplash';

export type RootStackParamsList = {
  AuthNavigation: undefined;
  AppNavigation: undefined;
};

const Stack = createNativeStackNavigator();

export default function RootNavigation() {
  const {user, loading} = useContext(AuthContext);

  if (loading) {
    return;
  }

  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer onReady={() => BootSplash.hide()}>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          {user ? (
            <Stack.Screen name="AppNavigation" component={AppNavigation} />
          ) : (
            <Stack.Screen name="AuthNavigation" component={AuthNavigation} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar backgroundColor="transparent" barStyle={'light-content'} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
