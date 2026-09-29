import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import Movie from "../types/Movie";
import { Button } from "expo-router/build/react-navigation";

interface MovieCardProps {
    movie: Movie;
    layout?: 'row' | 'tile';
}

export default React.memo(function MovieCard({ movie, layout = 'row' }: MovieCardProps) {
    const isTile = layout === 'tile';
    return (
    <TouchableOpacity onPress={() => alert(`${movie.title}`)}>
      <View style={styles.container}>
        <Image 
          source={{ uri: movie.image }} 
          style={styles.image} 
        />
        <View style={styles.infoContainer}>
          <Text style={styles.title}>{movie.title}</Text>
          <Text style={styles.text}>Genre: {movie.category}</Text>
          <Text style={styles.text}>Year: {movie.year}</Text>
          <Text style={styles.text}>Rating: {Number(movie.rating).toFixed(1)}</Text>
          <Text style={styles.text}>Status: {movie.status ? '✅' : '❌'}</Text>
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
