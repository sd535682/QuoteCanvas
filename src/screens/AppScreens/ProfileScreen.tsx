import {useColors} from '../../theme/useColors';
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useContext, useState} from 'react';
import {AuthContext} from '../../context/AuthContext';
import Lucide from '@react-native-vector-icons/lucide';
import ThemeButton from '../../components/ThemeButton';
import LogoutConfirmation from '../../components/appcomponents/LogoutConfirmation';

export default function ProfileScreen({navigation}: {navigation: any}) {
  const {logout} = useContext(AuthContext);
  const {user} = useContext(AuthContext);
  const Colors = useColors();
  const styles = getStyles(Colors);
  const [isVisible, setIsModalVisible] = useState<boolean>(false);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Profile</Text>
        <Lucide name="quote" size={24} color={Colors.text} />
      </View>
      <>
        <View style={styles.profileContainer}>
          <Text style={styles.userName}>Hello, {user?.name}</Text>
          <Text style={styles.subtitle}>E-mail : {user?.email}</Text>
        </View>
        <View style={styles.profileContainer}>
          <Pressable
            style={styles.flexRow}
            onPress={() => navigation.navigate('MyQuotes')}>
            <View style={styles.button}>
              <Lucide name="bookmark" size={24} color={Colors.black} />
              <Text style={styles.subtitle}>My Creations</Text>
            </View>
            <Lucide name="chevron-right" size={24} color={Colors.black} />
          </Pressable>
        </View>
        <View style={styles.profileContainer}>
          <ThemeButton />
        </View>
        <View style={styles.profileContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setIsModalVisible(true)}>
            <Lucide name="log-out" size={28} color={Colors.black} />
            <Text style={styles.subtitle}>Logout</Text>
          </TouchableOpacity>
        </View>
        <LogoutConfirmation
          visible={isVisible}
          onCancel={() => setIsModalVisible(false)}
          onConfirm={logout}
        />
      </>
    </View>
  );
}

const getStyles = (Colors: ReturnType<typeof useColors>) =>
  StyleSheet.create({
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
      gap: 10,
    },
    flexRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 5,
      justifyContent: 'space-between',
    },
    subtitle: {
      fontSize: 14,
      fontWeight: '500',
      color: Colors.black,
    },
  });
