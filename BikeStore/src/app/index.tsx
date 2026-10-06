import { Text, View, StyleSheet, Image, Pressable } from "react-native";
import { router } from "expo-router";

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 24, fontWeight: "bold", textAlign: "center", marginBottom: 32 }}>A premium online store for sporter and their stylish choice</Text>
       <Image
        source={require("../images/bifour_-removebg-preview.png")}
        style={{ width: 300, height: 300, borderRadius: 16, marginVertical: 16, backgroundColor: "#E941411A" }}
      />
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>POWER BIKE</Text>
      <Text style={{ fontSize: 24, fontWeight: "bold", textAlign: "center" }}>SHOP</Text>
      <Pressable
        style={{
          backgroundColor: "#E94141",
          borderRadius: 16,
          marginTop: 16,
          marginBottom: 32,
          paddingVertical: 12,
          paddingHorizontal: 24,
          width: "80%",
        }}
        onPress={() => {
          router.push("/store");
        }}
      >
        <Text style={{ color: "#FFFFFF", fontSize: 24, fontWeight: "bold", textAlign: "center" }}>Get started</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
