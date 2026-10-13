import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { Tour } from '../types/Tour';
import { formatDate, getSeatLabel } from '../utils/tours';

export interface TourItemProps {
  tour: Tour;
  compact?: boolean;
  onPress: (tour: Tour) => void;
  onToggleFavorite: (id: string, next: boolean) => void;
}

const TourItem: React.FC<TourItemProps> = ({
  tour,
  compact = false,
  onPress,
  onToggleFavorite,
}) => {
  const seatsNum = Number(tour.seats) || 0;
  const priceNum = Number(tour.price) || 0;
  
  const rawDay = tour.day ?? (tour as any).days;
  const dayDisplay = rawDay !== undefined && rawDay !== null ? String(rawDay) : '0';
  
  const isRedText = seatsNum <= 3;

  return (
    <TouchableOpacity
      style={[styles.card, compact ? styles.cardVertical : styles.cardHorizontal]}
      onPress={() => onPress(tour)}
      activeOpacity={0.85}
    >
      <View style={compact ? styles.imageContainerVertical : null}>
        <Image 
          source={{ uri: tour.image }} 
          style={[styles.image, compact ? styles.imageVertical : styles.imageHorizontal]} 
        />
        {compact && (
          <TouchableOpacity
            testID="fav-btn"
            onPress={() => onToggleFavorite(tour.id, !tour.isFavorite)}
            style={styles.favButtonAbsolute}
          >
            <Text style={styles.favIcon}>{tour.isFavorite ? '❤️' : '♡'}</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={[styles.infoContainer, compact ? styles.infoVertical : styles.infoHorizontal]}>
        {!compact && (
          <View style={styles.rowHeader}>
            <Text style={styles.name} numberOfLines={2}>
              {tour.name}
            </Text>
            <TouchableOpacity
              testID="fav-btn"
              onPress={() => onToggleFavorite(tour.id, !tour.isFavorite)}
              style={styles.favButton}
            >
              <Text style={styles.favIcon}>{tour.isFavorite ? '❤️' : '♡'}</Text>
            </TouchableOpacity>
          </View>
        )}

        {compact && (
          <Text style={styles.nameVertical} numberOfLines={1}>
            {tour.name}
          </Text>
        )}

        {!compact && (
          <>
            <Text style={styles.city}>📍 {tour.city}</Text>
            <Text style={styles.datetime}>
              📅 {formatDate(tour.departure)} • {dayDisplay} ngày
            </Text>
          </>
        )}

        {compact && (
          <Text style={styles.datetime}>
            • {dayDisplay} ngày
          </Text>
        )}

        <View style={compact ? styles.footerVertical : styles.rowFooter}>
          <Text style={styles.price}>
            {priceNum.toLocaleString('vi-VN')} ₫
          </Text>
          {!compact && (
            <Text style={[styles.seats, isRedText && styles.redText]}>
              {getSeatLabel(tour.seats)}
            </Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  cardVertical: {
    width: 160,
    flexDirection: 'column',
  },
  cardHorizontal: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginTop: 12,
  },
  image: {
    backgroundColor: '#e1e1e1',
  },
  imageHorizontal: {
    width: 90,
    height: 90,
  },
  imageContainerVertical: {
    position: 'relative',
    width: '100%',
  },
  imageVertical: {
    width: '100%',
    aspectRatio: 4 / 3,
  },
  favButtonAbsolute: {
    position: 'absolute',
    top: 6,
    right: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    borderRadius: 14,
    width: 28,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoContainer: {
    padding: 10,
    justifyContent: 'space-between',
  },
  infoHorizontal: {
    flex: 1,
  },
  infoVertical: {
    width: '100%',
    padding: 8,
  },
  rowHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  name: {
    flex: 1,
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333',
    paddingRight: 6,
  },
  nameVertical: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  favButton: {
    padding: 2,
  },
  favIcon: {
    fontSize: 18,
    color: 'red',
  },
  city: {
    fontSize: 12,
    color: '#777',
    marginTop: 1,
  },
  datetime: {
    fontSize: 12,
    color: '#555',
    marginVertical: 2,
  },
  rowFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 2,
  },
  footerVertical: {
    marginTop: 2,
  },
  price: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#28a745',
  },
  seats: {
    fontSize: 12,
    color: '#666',
  },
  redText: {
    color: '#dc3545',
    fontWeight: 'bold',
  },
});

export default React.memo(TourItem);
