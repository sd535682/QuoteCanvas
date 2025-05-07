import {SafeAreaView} from 'react-native-safe-area-context';
import {StatusBar, StyleSheet} from 'react-native';
import AuthNavigation from './AuthNavigation';
import {NavigationContainer} from '@react-navigation/native';
import {useContext} from 'react';
import {AuthContext} from '../context/AuthContext';
// import SplashScreen from '../screens/AuthScreens/SplashScreen';
// import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AppNavigation from './AppNavigation';

// const Stack = createNativeStackNavigator();

export default function RootNavigation() {
  const {user, loading} = useContext(AuthContext);

  if (loading) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
        {/* <Stack.Navigator screenOptions={{headerShown: false}}> */}
        {user ? <AppNavigation /> : <AuthNavigation />}
        {/* </Stack.Navigator> */}
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
