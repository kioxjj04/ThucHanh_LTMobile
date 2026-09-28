import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Lab5HomeScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Text style={styles.title}>Trang chủ (Home Screen)</Text>
        <Text style={styles.desc}>
          Đây là màn hình Home đơn giản sử dụng Drawer Navigation. Bạn có thể vuốt từ cạnh trái sang hoặc nhấn nút menu ở góc trái header để điều hướng giữa các màn hình.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  box: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 24,
    maxWidth: 480,
    width: '100%',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 10,
    textAlign: 'center',
  },
  desc: {
    fontSize: 14,
    color: '#475569',
    textAlign: 'center',
    lineHeight: 22,
  },
});
