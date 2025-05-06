import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';

export default function GetStarted() {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/getstarted.png')}
        style={styles.image}
      />
      <Text style={styles.title}>Craft Quotes, Keep Memories</Text>
      <Text style={styles.text}>
        From books to your personal gallery. Scan pages, design with elegance,
        and store your favorite literary moments forever.
      </Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#121315',
    padding: 20,
    paddingBottom: 50,
  },
  image: {
    width: '100%',
    height: '50%',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#6e947b',
    padding: 16,
    borderRadius: 50,
    width: '100%',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#fff',
  },
  text: {
    fontSize: 16,
    marginBottom: 20,
    color: '#9ca3af',
    textAlign: 'center',
    fontWeight: '500',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
  },
});
