import {View, StyleSheet, FlatList, Text} from 'react-native';
import {Colors} from '../../constants/Colors';
import {useEffect} from 'react';
import {getFeed, Quote} from '../../services/feedAPI';
import {useState} from 'react';
import QuotesCard from '../../components/appcomponents/QuotesCard';
import Lucide from '@react-native-vector-icons/lucide';

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
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Quotes</Text>
        <Lucide name="quote" size={24} color={Colors.white} />
      </View>
      <FlatList
        data={quotes}
        renderItem={({item}) => <QuotesCard quote={item} />}
        keyExtractor={item => item._id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.flatList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: '19%',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    gap: 5,
  },
  flatList: {
    paddingHorizontal: 10,
    paddingBottom: 10,
    gap: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
    textAlign: 'center',
  },
});
