import { Text, View, StyleSheet } from "react-native";
import { Provider } from "react-redux";
import { store } from "../store";
import CounterScreen from "@/bai1_increment_decrement/components/CounterScreen";

export default function Index2() {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <CounterScreen />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
});
