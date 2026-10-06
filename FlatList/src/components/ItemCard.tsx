import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import Item from "../types/Item";

interface ItemCardProps {
    item: Item;
}

export default React.memo(function ItemCard({ item }: ItemCardProps) {
    return (
    <TouchableOpacity onPress={() => alert(`${item.name}`)}>
      <View style={styles.container}>
        <Image 
            source={{ uri: item.imageUrl }} 
            style={styles.image} 
        />
        <View style={styles.infoContainer}>
            <Text style={styles.title}>{item.name}</Text>
            <Text style={styles.text}>Shop: {item.shop}</Text>
        </View>
      </View>
    </TouchableOpacity>
    );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', 
    padding: 10, 
    borderBottomWidth: 1, 
    borderColor: '#ccc',
    backgroundColor: '#fff',
  },
  image: {
    width: 70, 
    height: 100, 
    marginRight: 10,
    borderRadius: 8,

  },
  infoContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },

  title: {
    fontSize: 18, 
    fontWeight: 'bold',
    marginBottom: 4,
  },

  text: {
    fontSize: 14,
  },

});
