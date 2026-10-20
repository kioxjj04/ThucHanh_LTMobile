import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Provider } from "react-redux";

import CounterScreen from "../src/bai1_increment_decrement/components/CounterScreen";
import { store as counterStore } from "../src/bai1_increment_decrement/store";
import CartScreen from "../src/bai2_cart/components/CartScreen";
import { store as cartStore } from "../src/bai2_cart/store";

export default function App() {
  const [selectedExercise, setSelectedExercise] = useState<"bai1" | "bai2">();

  return (
    <View style={styles.container}>
      <View style={styles.buttons}>
        <Pressable style={styles.button} onPress={() => setSelectedExercise("bai1")}>
          <Text style={styles.buttonText}>Bài 1: Counter</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={() => setSelectedExercise("bai2")}>
          <Text style={styles.buttonText}>Bài 2: Cart</Text>
        </Pressable>
      </View>

      {selectedExercise === "bai1" && (
        <Provider store={counterStore}>
          <CounterScreen />
        </Provider>
      )}
      {selectedExercise === "bai2" && (
        <Provider store={cartStore}>
          <CartScreen />
        </Provider>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 64,
    backgroundColor: "#f5f5f5",
  },
  buttons: {
    flexDirection: "row",
    gap: 12,
    padding: 20,
  },
  button: {
    flex: 1,
    alignItems: "center",
    borderRadius: 8,
    padding: 14,
    backgroundColor: "#208AEF",
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
  },
});
