import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Switch,
  ScrollView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Lab5SettingsScreen() {
  // Yêu cầu: Settings hiển thị 1-2 tùy chọn (Switch bật/tắt)
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [autoUpdate, setAutoUpdate] = useState(true);
  const [dataSaver, setDataSaver] = useState(false);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.headerBox}>
        <Text style={styles.headerTitle}>Cài đặt hệ thống</Text>
        <Text style={styles.headerSubtitle}>
          Tuỳ chỉnh các tuỳ chọn ứng dụng bằng công tắc Switch (Bài tập 5.c)
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Giao diện & Trải nghiệm</Text>

        {/* Switch 1: Chế độ tối */}
        <View style={styles.settingRow}>
          <View style={[styles.iconBox, { backgroundColor: '#F3E8FF' }]}>
            <Ionicons name="moon-outline" size={20} color="#7C3AED" />
          </View>
          <View style={styles.textBox}>
            <Text style={styles.settingLabel}>Chế độ tối (Dark Mode)</Text>
            <Text style={styles.settingDesc}>
              {darkMode ? 'Đang bật nền tối dịu mắt' : 'Đang sử dụng nền sáng tiêu chuẩn'}
            </Text>
          </View>
          <Switch
            value={darkMode}
            onValueChange={setDarkMode}
            trackColor={{ false: '#CBD5E1', true: '#10B981' }}
            thumbColor={Platform.OS === 'android' ? (darkMode ? '#059669' : '#FFFFFF') : undefined}
          />
        </View>

        {/* Switch 2: Nhận thông báo */}
        <View style={styles.settingRow}>
          <View style={[styles.iconBox, { backgroundColor: '#FEF3C7' }]}>
            <Ionicons name="notifications-outline" size={20} color="#D97706" />
          </View>
          <View style={styles.textBox}>
            <Text style={styles.settingLabel}>Nhận thông báo đẩy</Text>
            <Text style={styles.settingDesc}>
              {notifications ? 'Cho phép nhận tin tức mới và khuyến mãi' : 'Đã tắt mọi thông báo'}
            </Text>
          </View>
          <Switch
            value={notifications}
            onValueChange={setNotifications}
            trackColor={{ false: '#CBD5E1', true: '#10B981' }}
            thumbColor={Platform.OS === 'android' ? (notifications ? '#059669' : '#FFFFFF') : undefined}
          />
        </View>

        {/* Switch 3: Tự động cập nhật */}
        <View style={styles.settingRow}>
          <View style={[styles.iconBox, { backgroundColor: '#DBEAFE' }]}>
            <Ionicons name="cloud-download-outline" size={20} color="#2563EB" />
          </View>
          <View style={styles.textBox}>
            <Text style={styles.settingLabel}>Tự động cập nhật qua Wi-Fi</Text>
            <Text style={styles.settingDesc}>
              {autoUpdate ? 'Tự tải bản cập nhật khi có Wi-Fi' : 'Cập nhật thủ công'}
            </Text>
          </View>
          <Switch
            value={autoUpdate}
            onValueChange={setAutoUpdate}
            trackColor={{ false: '#CBD5E1', true: '#10B981' }}
            thumbColor={Platform.OS === 'android' ? (autoUpdate ? '#059669' : '#FFFFFF') : undefined}
          />
        </View>

        {/* Switch 4: Tiết kiệm dữ liệu */}
        <View style={[styles.settingRow, { borderBottomWidth: 0 }]}>
          <View style={[styles.iconBox, { backgroundColor: '#FEE2E2' }]}>
            <Ionicons name="cellular-outline" size={20} color="#EF4444" />
          </View>
          <View style={styles.textBox}>
            <Text style={styles.settingLabel}>Tiết kiệm dữ liệu mạng</Text>
            <Text style={styles.settingDesc}>
              {dataSaver ? 'Giảm độ phân giải ảnh để tiết kiệm 4G' : 'Tải ảnh chất lượng cao gốc'}
            </Text>
          </View>
          <Switch
            value={dataSaver}
            onValueChange={setDataSaver}
            trackColor={{ false: '#CBD5E1', true: '#10B981' }}
            thumbColor={Platform.OS === 'android' ? (dataSaver ? '#059669' : '#FFFFFF') : undefined}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  content: {
    padding: 20,
    gap: 16,
    maxWidth: 600,
    width: '100%',
    alignSelf: 'center',
  },
  headerBox: {
    backgroundColor: '#ECFDF5',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#D1FAE5',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#065F46',
  },
  headerSubtitle: {
    fontSize: 13,
    color: '#059669',
    marginTop: 4,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 10,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  iconBox: {
    width: 38,
    height: 38,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  textBox: {
    flex: 1,
    marginRight: 12,
  },
  settingLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#0F172A',
  },
  settingDesc: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
});
