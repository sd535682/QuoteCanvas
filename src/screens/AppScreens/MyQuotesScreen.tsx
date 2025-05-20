import {
  View,
  StyleSheet,
  Text,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {useColors} from '../../theme/useColors';
import {useEffect} from 'react';
import {useState} from 'react';
import QuotesCard from '../../components/appcomponents/QuotesCard';
import Lucide from '@react-native-vector-icons/lucide';
import {LegendList} from '@legendapp/list';
import {getMyQuotes} from '../../services/myQuotesAPI';
import {Quote} from '../../services/feedAPI';

export default function MyQuotesScreen({navigation}: {navigation: any}) {
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
      const data = await getMyQuotes();
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
      const data = await getMyQuotes();
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
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <Lucide name="arrow-left" size={24} color={Colors.white} />
        </TouchableOpacity>
        <View style={styles.flexRow}>
          <Text style={styles.title}>My Quotes</Text>
          <Lucide name="quote" size={24} color={Colors.white} />
        </View>
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
              <ActivityIndicator size="large" color={Colors.primary} />
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
      justifyContent: 'space-between',
      paddingVertical: 20,
      gap: 5,
      width: '72%',
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
    flexRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 5,
    },
  });
