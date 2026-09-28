import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SAMPLE_PRODUCTS, SampleProduct } from '../../../constants/sampleProducts';
import { useFavorites } from '../../../context/FavoriteContext';

export default function Lab4FavoritesTab() {
  const router = useRouter();
  const { favorites, toggleFavorite } = useFavorites();

  const favoriteProducts = SAMPLE_PRODUCTS.filter((item) => favorites.includes(item.id));

  const handleProductPress = (product: SampleProduct) => {
    router.push({
      pathname: '/lab4/details/[id]',
      params: { id: product.id },
    });
  };

  const renderItem = ({ item }: { item: SampleProduct }) => (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.85}
      onPress={() => handleProductPress(item)}
    >
      <Image source={{ uri: item.image }} style={styles.cardImage} resizeMode="cover" />
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle} numberOfLines={2}>
          {item.name}
        </Text>
        <Text style={styles.priceText}>{item.price.toLocaleString('vi-VN')} đ</Text>
        <View style={styles.actionRow}>
          <TouchableOpacity
            style={styles.removeBtn}
            onPress={() => toggleFavorite(item.id)}
          >
            <Ionicons name="trash-outline" size={16} color="#EF4444" />
            <Text style={styles.removeBtnText}>Xóa</Text>
          </TouchableOpacity>
          <View style={styles.viewDetailBadge}>
            <Text style={styles.viewDetailText}>Xem chi tiết</Text>
            <Ionicons name="chevron-forward" size={14} color="#7C3AED" />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={favoriteProducts}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="heart-dislike-outline" size={56} color="#CBD5E1" />
            <Text style={styles.emptyTitle}>Chưa có sản phẩm yêu thích</Text>
            <Text style={styles.emptySubtext}>
              {'Hãy chuyển sang tab "Products" và bấm icon trái tim để thêm vào danh sách này!'}
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  introBanner: {
    backgroundColor: '#FDF2F8',
    padding: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#FCE7F3',
  },
  introTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#BE185D',
  },
  introSubtitle: {
    fontSize: 12,
    color: '#DB2777',
    marginTop: 2,
  },
  listContent: {
    padding: 16,
    gap: 12,
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
  },
  cardImage: {
    width: 110,
    height: 110,
    backgroundColor: '#F1F5F9',
  },
  cardContent: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#0F172A',
  },
  priceText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#BE185D',
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 6,
  },
  removeBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 6,
    backgroundColor: '#FEE2E2',
  },
  removeBtnText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#EF4444',
  },
  viewDetailBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  viewDetailText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#7C3AED',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
    paddingHorizontal: 24,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#475569',
    marginTop: 14,
  },
  emptySubtext: {
    fontSize: 13,
    color: '#94A3B8',
    textAlign: 'center',
    marginTop: 6,
    lineHeight: 18,
  },
});
