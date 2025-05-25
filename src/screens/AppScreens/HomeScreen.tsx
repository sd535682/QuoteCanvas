/* eslint-disable react-hooks/exhaustive-deps */
import {
  View,
  StyleSheet,
  Text,
  ActivityIndicator,
  Pressable,
} from 'react-native';
import {useColors} from '../../theme/useColors';
import {useEffect, useState} from 'react';
import {getFeed, Quote} from '../../services/feedAPI';
import QuotesCard from '../../components/appcomponents/QuotesCard';
import Lucide from '@react-native-vector-icons/lucide';
import {LegendList} from '@legendapp/list';
import QuoteModal from '../../components/appcomponents/QuoteModal';
import {showToast} from '../../components/ToastMessage';

export default function HomeScreen() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null);

  const Colors = useColors();
  const styles = getStyles(Colors);

  const fetchQuotes = async (pageNum: number, isRefresh = false) => {
    try {
      const data = await getFeed({page: pageNum, limit: 20});

      if (data?.success) {
        if (isRefresh || pageNum === 1) {
          setQuotes(data.data);
        } else {
          setQuotes(prev => [...prev, ...data.data]);
        }
        setHasMore(data.pagination.hasNextPage);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Fetch error:', error);
      showToast('error', 'Error', 'Failed to load quotes');
      return false;
    }
  };

  const loadInitial = async () => {
    setLoading(true);
    await fetchQuotes(1);
    setLoading(false);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    setPage(1);
    const success = await fetchQuotes(1, true);
    if (success) {
      showToast('success', 'Success', 'Quotes refreshed');
    }
    setRefreshing(false);
  };

  const loadMore = async () => {
    if (!hasMore || loadingMore) {
      return;
    }

    setLoadingMore(true);
    const nextPage = page + 1;
    const success = await fetchQuotes(nextPage);
    if (success) {
      setPage(nextPage);
    }
    setLoadingMore(false);
  };

  useEffect(() => {
    loadInitial();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Quotes</Text>
        <Lucide name="quote" size={24} color={Colors.text} />
      </View>

      <LegendList
        data={quotes}
        renderItem={({item}) => (
          <Pressable
            onLongPress={() => {
              setSelectedQuote(item);
              setModalVisible(true);
            }}
            delayLongPress={250}>
            <QuotesCard quote={item} />
          </Pressable>
        )}
        keyExtractor={(item, index) => `${item._id} - ${index}`}
        contentContainerStyle={styles.flatList}
        recycleItems={true}
        estimatedItemSize={150}
        initialContainerPoolRatio={2}
        showsVerticalScrollIndicator={false}
        onRefresh={onRefresh}
        refreshing={refreshing}
        onEndReached={loadMore}
        onEndReachedThreshold={0.3}
        ListFooterComponent={
          loadingMore ? (
            <View style={styles.footerLoader}>
              <ActivityIndicator size="small" color={Colors.black} />
            </View>
          ) : null
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            {loading ? (
              <ActivityIndicator size="large" color={Colors.black} />
            ) : (
              <Text style={styles.emptyText}>No quotes found 🥺</Text>
            )}
          </View>
        }
      />

      <QuoteModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        quote={selectedQuote}
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
    footerLoader: {
      padding: 20,
      alignItems: 'center',
      gap: 8,
    },
  });
