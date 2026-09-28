import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LOCAL_PHONE_DATA, PhoneColor } from '../../services/mockApi';
import { getPhoneImage } from '../../constants/phoneAssets';

export default function Lab1ColorPickerScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ currentColor?: string }>();

  // Colors available
  const colors = LOCAL_PHONE_DATA.colors;

  // Selected color state for live preview
  const initialColor =
    colors.find((c) => c.id === params.currentColor) || colors[3] || colors[0];
  const [selectedColor, setSelectedColor] = useState<PhoneColor>(initialColor);

  const handleFinish = () => {
    // Navigate back to Lab 1 screen with the newly selected color param
    router.replace({
      pathname: '/lab1',
      params: { selectedColor: selectedColor.id },
    });
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: 'Chọn màu sản phẩm',
          headerTitleStyle: { fontWeight: '700' },
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()} style={styles.headerBtn}>
              <Ionicons name="arrow-back" size={24} color="#000" />
            </TouchableOpacity>
          ),
        }}
      />

      {/* Top Preview Section */}
      <View style={styles.topSection}>
        <Image
          source={getPhoneImage(selectedColor.imageKey)}
          style={styles.thumbnailImage}
          resizeMode="contain"
        />
        <View style={styles.headerInfo}>
          <Text style={styles.productName} numberOfLines={2}>
            Điện Thoại Vsmart Joy 3 - Hàng chính hãng
          </Text>
          <Text style={styles.colorInfoText}>
            Màu: <Text style={styles.boldText}>{selectedColor.codeName}</Text>
          </Text>
          <Text style={styles.supplierText}>
            Cung cấp bởi <Text style={styles.boldText}>Tiki Trading</Text>
          </Text>
          <Text style={styles.priceText}>1.790.000 đ</Text>
        </View>
      </View>

      {/* Bottom Color Selection Section */}
      <ScrollView
        style={styles.bottomSection}
        contentContainerStyle={styles.bottomContentContainer}
      >
        <Text style={styles.instructionText}>Chọn một màu bên dưới:</Text>

        {/* 4 Color Blocks */}
        <View style={styles.colorList}>
          {colors.map((colorItem) => {
            const isSelected = selectedColor.id === colorItem.id;
            return (
              <TouchableOpacity
                key={colorItem.id}
                activeOpacity={0.8}
                onPress={() => setSelectedColor(colorItem)}
                style={[
                  styles.colorBlockWrapper,
                  isSelected && styles.colorBlockWrapperActive,
                ]}
              >
                <View
                  style={[
                    styles.colorBlock,
                    { backgroundColor: colorItem.hex },
                  ]}
                />
                {isSelected && (
                  <View style={styles.checkBadge}>
                    <Ionicons
                      name="checkmark"
                      size={20}
                      color={colorItem.id === 'silver' ? '#000000' : '#FFFFFF'}
                    />
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Done / Finish Button */}
        <TouchableOpacity
          style={styles.doneButton}
          activeOpacity={0.85}
          onPress={handleFinish}
        >
          <Text style={styles.doneButtonText}>XONG</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    maxWidth: 540,
    width: '100%',
    alignSelf: 'center',
  },
  headerBtn: {
    padding: 8,
  },
  topSection: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  thumbnailImage: {
    width: 104,
    height: 125,
    marginRight: 16,
  },
  headerInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  productName: {
    fontSize: 15,
    fontWeight: '500',
    color: '#000000',
    marginBottom: 6,
    lineHeight: 20,
  },
  colorInfoText: {
    fontSize: 14,
    color: '#000000',
    marginBottom: 6,
  },
  supplierText: {
    fontSize: 14,
    color: '#000000',
    marginBottom: 6,
  },
  boldText: {
    fontWeight: '700',
  },
  priceText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000000',
  },
  bottomSection: {
    flex: 1,
    backgroundColor: '#C4C4C4',
  },
  bottomContentContainer: {
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 24,
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  instructionText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
    marginBottom: 10,
  },
  colorList: {
    alignItems: 'center',
    gap: 12,
    marginVertical: 6,
  },
  colorBlockWrapper: {
    width: 85,
    height: 75,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 2,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  colorBlockWrapperActive: {
    borderColor: '#1952E2',
    transform: [{ scale: 1.05 }],
  },
  colorBlock: {
    width: 80,
    height: 70,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  checkBadge: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  doneButton: {
    height: 46,
    borderRadius: 10,
    backgroundColor: 'rgba(25, 82, 226, 0.88)',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 18,
    shadowColor: '#1952E2',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#0B33A3',
  },
  doneButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
});
