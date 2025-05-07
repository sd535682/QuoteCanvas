import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Colors} from '../../constants/Colors';
import Lucide from '@react-native-vector-icons/lucide';
import FormInput from '../../components/authcomponents/FormInput';

export default function Register({navigation}: {navigation: any}) {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate('GetStarted')}>
          <Lucide name="arrow-left" size={24} color={Colors.white} />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Go ahead and</Text>
          <Text style={styles.title}>Register an account</Text>
        </View>
        <Text style={styles.subtitle}>
          Sign up to enjoy the best Quotes Reading Experience
        </Text>
      </View>
      <View style={styles.inputContainer}>
        <FormInput
          inputLabel="Full Name"
          leftInputIcon="user"
          iconColor={Colors.button}
        />
        <FormInput
          inputLabel="Email Address"
          leftInputIcon="mail"
          iconColor={Colors.button}
        />
        <FormInput
          inputLabel="Password"
          leftInputIcon="lock-keyhole"
          iconColor={Colors.button}
          rightInputIcon="eye"
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('GetStarted')}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
        <View style={styles.signUpContainer}>
          <Text>Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.signUpText}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
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
  titleContainer: {
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: Colors.text,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 10,
    color: Colors.textGray,
  },
  inputContainer: {
    flex: 1,
    backgroundColor: Colors.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 32,
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 10,
  },
  button: {
    backgroundColor: Colors.button,
    padding: 16,
    borderRadius: 50,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: Colors.white,
    fontWeight: 'bold',
    fontSize: 20,
  },
  signUpContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginTop: 10,
    width: '100%',
    justifyContent: 'center',
  },
  signUpText: {
    color: Colors.button,
    fontWeight: 'bold',
  },
});
