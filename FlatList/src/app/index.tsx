import { ActivityIndicator, FlatList, StyleSheet, Text, View, RefreshControl, Switch } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from 'react';
import Item from "../types/Item";
import ItemCard from "../components/ItemCard";

const fetchItems = async () => {
  try {
    return await (await fetch("https://6832c2f1c3f2222a8cb371f1.mockapi.io/Item")).json();
  } catch { return []; }
};

export default function App() {
  const [item, setItem] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [isTile, setIsTile] = useState(false);

  const loadData = async () => setItem(await fetchItems());

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
        <FlatList
          data={item}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <ItemCard item={item} layout={isTile ? 'tile' : 'row'} />}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
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