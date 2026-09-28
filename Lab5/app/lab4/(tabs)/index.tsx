import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { SAMPLE_PRODUCTS, SampleProduct } from '../../../constants/sampleProducts';
import { useFavorites } from '../../../context/FavoriteContext';

export default function Lab4ProductsTab() {
  const router = useRouter();
  const { isFavorite, toggleFavorite } = useFavorites();

  const handleProductPress = (product: SampleProduct) => {
    // Truyền dữ liệu sang màn hình ProductDetails bằng param id
    router.push({
      pathname: '/lab4/details/[id]',
      params: { id: product.id },
    });
  };

  const renderItem = ({ item }: { item: SampleProduct }) => {
    const favorited = isFavorite(item.id);
    return (
      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.85}
        onPress={() => handleProductPress(item)}
      >
        <Image source={{ uri: item.image }} style={styles.cardImage} resizeMode="cover" />

        <TouchableOpacity
          style={styles.favoriteBtn}
          onPress={() => toggleFavorite(item.id)}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons
            name={favorited ? 'heart' : 'heart-outline'}
            size={20}
            color={favorited ? '#EF4444' : '#64748B'}
          />
        </TouchableOpacity>

        <View style={styles.cardContent}>
          <Text style={styles.categoryBadge}>{item.category}</Text>
          <Text style={styles.cardTitle} numberOfLines={2}>
            {item.name}
          </Text>
          <View style={styles.ratingRow}>
            <Ionicons name="star" size={14} color="#F59E0B" />
            <Text style={styles.ratingText}>{item.rating}</Text>
            <Text style={styles.salesCount}>({item.salesCount} đã bán)</Text>
          </View>
          <View style={styles.priceRow}>
            <Text style={styles.priceText}>{item.price.toLocaleString('vi-VN')} đ</Text>
            <Ionicons name="arrow-forward-circle" size={24} color="#7C3AED" />
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={SAMPLE_PRODUCTS}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  introBanner: {
    backgroundColor: '#F5F3FF',
    padding: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#EDE9FE',
  },
  introTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#6D28D9',
  },
  introSubtitle: {
    fontSize: 12,
    color: '#7C3AED',
    marginTop: 2,
  },
  listContent: {
    padding: 16,
    gap: 14,
    maxWidth: 600,
    width: '100%',
    alignSelf: 'center',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    position: 'relative',
  },
  cardImage: {
    width: 120,
    height: 120,
    backgroundColor: '#F1F5F9',
  },
  favoriteBtn: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 3,
  },
  cardContent: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    fontSize: 11,
    color: '#6D28D9',
    backgroundColor: '#F5F3FF',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    fontWeight: '600',
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#0F172A',
    marginVertical: 4,
    paddingRight: 24,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0F172A',
  },
  salesCount: {
    fontSize: 12,
    color: '#64748B',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  priceText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#7C3AED',
  },
});
