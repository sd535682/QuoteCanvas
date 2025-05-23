import {useColors} from '../../theme/useColors';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useState} from 'react';
import {createQuote} from '../../services/quoteAPI';
import Lucide from '@react-native-vector-icons/lucide';
import CreateCardForm from '../../components/appcomponents/CreateCardForm';
import {showToast} from '../../components/ToastMessage';

export default function CreateScreen() {
  const [writeQuote, setWriteQuote] = useState({
    quote: '',
    author: '',
    category: '',
  });
  const Colors = useColors();
  const styles = getStyles(Colors);

  const handleSubmit = async () => {
    if (!writeQuote.quote || !writeQuote.author || !writeQuote.category) {
      showToast('error', 'Error', 'Please fill all fields');
      return;
    }
    try {
      const result = await createQuote(writeQuote);
      if (!result || result.error) {
        throw new Error();
      }
      showToast('success', 'Success', 'Quote created successfully');
      setWriteQuote({quote: '', author: '', category: ''});
    } catch (error) {
      showToast('error', 'Error', 'Error creating quote');
      console.error('Create quote error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Create</Text>
        <Lucide name="quote" size={24} color={Colors.text} />
      </View>
      <View style={styles.inputContainer}>
        <CreateCardForm
          placeholder="Write your Quote here..."
          value={writeQuote.quote}
          onChangeText={text => setWriteQuote({...writeQuote, quote: text})}
          placeholderTextColor={Colors.textGray}
          height={150}
        />
        <CreateCardForm
          placeholder="Write the Author name"
          value={writeQuote.author}
          onChangeText={text => setWriteQuote({...writeQuote, author: text})}
          placeholderTextColor={Colors.textGray}
        />
        <CreateCardForm
          placeholder="Mention the Category"
          value={writeQuote.category}
          onChangeText={text => setWriteQuote({...writeQuote, category: text})}
          placeholderTextColor={Colors.textGray}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Create</Text>
      </TouchableOpacity>
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
    inputContainer: {
      paddingHorizontal: 10,
      paddingBottom: 10,
      gap: 10,
    },
    button: {
      backgroundColor: Colors.button,
      padding: 10,
      borderRadius: 10,
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
      borderRadius: 8,
      paddingVertical: 10,
      paddingHorizontal: 15,
      marginBottom: 10,
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
      color: Colors.black,
      backgroundColor: Colors.white,
    },
  });
