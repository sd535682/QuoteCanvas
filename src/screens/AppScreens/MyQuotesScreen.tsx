/* eslint-disable react-hooks/exhaustive-deps */
import {
  View,
  StyleSheet,
  Text,
  ActivityIndicator,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import {useColors} from '../../theme/useColors';
import {useEffect, useRef, useState} from 'react';
import {deleteQuote, getMyQuotes} from '../../services/myQuotesAPI';
import QuotesCard from '../../components/appcomponents/QuotesCard';
import Lucide from '@react-native-vector-icons/lucide';
import {LegendList} from '@legendapp/list';
import QuoteModal from '../../components/appcomponents/QuoteModal';
import {showToast} from '../../components/ToastMessage';
import {Quote} from '../../services/feedAPI';
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import {CommonColors} from '../../constants/Colors';
import {debugError} from '../../../config/config';

export default function MyQuotesScreen({navigation}: {navigation: any}) {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null);
  const listRef = useRef<any>(null);
  const [showFab, setShowFab] = useState(false);

  const Colors = useColors();
  const styles = getStyles(Colors);

  const renderRightActions = (item: Quote) => (
    <TouchableOpacity
      onPress={() => handleDeleteQuote(item._id)}
      style={[styles.actionButton, styles.delete]}>
      <Lucide name="trash" size={24} color="white" />
    </TouchableOpacity>
  );

  const fetchQuotes = async (pageNum: number, isRefresh = false) => {
    try {
      const data = await getMyQuotes({page: pageNum, limit: 20});

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
      debugError('Fetch error:', error);
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

  const handleDeleteQuote = async (quoteId: string) => {
    try {
      const result = await deleteQuote(quoteId);
      if (result?.success) {
        setQuotes(prev => prev.filter(q => q._id !== quoteId));
        showToast('success', 'Deleted', 'Quote removed successfully');
      } else {
        showToast('error', 'Failed', 'Unable to delete quote');
      }
    } catch (error) {
      showToast('error', 'Error', 'Something went wrong while deleting');
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
        ref={listRef}
        onScroll={({nativeEvent}) => {
          const offsetY = nativeEvent.contentOffset.y;
          setShowFab(offsetY > 100);
        }}
        renderItem={({item}) => (
          <Swipeable
            renderRightActions={() => renderRightActions(item)}
            overshootRight={false}>
            <Pressable
              onLongPress={() => {
                setSelectedQuote(item);
                setModalVisible(true);
              }}
              delayLongPress={250}>
              <QuotesCard quote={item} />
            </Pressable>
          </Swipeable>
        )}
        keyExtractor={(item, index) => `${item._id} - ${index}`}
        contentContainerStyle={styles.flatList}
        recycleItems={true}
        estimatedItemSize={20}
        initialContainerPoolRatio={2}
        showsVerticalScrollIndicator={false}
        onRefresh={onRefresh}
        refreshing={refreshing}
        onEndReached={loadMore}
        onEndReachedThreshold={0.3}
        ListFooterComponent={
          loadingMore ? (
            <View style={styles.footerLoader}>
              <ActivityIndicator size="large" color={Colors.black} />
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
      {showFab && (
        <Pressable
          style={styles.fab}
          onPress={() => {
            listRef.current?.scrollToOffset({offset: 0, animated: true});
          }}>
          <Lucide name="chevron-up" size={20} color={Colors.white} />
        </Pressable>
      )}
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
    footerLoader: {
      padding: 20,
      alignItems: 'center',
      gap: 8,
    },
    fab: {
      position: 'absolute',
      bottom: '15%',
      right: 30,
      backgroundColor: Colors.button,
      borderRadius: 28,
      width: 40,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      elevation: 6,
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.3,
      shadowRadius: 4,
    },
    actionButton: {
      justifyContent: 'center',
      alignItems: 'center',
      width: 75,
      backgroundColor: 'red',
      borderRadius: 10,
      margin: 5,
    },
    delete: {
      backgroundColor: CommonColors.notificationErrorIcon,
    },
    actionText: {
      color: '#fff',
      fontWeight: 'bold',
    },
  });
