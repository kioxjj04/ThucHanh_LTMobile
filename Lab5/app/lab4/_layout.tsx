import React from 'react';
import { Stack } from 'expo-router';
import { FavoriteProvider } from '../../context/FavoriteContext';

export default function Lab4StackLayout() {
  return (
    <FavoriteProvider>
      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="details/[id]"
          options={{
            title: 'Chi tiết sản phẩm',
            headerBackTitle: 'Quay lại',
            headerStyle: {
              backgroundColor: '#FFFFFF',
            },
            headerTitleStyle: {
              fontWeight: '700',
              color: '#0F172A',
            },
          }}
        />
      </Stack>
    </FavoriteProvider>
  );
}
