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
import {showToast} from '../../components/ToastMessage';

export default function MyQuotesScreen({navigation}: {navigation: any}) {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const Colors = useColors();
  const styles = getStyles(Colors);

  useEffect(() => {
    loadQuotes();
  }, []);

  const onRefresh = () => {
    loadQuotes(true);
  };

  const loadQuotes = async (isRefresh = false) => {
    if (isRefresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }

    try {
      const [data] = await Promise.all([
        getMyQuotes(),
        new Promise(resolve => setTimeout(resolve, 1500)),
      ]);

      if (data && data.success && Array.isArray(data.data)) {
        setQuotes(data.data);
        showToast('success', 'Success', 'Quotes fetched successfully');
      } else {
        throw new Error('Invalid data received');
      }
    } catch (error) {
      console.error(error);
      showToast('error', 'Error', 'Error fetching quotes');
    } finally {
      if (isRefresh) {
        setRefreshing(false);
      } else {
        setLoading(false);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <Lucide name="arrow-left" size={24} color={Colors.text} />
        </TouchableOpacity>
        <View style={styles.flexRow}>
          <Text style={styles.title}>My Quotes</Text>
          <Lucide name="quote" size={24} color={Colors.text} />
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
