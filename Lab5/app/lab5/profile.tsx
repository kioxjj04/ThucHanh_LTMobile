import { Ionicons } from '@expo/vector-icons';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function Lab5ProfileScreen() {
  const userInfo = {
    fullName: 'Nguyen Gia Hao',
    username: '@haonguyen',
    email: 'haonguyen@example.com',
    phone: '+84 123 456 789',
    department: 'Khoa Công Nghệ Thông Tin',
    studentId: '22716071',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80',
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.profileHeader}>
        <Image source={{ uri: userInfo.avatar }} style={styles.avatar} />
        <Text style={styles.name}>{userInfo.fullName}</Text>
        <Text style={styles.username}>{userInfo.username}</Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>Sinh viên thực hành Mobile</Text>
        </View>
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.infoCardTitle}>Thông tin tài khoản</Text>

        <View style={styles.infoItem}>
          <Ionicons name="card-outline" size={20} color="#059669" />
          <View style={styles.infoTextGroup}>
            <Text style={styles.infoLabel}>Mã số sinh viên</Text>
            <Text style={styles.infoValue}>{userInfo.studentId}</Text>
          </View>
        </View>

        <View style={styles.infoItem}>
          <Ionicons name="school-outline" size={20} color="#059669" />
          <View style={styles.infoTextGroup}>
            <Text style={styles.infoLabel}>Khoa / Chuyên ngành</Text>
            <Text style={styles.infoValue}>{userInfo.department}</Text>
          </View>
        </View>

        <View style={styles.infoItem}>
          <Ionicons name="mail-outline" size={20} color="#059669" />
          <View style={styles.infoTextGroup}>
            <Text style={styles.infoLabel}>Địa chỉ Email</Text>
            <Text style={styles.infoValue}>{userInfo.email}</Text>
          </View>
        </View>

        <View style={[styles.infoItem, { borderBottomWidth: 0 }]}>
          <Ionicons name="call-outline" size={20} color="#059669" />
          <View style={styles.infoTextGroup}>
            <Text style={styles.infoLabel}>Số điện thoại</Text>
            <Text style={styles.infoValue}>{userInfo.phone}</Text>
          </View>
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
  profileHeader: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    borderWidth: 3,
    borderColor: '#059669',
    marginBottom: 12,
  },
  name: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0F172A',
  },
  username: {
    fontSize: 14,
    color: '#64748B',
    marginTop: 2,
  },
  badge: {
    marginTop: 10,
    backgroundColor: '#ECFDF5',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#059669',
  },
  infoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  infoCardTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 12,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  infoTextGroup: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    color: '#64748B',
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0F172A',
    marginTop: 2,
  },
});
