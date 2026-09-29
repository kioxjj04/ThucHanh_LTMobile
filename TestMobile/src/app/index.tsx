import { ActivityIndicator, FlatList, StyleSheet, Text, View, RefreshControl, Switch } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from 'react';
import Movie from "../types/Movie";
import MovieCard from "../components/MovieCard";

const fetchMovies = async () => {
  try {
    return await (await fetch("https://6abb54aab2118ed7abb83ef1.mockapi.io/movies")).json();
  } catch { return []; }
};

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [isTile, setIsTile] = useState(false);

  const loadData = async () => setMovies(await fetchMovies());

  const onRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  useEffect(() => {
    loadData().then(() => setLoading(false));
  }, []);

  if (loading) return <View style={styles.center}><ActivityIndicator size="large" color="#0000ff" /></View>;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.main}>
        <View style={styles.header}>
          <Text style={styles.title}>Movie App</Text>
          <View style={styles.switchRow}>
            <Text style={styles.switchLabel}>Dạng lưới</Text>
            <Switch value={isTile} onValueChange={setIsTile} />
          </View>
        </View>
        <FlatList
          key={isTile ? '2' : '1'}
          data={movies}
          keyExtractor={(item) => item.id}
          numColumns={isTile ? 2 : 1}
          columnWrapperStyle={isTile ? styles.columnWrapper : undefined}
          renderItem={({ item }) => <MovieCard movie={item} layout={isTile ? 'tile' : 'row'} />}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  center: { 
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center" 
  },

  container: { 
    flex: 1, 
    paddingHorizontal: 16, 
    paddingTop: 16,  
  },

  main: { 
    flex: 1, 
    maxWidth: 960, 
    marginHorizontal: "auto", 
    width: '100%' 
  },
  
  header: { 
    alignItems: 'center', 
    marginBottom: 16 
  },

  title: { 
    fontSize: 42, 
    fontWeight: "bold" 
  },

  switchRow: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    alignSelf: 'flex-end', 
    marginTop: 8 
  },

  switchLabel: { 
    fontSize: 16, 
    marginRight: 8, 
    fontWeight: '600' 
  },

  columnWrapper: { 
    justifyContent: 'space-between' 
  }
});