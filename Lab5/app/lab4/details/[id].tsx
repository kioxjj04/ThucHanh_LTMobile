import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
  Platform,
} from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SAMPLE_PRODUCTS } from '../../../constants/sampleProducts';
import { useFavorites } from '../../../context/FavoriteContext';

export default function Lab4ProductDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { isFavorite, toggleFavorite } = useFavorites();

  const product = SAMPLE_PRODUCTS.find((p) => p.id === id) || SAMPLE_PRODUCTS[0];
  const favorited = isFavorite(product.id);

  const handleOrder = () => {
    const msg = `Đặt hàng thành công sản phẩm: ${product.name} (${product.price.toLocaleString('vi-VN')} đ)`;
    if (Platform.OS === 'web') {
      window.alert(msg);
    } else {
      Alert.alert('Thành công', msg);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      <Stack.Screen
        options={{
          title: product.name,
          headerRight: () => (
            <TouchableOpacity
              onPress={() => toggleFavorite(product.id)}
              style={styles.headerIconBtn}
            >
              <Ionicons
                name={favorited ? 'heart' : 'heart-outline'}
                size={24}
                color={favorited ? '#EF4444' : '#0F172A'}
              />
            </TouchableOpacity>
          ),
        }}
      />

      {/* Product Image */}
      <View style={styles.imageCard}>
        <Image source={{ uri: product.image }} style={styles.productImage} resizeMode="contain" />
      </View>

      {/* Product Information */}
      <View style={styles.infoCard}>
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryText}>{product.category}</Text>
        </View>
        <Text style={styles.productTitle}>{product.name}</Text>

        <View style={styles.metaRow}>
          <View style={styles.starRow}>
            {[1, 2, 3, 4, 5].map((star) => (
              <Ionicons
                key={star}
                name={star <= Math.round(product.rating) ? 'star' : 'star-outline'}
                size={16}
                color="#F59E0B"
              />
            ))}
            <Text style={styles.ratingScore}>{product.rating}</Text>
          </View>
          <Text style={styles.salesCount}>Đã bán {product.salesCount} sản phẩm</Text>
        </View>

        <View style={styles.priceRow}>
          <Text style={styles.priceMain}>{product.price.toLocaleString('vi-VN')} đ</Text>
          <Text style={styles.priceOriginal}>
            {product.originalPrice.toLocaleString('vi-VN')} đ
          </Text>
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>
              -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
            </Text>
          </View>
        </View>
      </View>

      {/* Specifications */}
      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Thông số kỹ thuật</Text>
        <View style={styles.specsTable}>
          <View style={styles.specRow}>
            <Text style={styles.specLabel}>Màn hình</Text>
            <Text style={styles.specValue}>{product.specs.screen}</Text>
          </View>
          <View style={styles.specRow}>
            <Text style={styles.specLabel}>Bộ nhớ RAM</Text>
            <Text style={styles.specValue}>{product.specs.ram}</Text>
          </View>
          <View style={styles.specRow}>
            <Text style={styles.specLabel}>Bộ nhớ trong</Text>
            <Text style={styles.specValue}>{product.specs.storage}</Text>
          </View>
          <View style={[styles.specRow, { borderBottomWidth: 0 }]}>
            <Text style={styles.specLabel}>Dung lượng Pin</Text>
            <Text style={styles.specValue}>{product.specs.battery}</Text>
          </View>
        </View>
      </View>

      {/* Description */}
      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Mô tả sản phẩm</Text>
        <Text style={styles.descText}>{product.description}</Text>
      </View>

      {/* Bottom Action Bar */}
      <View style={styles.actionRow}>
        <TouchableOpacity
          style={[styles.favoriteActionBtn, favorited && styles.favoriteActionBtnActive]}
          onPress={() => toggleFavorite(product.id)}
        >
          <Ionicons
            name={favorited ? 'heart' : 'heart-outline'}
            size={22}
            color={favorited ? '#EF4444' : '#64748B'}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.buyNowBtn} activeOpacity={0.85} onPress={handleOrder}>
          <Text style={styles.buyNowText}>MUA NGAY</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  scrollContent: {
    padding: 16,
    gap: 14,
    maxWidth: 600,
    width: '100%',
    alignSelf: 'center',
    paddingBottom: 40,
  },
  headerIconBtn: {
    marginRight: 16,
    padding: 6,
  },
  paramBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F3FF',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#EDE9FE',
    gap: 8,
  },
  paramBannerText: {
    fontSize: 13,
    color: '#6D28D9',
  },
  imageCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  productImage: {
    width: '100%',
    height: 240,
  },
  infoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    marginBottom: 8,
  },
  categoryText: {
    fontSize: 12,
    color: '#475569',
    fontWeight: '600',
  },
  productTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0F172A',
    lineHeight: 26,
    marginBottom: 8,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  starRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  ratingScore: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
    marginLeft: 6,
  },
  salesCount: {
    fontSize: 13,
    color: '#64748B',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 10,
  },
  priceMain: {
    fontSize: 22,
    fontWeight: '700',
    color: '#EF4444',
  },
  priceOriginal: {
    fontSize: 14,
    color: '#94A3B8',
    textDecorationLine: 'line-through',
  },
  discountBadge: {
    backgroundColor: '#FEE2E2',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  discountText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#EF4444',
  },
  sectionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 12,
  },
  specsTable: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    overflow: 'hidden',
  },
  specRow: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  specLabel: {
    width: 120,
    fontSize: 13,
    color: '#64748B',
  },
  specValue: {
    flex: 1,
    fontSize: 13,
    fontWeight: '600',
    color: '#0F172A',
  },
  descText: {
    fontSize: 14,
    lineHeight: 22,
    color: '#334155',
  },
  actionRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  favoriteActionBtn: {
    width: 52,
    height: 50,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  favoriteActionBtnActive: {
    borderColor: '#FECACA',
    backgroundColor: '#FEF2F2',
  },
  buyNowBtn: {
    flex: 1,
    height: 50,
    borderRadius: 12,
    backgroundColor: '#7C3AED',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#7C3AED',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  buyNowText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
});
