import {View, Text, StyleSheet} from 'react-native';
import {Colors} from '../../constants/Colors';
import {useEffect} from 'react';
import {getFeed, Quote} from '../../services/feedAPI';
import {useState} from 'react';

export default function HomeScreen() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  useEffect(() => {
    getFeed()
      .then(data => {
        setQuotes(data?.data || []);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <View style={styles.container}>
      {quotes.map((quote, index) => (
        <View key={index} style={styles.quoteContainer}>
          <Text style={styles.category}>{quote.category}</Text>
          <Text style={styles.title}>{quote.quote}</Text>
          <Text style={styles.author}>~{quote.author}</Text>
        </View>
      ))}
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
  quoteContainer: {
    width: '100%',
    alignItems: 'center',
    gap: 5,
    flexDirection: 'column',
    marginVertical: 10,
  },
  category: {
    fontSize: 12,
    color: 'white',
    textAlign: 'center',
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  author: {
    fontSize: 12,
    color: 'white',
    textAlign: 'center',
  },
});
