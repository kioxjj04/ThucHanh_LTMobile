import React from 'react';
import { Drawer } from 'expo-router/drawer';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function Lab5DrawerLayout() {
  const router = useRouter();

  return (
    <Drawer
      screenOptions={{
        headerTintColor: '#0F172A',
        headerTitleStyle: {
          fontWeight: '700',
        },
        drawerActiveTintColor: '#059669',
        drawerInactiveTintColor: '#64748B',
        drawerLabelStyle: {
          fontWeight: '600',
          marginLeft: -16,
        },
        headerRight: () => (
          <TouchableOpacity onPress={() => router.replace('/')} style={styles.headerBtn}>
            <Ionicons name="home-outline" size={22} color="#059669" />
          </TouchableOpacity>
        ),
      }}
    >
      <Drawer.Screen
        name="index"
        options={{
          drawerLabel: 'Home',
          title: 'Bài 5: Trang chủ',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="profile"
        options={{
          drawerLabel: 'Profile',
          title: 'Bài 5: Thông tin người dùng',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="settings"
        options={{
          drawerLabel: 'Settings',
          title: 'Bài 5: Cài đặt hệ thống',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="settings-outline" size={size} color={color} />
          ),
        }}
      />
    </Drawer>
  );
}

const styles = StyleSheet.create({
  headerBtn: {
    marginRight: 16,
    padding: 6,
  },
});
