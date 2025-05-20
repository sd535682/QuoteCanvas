import {View, StyleSheet, Text, ActivityIndicator} from 'react-native';
import {useColors} from '../../theme/useColors';
import {useEffect} from 'react';
import {getFeed, Quote} from '../../services/feedAPI';
import {useState} from 'react';
import QuotesCard from '../../components/appcomponents/QuotesCard';
import Lucide from '@react-native-vector-icons/lucide';
import {LegendList} from '@legendapp/list';

export default function HomeScreen() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const Colors = useColors();
  const styles = getStyles(Colors);

  useEffect(() => {
    fetchQuotes();
  }, []);

  const fetchQuotes = async () => {
    try {
      const [data] = await Promise.all([
        getFeed(),
        new Promise(resolve => setTimeout(resolve, 1500)),
      ]);
      setQuotes(data?.data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      const [data] = await Promise.all([
        getFeed(),
        new Promise(resolve => setTimeout(resolve, 1500)),
      ]);
      setQuotes(data?.data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Quotes</Text>
        <Lucide name="quote" size={24} color={Colors.white} />
      </View>
      <LegendList
        data={quotes}
        renderItem={({item}) => <QuotesCard quote={item} />}
        keyExtractor={item => item._id}
        contentContainerStyle={styles.flatList}
        recycleItems={true}
        estimatedItemSize={200}
        showsVerticalScrollIndicator={false}
        onRefresh={onRefresh}
        refreshing={refreshing}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            {loading ? (
              <ActivityIndicator size="large" color={Colors.white} />
            ) : (
              <Text style={styles.emptyText}>No quotes found 🥺</Text>
            )}
          </View>
        }
      />
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
    emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: '100%',
    },
    emptyText: {
      fontSize: 16,
      color: Colors.textGray,
    },
  });
