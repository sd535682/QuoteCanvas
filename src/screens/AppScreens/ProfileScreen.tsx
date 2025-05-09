import {Colors} from '../../constants/Colors';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useContext} from 'react';
import {AuthContext} from '../../context/AuthContext';

export default function ProfileScreen() {
  const {logout} = useContext(AuthContext);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>ProfileScreen</Text>
      <TouchableOpacity style={styles.button} onPress={logout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
    textAlign: 'center',
    marginTop: 20,
  },
  button: {
    backgroundColor: Colors.button,
    padding: 16,
    borderRadius: 50,
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: Colors.white,
    fontWeight: 'bold',
    fontSize: 20,
  },
});
