import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
} from 'react-native';
import { useRouter, Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

interface LabItem {
  id: string;
  title: string;
  desc: string;
  route: string;
}

export default function HomeScreen() {
  const router = useRouter();

  const labs: LabItem[] = [
    {
      id: '1',
      title: 'Bài 1: Ứng dụng Select Phone',
      desc: 'Màn hình chi tiết điện thoại Vsmart Joy 3 và chọn màu',
      route: '/lab1',
    },
    {
      id: '2',
      title: 'Bài 2: Gắn API',
      desc: 'Tải và hiển thị thông tin sản phẩm từ MockAPI',
      route: '/lab2',
    },
    {
      id: '3',
      title: 'Bài 3: Bottom Tab Navigation',
      desc: 'Điều hướng 3 tab: Home, Search và Profile',
      route: '/lab3',
    },
    {
      id: '4',
      title: 'Bài 4: Stack + Tab Navigation',
      desc: 'Kết hợp Stack & Tab, truyền id sang màn hình chi tiết',
      route: '/lab4/(tabs)',
    },
    {
      id: '5',
      title: 'Bài 5: Drawer Navigation',
      desc: 'Menu kéo từ cạnh trái: Home, Profile, Settings',
      route: '/lab5',
    },
  ];

  const renderItem = ({ item, index }: { item: LabItem; index: number }) => (
    <TouchableOpacity
      style={styles.labItem}
      activeOpacity={0.7}
      onPress={() => router.push(item.route as any)}
    >
      <View style={styles.numberBadge}>
        <Text style={styles.numberText}>{index + 1}</Text>
      </View>
      <View style={styles.itemContent}>
        <Text style={styles.itemTitle}>{item.title}</Text>
        <Text style={styles.itemDesc}>{item.desc}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#94A3B8" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          title: 'Bài tập thực hành Lab 05',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontSize: 18,
            fontWeight: '600',
            color: '#1E293B',
          },
          headerStyle: {
            backgroundColor: '#FFFFFF',
          },
        }}
      />

      <View style={styles.listWrapper}>
        <Text style={styles.sectionHeader}>Danh sách bài tập:</Text>
        <FlatList
          data={labs}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  listWrapper: {
    flex: 1,
    padding: 16,
    maxWidth: 540,
    width: '100%',
    alignSelf: 'center',
  },
  sectionHeader: {
    fontSize: 15,
    fontWeight: '600',
    color: '#64748B',
    marginBottom: 12,
  },
  list: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    overflow: 'hidden',
  },
  labItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  numberBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#EEF2FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  numberText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#4F46E5',
  },
  itemContent: {
    flex: 1,
    marginRight: 8,
  },
  itemTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#0F172A',
  },
  itemDesc: {
    fontSize: 13,
    color: '#64748B',
    marginTop: 2,
  },
  separator: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginLeft: 62,
  },
});
