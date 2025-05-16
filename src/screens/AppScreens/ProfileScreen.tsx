import {Colors} from '../../constants/Colors';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useContext} from 'react';
import {AuthContext} from '../../context/AuthContext';
import Lucide from '@react-native-vector-icons/lucide';

export default function ProfileScreen() {
  const {logout} = useContext(AuthContext);
  const {user} = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Profile</Text>
        <Lucide name="quote" size={24} color={Colors.white} />
      </View>
      <>
        <View style={styles.profileContainer}>
          <Text style={styles.userName}>Hello, {user?.name}</Text>
          <Text style={styles.subtitle}>E-mail : {user?.email}</Text>
        </View>
        <View style={styles.profileContainer}>
          <TouchableOpacity style={styles.button} onPress={logout}>
            <Lucide name="log-out" size={28} color={Colors.black} />
            <Text style={styles.subtitle}>Logout</Text>
          </TouchableOpacity>
        </View>
      </>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: 20,
    paddingBottom: '19%',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    gap: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
    textAlign: 'center',
  },
  userName: {
    fontSize: 20,
    color: Colors.black,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  profileContainer: {
    backgroundColor: Colors.white,
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.black,
  },
});
