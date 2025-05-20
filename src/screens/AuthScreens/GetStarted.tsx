import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {useColors} from '../../theme/useColors';
import ThemeToggle from '../../components/ThemeButton';
import LottieView from 'lottie-react-native';

export default function GetStarted({navigation}: {navigation: any}) {
  const Colors = useColors();
  const styles = getStyles(Colors);

  return (
    <View style={styles.container}>
      <ThemeToggle />
      <LottieView
        source={require('../../assets/getstarted.json')}
        style={styles.lottie}
        autoPlay
        loop
      />
      <View style={styles.textContainer}>
        <Text style={styles.title}>Quote Canvas</Text>
        <Text style={styles.text}>Craft Quotes, Keep Memories</Text>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Login')}>
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
}

const getStyles = (Colors: ReturnType<typeof useColors>) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: Colors.background,
      padding: 20,
      paddingBottom: 50,
    },
    textContainer: {
      width: '100%',
      alignItems: 'center',
    },
    lottie: {
      width: '50%',
      height: '50%',
    },
    button: {
      backgroundColor: Colors.button,
      padding: 16,
      borderRadius: 50,
      width: '100%',
      alignItems: 'center',
    },
    title: {
      fontSize: 32,
      fontWeight: 'bold',
      marginBottom: 10,
      color: Colors.cardText,
    },
    text: {
      fontSize: 16,
      marginBottom: 20,
      color: Colors.textGray,
      textAlign: 'center',
      fontWeight: '500',
    },
    buttonText: {
      color: Colors.white,
      fontWeight: 'bold',
      fontSize: 20,
    },
  });
