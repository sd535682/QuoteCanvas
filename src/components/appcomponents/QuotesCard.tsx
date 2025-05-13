import {StyleSheet, Text, View} from 'react-native';
import {Colors} from '../../constants/Colors';
import {Quote} from '../../services/feedAPI';

export default function QuotesCard({quote}: {quote: Quote}) {
  return (
    <View style={styles.container}>
      <Text style={styles.categoryText}>{quote.category}</Text>
      <Text style={styles.quoteText}>{quote.quote}</Text>
      <Text style={styles.authorText}>{quote.author}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: Colors.white,
    borderRadius: 10,
    gap: 5,
  },
  quoteText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  authorText: {
    fontSize: 12,
    color: Colors.black,
    textAlign: 'right',
  },
  categoryText: {
    fontSize: 12,
    color: Colors.textGray,
  },
});
