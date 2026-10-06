import { Text, View, StyleSheet, Pressable, Image } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import bikes from "../../types/BikeList";

export default function BikeDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams(); 

  const bike = bikes.find((b) => b.id === parseInt(id as string));

  return (
    <View style={styles.container}>
      <Image source={bike?.imageUrl} style={{ width: 300, height: 300, resizeMode: 'contain' }} />
      <Text style={styles.name}>{bike?.name}</Text>
      <Text style={styles.price}>${bike?.price}</Text>
      <Text style={styles.description}>{bike?.description}</Text>

      <Pressable style={{ backgroundColor: "#E94141", borderRadius: 16, marginTop: 16, paddingVertical: 12, paddingHorizontal: 24, width: "80%" }}>
        <Text style={{ color: "lightgray", fontSize: 18, fontWeight: "bold", textAlign: "center", padding: 10, borderRadius: 5 }} onPress={() => router.back()}>Add to Cart</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFF",
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
  },
  description: {
    fontSize: 16, 
    textAlign: "justify",
    marginVertical: 16,
    color: "#666",
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  price: {
    fontSize: 20,
    fontWeight: "bold", 
  },

});
