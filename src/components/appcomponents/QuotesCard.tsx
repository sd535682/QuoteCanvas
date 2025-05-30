import {StyleSheet, Text, View} from 'react-native';
import {useColors} from '../../theme/useColors';
import {Quote} from '../../services/feedAPI';

export default function QuotesCard({quote}: {quote: Quote}) {
  const Colors = useColors();
  const styles = getStyles(Colors);
  return (
    <View style={styles.container}>
      {quote.user?.name && (
        <View style={styles.userContainer}>
          <Text style={styles.userName}>{quote.user?.name}</Text>
        </View>
      )}
      <Text style={styles.categoryText}>{quote.category}</Text>
      <Text style={styles.quoteText}>{quote.quote}</Text>
      <Text style={styles.authorText}>{quote.author}</Text>
    </View>
  );
}

const getStyles = (Colors: ReturnType<typeof useColors>) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: 20,
      paddingVertical: 10,
      backgroundColor: Colors.cardBackground,
      borderRadius: 10,
      gap: 5,
    },
    quoteText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: Colors.cardText,
    },
    authorText: {
      fontSize: 12,
      color: Colors.cardText,
      textAlign: 'right',
      fontStyle: 'italic',
    },
    categoryText: {
      fontSize: 12,
      color: Colors.textGray,
    },
    userContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 10,
    },
    userName: {
      fontSize: 12,
      color: Colors.black,
      fontWeight: 'bold',
    },
  });
