import {Colors} from '../../constants/Colors';
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useState} from 'react';
import {createQuote} from '../../services/quoteAPI';

export default function CreateScreen() {
  const [writeQuote, setWriteQuote] = useState({
    quote: '',
    author: '',
    category: '',
  });

  const handleSubmit = async () => {
    if (!writeQuote.quote || !writeQuote.author || !writeQuote.category) {
      Alert.alert('Please fill all fields');
      return;
    }
    try {
      const result = await createQuote(writeQuote);
      if (!result || result.error) {
        throw new Error();
      }
      Alert.alert('Quote created successfully');
      setWriteQuote({quote: '', author: '', category: ''});
    } catch (error) {
      Alert.alert('Error creating quote');
      console.error('Create quote error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>CreateScreen</Text>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Quote"
          value={writeQuote.quote}
          onChangeText={text => setWriteQuote({...writeQuote, quote: text})}
          style={styles.input}
        />
        <TextInput
          placeholder="Author"
          value={writeQuote.author}
          onChangeText={text => setWriteQuote({...writeQuote, author: text})}
          style={styles.input}
        />
        <TextInput
          placeholder="Category"
          value={writeQuote.category}
          onChangeText={text => setWriteQuote({...writeQuote, category: text})}
          style={styles.input}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Create</Text>
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
  inputContainer: {
    width: '100%',
    gap: 10,
    flexDirection: 'column',
    marginVertical: 10,
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
  input: {
    borderWidth: 1,
    borderColor: Colors.lightGray,
    borderRadius: 16,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 10,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    color: 'white',
  },
});
