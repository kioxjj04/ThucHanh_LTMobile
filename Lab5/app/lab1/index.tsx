import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
  Platform,
} from 'react-native';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LOCAL_PHONE_DATA } from '../../services/mockApi';
import { getPhoneImage } from '../../constants/phoneAssets';

export default function Lab1SelectPhoneScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ selectedColor?: string }>();

  const product = LOCAL_PHONE_DATA;
  const effectiveColorKey = params.selectedColor || 'blue';
  const activeColor =
    product.colors.find((c) => c.id === effectiveColorKey) || product.colors[3];

  const handleBuyPress = () => {
    const msg = `Đã chọn mua: ${product.name} - Màu ${activeColor.name}`;
    if (Platform.OS === 'web') {
      window.alert(msg);
    } else {
      Alert.alert('Thông báo', msg);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Stack.Screen
        options={{
          title: 'Bài tập 1: Select Phone',
          headerTitleStyle: { fontWeight: '700' },
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.replace('/')} style={styles.headerBtn}>
              <Ionicons name="arrow-back" size={24} color="#000" />
            </TouchableOpacity>
          ),
        }}
      />

      {/* Product Image */}
      <View style={styles.imageContainer}>
        <Image
          source={getPhoneImage(activeColor.imageKey)}
          style={styles.phoneImage}
          resizeMode="contain"
        />
      </View>

      {/* Product Information */}
      <View style={styles.infoContainer}>
        <Text style={styles.productTitle}>{product.title}</Text>

        {/* Rating Section */}
        <View style={styles.ratingRow}>
          <View style={styles.starRow}>
            {[1, 2, 3, 4, 5].map((star) => (
              <Ionicons key={star} name="star" size={18} color="#E0E41A" style={styles.starIcon} />
            ))}
          </View>
          <Text style={styles.reviewText}>(Xem {product.reviewCount} đánh giá)</Text>
        </View>

        {/* Price Section */}
        <View style={styles.priceRow}>
          <Text style={styles.currentPrice}>{product.price.toLocaleString('vi-VN')} đ</Text>
          <Text style={styles.originalPrice}>
            {product.originalPrice.toLocaleString('vi-VN')} đ
          </Text>
        </View>

        {/* Refund Policy */}
        <View style={styles.policyRow}>
          <Text style={styles.policyText}>{product.returnPolicyText}</Text>
          <View style={styles.questionCircle}>
            <Text style={styles.questionMark}>?</Text>
          </View>
        </View>

        {/* Select Color Button (Navigate to Color Picker Screen) */}
        <TouchableOpacity
          style={styles.selectColorButton}
          activeOpacity={0.8}
          onPress={() =>
            router.push({
              pathname: '/lab1/color-picker',
              params: { currentColor: effectiveColorKey },
            })
          }
        >
          <Text style={styles.selectColorText}>4 MÀU - CHỌN MÀU</Text>
          <Ionicons name="chevron-forward" size={20} color="#000" />
        </TouchableOpacity>

        {/* Buy Button */}
        <TouchableOpacity style={styles.buyButton} activeOpacity={0.85} onPress={handleBuyPress}>
          <Text style={styles.buyButtonText}>CHỌN MUA</Text>
        </TouchableOpacity>
      </View>
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
    marginBottom: 20,
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
  selectColorButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 38,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.46)',
    backgroundColor: '#FFFFFF',
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  selectColorText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#000000',
    textAlign: 'center',
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
