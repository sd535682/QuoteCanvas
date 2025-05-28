import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useColors} from '../../theme/useColors';
import Lucide from '@react-native-vector-icons/lucide';
import FormInput from '../../components/authcomponents/FormInput';
import {useContext, useState} from 'react';
import {AuthContext} from '../../context/AuthContext';
import KeyboardAwareWrapper from '../../components/authcomponents/KeyboardAwareWrapper';
import {debugError} from '../../../config/config';

export default function Register({navigation}: {navigation: any}) {
  const Colors = useColors();
  const styles = getStyles(Colors);
  const {register} = useContext(AuthContext);
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleRegister = async () => {
    try {
      await register(form.name, form.email, form.password);
    } catch (error) {
      debugError('Error registering', error);
    }
  };

  return (
    <KeyboardAwareWrapper>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.navigate('GetStarted')}>
            <Lucide name="arrow-left" size={24} color={Colors.text} />
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
            value={form.name}
            onChangeText={text => setForm({...form, name: text})}
          />
          <FormInput
            inputLabel="Email Address"
            leftInputIcon="mail"
            iconColor={Colors.button}
            value={form.email}
            onChangeText={text => setForm({...form, email: text})}
          />
          <FormInput
            inputLabel="Password"
            leftInputIcon="lock-keyhole"
            iconColor={Colors.button}
            rightInputIcon="eye"
            value={form.password}
            onChangeText={text => setForm({...form, password: text})}
          />
          <TouchableOpacity style={styles.button} onPress={handleRegister}>
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
          <View style={styles.signUpContainer}>
            <Text style={styles.accountText}>Already have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.signUpText}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAwareWrapper>
  );
}

const getStyles = (Colors: ReturnType<typeof useColors>) =>
  StyleSheet.create({
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
    accountText: {
      color: Colors.black,
      fontWeight: '500',
    },
  });
