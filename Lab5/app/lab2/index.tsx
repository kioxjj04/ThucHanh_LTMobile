import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
  Platform,
} from 'react-native';
import { useRouter, Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { fetchPhoneFromApi, PhoneProduct, LOCAL_PHONE_DATA } from '../../services/mockApi';
import { getPhoneImage } from '../../constants/phoneAssets';

export default function Lab2ApiScreen() {
  const router = useRouter();
  const [product, setProduct] = useState<PhoneProduct>(LOCAL_PHONE_DATA);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentColor, setCurrentColor] = useState<string>('blue');

  const getProductApi = async () => {
    setLoading(true);
    const res = await fetchPhoneFromApi();
    setProduct(res.data);
    setLoading(false);
  };

  useEffect(() => {
    let isMounted = true;
    (async () => {
      const res = await fetchPhoneFromApi();
      if (isMounted) {
        setProduct(res.data);
        setLoading(false);
      }
    })();
    return () => {
      isMounted = false;
    };
  }, []);

  const activeColor =
    product.colors.find((c) => c.id === currentColor) || product.colors[3];

  const handleBuy = () => {
    const msg = `Đặt hàng thành công: ${product.name} (${activeColor.name})`;
    if (Platform.OS === 'web') {
      window.alert(msg);
    } else {
      Alert.alert('Thành công', msg);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Stack.Screen
        options={{
          title: 'Bài tập 2: Gắn API (MockAPI)',
          headerTitleStyle: { fontWeight: '700' },
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.replace('/')} style={styles.headerBtn}>
              <Ionicons name="arrow-back" size={24} color="#000" />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity onPress={getProductApi} style={styles.headerBtn}>
              <Ionicons name="refresh" size={22} color="#007AFF" />
            </TouchableOpacity>
          ),
        }}
      />

      {loading ? (
        <View style={styles.loadingBox}>
          <ActivityIndicator size="large" color="#EE0A0A" />
          <Text style={styles.loadingText}>Đang tải dữ liệu từ MockAPI...</Text>
        </View>
      ) : (
        <>
          <View style={styles.imageContainer}>
            <Image
              source={getPhoneImage(activeColor.imageKey)}
              style={styles.phoneImage}
              resizeMode="contain"
            />
          </View>

          <View style={styles.infoContainer}>
            <Text style={styles.productTitle}>{product.title}</Text>

            <View style={styles.ratingRow}>
              <View style={styles.starRow}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <Ionicons key={star} name="star" size={18} color="#E0E41A" style={styles.starIcon} />
                ))}
              </View>
              <Text style={styles.reviewText}>(Xem {product.reviewCount} đánh giá)</Text>
            </View>

            <View style={styles.priceRow}>
              <Text style={styles.currentPrice}>{product.price.toLocaleString('vi-VN')} đ</Text>
              <Text style={styles.originalPrice}>
                {product.originalPrice.toLocaleString('vi-VN')} đ
              </Text>
            </View>

            <View style={styles.policyRow}>
              <Text style={styles.policyText}>{product.returnPolicyText}</Text>
              <View style={styles.questionCircle}>
                <Text style={styles.questionMark}>?</Text>
              </View>
            </View>

            {/* Color switcher directly on screen */}
            <Text style={styles.colorLabel}>Chọn màu sắc (API colors):</Text>
            <View style={styles.colorPalette}>
              {product.colors.map((c) => (
                <TouchableOpacity
                  key={c.id}
                  style={[
                    styles.colorCircle,
                    { backgroundColor: c.hex },
                    currentColor === c.id && styles.colorCircleActive,
                  ]}
                  onPress={() => setCurrentColor(c.id)}
                />
              ))}
            </View>

            <TouchableOpacity style={styles.buyButton} activeOpacity={0.85} onPress={handleBuy}>
              <Text style={styles.buyButtonText}>CHỌN MUA</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  contentContainer: {
    paddingBottom: 32,
    maxWidth: 540,
    width: '100%',
    alignSelf: 'center',
  },
  headerBtn: {
    padding: 8,
  },
  loadingBox: {
    paddingVertical: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: '#666',
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    backgroundColor: '#FFFFFF',
  },
  phoneImage: {
    width: 250,
    height: 320,
  },
  infoContainer: {
    paddingHorizontal: 22,
  },
  productTitle: {
    fontSize: 16,
    lineHeight: 22,
    color: '#000000',
    fontWeight: '500',
    marginBottom: 8,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  starRow: {
    flexDirection: 'row',
    marginRight: 16,
  },
  starIcon: {
    marginRight: 2,
  },
  reviewText: {
    fontSize: 14,
    color: '#000000',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 30,
  },
  currentPrice: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000000',
  },
  originalPrice: {
    fontSize: 15,
    color: '#808080',
    textDecorationLine: 'line-through',
    fontWeight: '700',
  },
  policyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 8,
  },
  policyText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#EE0A0A',
  },
  questionCircle: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 1.2,
    borderColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  questionMark: {
    fontSize: 10,
    fontWeight: '700',
    color: '#000',
    lineHeight: 12,
  },
  colorLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  colorPalette: {
    flexDirection: 'row',
    gap: 14,
    marginBottom: 24,
  },
  colorCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: '#E2E8F0',
  },
  colorCircleActive: {
    borderColor: '#EE0A0A',
    transform: [{ scale: 1.15 }],
  },
  buyButton: {
    height: 44,
    borderRadius: 10,
    backgroundColor: '#EE0A0A',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#EE0A0A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 5,
    elevation: 4,
  },
  buyButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
