import {SafeAreaView} from 'react-native-safe-area-context';
import {StatusBar, StyleSheet} from 'react-native';
import AuthNavigation from './AuthNavigation';
import {NavigationContainer} from '@react-navigation/native';

export default function RootNavigation() {
  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
        <AuthNavigation />
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
