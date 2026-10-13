import { useState, useEffect, useCallback, useMemo } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  SectionList,
  FlatList,
  ActivityIndicator,
  Alert,
  RefreshControl,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Tour } from '../types/Tour';
import { groupByCity, formatDate } from '../utils/tours';
import TourItem from '../components/TourItem';

const API_URL = 'https://68d48681214be68f8c697631.mockapi.io/tours';

export default function App() {
  const [tours, setTours] = useState<Tour[]>([]);
  const [searchText, setSearchText] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const fetchToursData = useCallback(async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    else setLoading(true);

    try {
      const response = await fetch(API_URL);
      if (response.ok) {
        const data = await response.json();
        setTours(data);
      } else {
        Alert.alert('Lỗi', 'Không thể đồng bộ dữ liệu từ MockAPI.');
      }
    } catch {
      Alert.alert('Mất kết nối', 'Vui lòng kiểm tra lại đường truyền internet của thiết bị.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchToursData();
  }, [fetchToursData]);

  const onRefresh = useCallback(() => {
    fetchToursData(true);
  }, [fetchToursData]);

  const handleToggleFavorite = useCallback(async (id: string, next: boolean) => {
    let backupState: Tour[] = [];

    setTours((prevTours) => {
      backupState = prevTours;
      return prevTours.map((t) => (t.id === id ? { ...t, isFavorite: next } : t));
    });

    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isFavorite: next }),
      });

      if (!res.ok) {
        throw new Error('Lỗi phản hồi từ máy chủ');
      }
    } catch {
      setTours(backupState);
      Alert.alert('Thất bại', 'Đồng bộ mục yêu thích lên MockAPI thất bại. Vui lòng thử lại!');
    }
  }, []);

  const handleTourPress = useCallback((tour: Tour) => {
    Alert.alert(
      'Chi Tiết Tour',
      `Tên: ${tour.name}\nKhởi hành: ${formatDate(tour.departure)}\nThời gian: ${tour.day} ngày\nGiá: ${tour.price.toLocaleString('vi-VN')} ₫`,
      [{ text: 'Đóng', style: 'cancel' }]
    );
  }, []);

  const filteredTours = useMemo(() => {
    const cleanedKeyword = searchText.trim().toLowerCase();
    if (!cleanedKeyword) return tours;
    return tours.filter((t) => t.name.toLowerCase().includes(cleanedKeyword));
  }, [tours, searchText]);

  const sectionsData = useMemo(() => groupByCity(filteredTours), [filteredTours]);

  const favoriteTours = useMemo(() => tours.filter((t) => t.isFavorite), [tours]);

  const renderListHeader = useCallback(() => (
    <View style={styles.favoriteSection}>
      <Text style={styles.favoriteTitle}>
        Tour yêu thích ({favoriteTours.length})
      </Text>
      {favoriteTours.length === 0 ? (
        <View style={styles.emptyFavBox}>
          <Text style={styles.emptyFavText}>Chưa có tour yêu thích</Text>
        </View>
      ) : (
        <FlatList
          horizontal
          data={favoriteTours}
          keyExtractor={(item) => `fav-api-${item.id}`}
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={{ width: 12 }} />}
          renderItem={({ item }) => (
            <TourItem
              tour={item}
              compact
              onPress={handleTourPress}
              onToggleFavorite={handleToggleFavorite}
            />
          )}
          contentContainerStyle={styles.favListContent}
        />
      )}
    </View>
  ), [favoriteTours, handleTourPress, handleToggleFavorite]);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Tour Việt</Text>
          <Text style={styles.studentInfo}>Nguyễn Gia Hào - MSSV: 22716071</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Tìm tour theo tên..."
            placeholderTextColor="#888"
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>

        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#007bff" />
            <Text style={styles.loadingText}>Đang nạp dữ liệu từ MockAPI...</Text>
          </View>
        ) : (
          <SectionList
            sections={sectionsData}
            keyExtractor={(item) => item.id}
            stickySectionHeadersEnabled
            ListHeaderComponent={renderListHeader}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#007bff']} />
            }
            renderItem={({ item }) => (
              <TourItem
                tour={item}
                compact={false}
                onPress={handleTourPress}
                onToggleFavorite={handleToggleFavorite}
              />
            )}
            renderSectionHeader={({ section: { title, data } }) => (
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionHeaderTitle}>
                  {title} · {data.length} tour
                </Text>
              </View>
            )}
            ListEmptyComponent={
              <Text style={styles.emptyText}>Không tìm thấy tour phù hợp</Text>
            }
            contentContainerStyle={styles.listContainer}
          />
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f9fa',
  },
  header: {
    padding: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e9eb',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  studentInfo: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
    marginBottom: 12,
    fontStyle: 'italic',
  },
  searchInput: {
    height: 44,
    backgroundColor: '#f0f2f5',
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    color: '#333',
  },
  favoriteSection: {
    backgroundColor: '#ffffff',
    paddingVertical: 14,
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e9eb',
  },
  favoriteTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginHorizontal: 16,
    marginBottom: 10,
  },
  favListContent: {
    paddingHorizontal: 16,
  },
  emptyFavBox: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  emptyFavText: {
    color: '#999',
    fontStyle: 'italic',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    color: '#666',
  },
  listContainer: {
    paddingBottom: 30,
  },
  sectionHeader: {
    backgroundColor: '#007bff',
    paddingVertical: 6,
    paddingHorizontal: 16,
  },
  sectionHeaderTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 40,
    color: '#999',
    fontSize: 15,
  },
});

