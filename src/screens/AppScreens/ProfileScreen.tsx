import {Colors} from '../../constants/Colors';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useContext} from 'react';
import {AuthContext} from '../../context/AuthContext';
import Lucide from '@react-native-vector-icons/lucide';

export default function ProfileScreen({navigation}: {navigation: any}) {
  const {logout} = useContext(AuthContext);
  const {user} = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate('Home')}>
          <Lucide name="arrow-left" size={24} color={Colors.white} />
        </TouchableOpacity>
      </View>
      <Text style={styles.text}>Hello, {user?.name}</Text>
      <View style={styles.text}>
        <Lucide name="mail" size={24} color={Colors.textGray} />
        <Text style={styles.subtitle}>{user?.email}</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={logout}>
        <Lucide name="log-out" size={28} color={Colors.textGray} />
        <Text style={styles.subtitle}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 20,
  },
  headerContainer: {
    padding: 20,
  },
  backButton: {
    borderColor: Colors.borderGray,
    borderWidth: 1,
    borderRadius: 20,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.textGray,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginTop: '30%',
  },
});
