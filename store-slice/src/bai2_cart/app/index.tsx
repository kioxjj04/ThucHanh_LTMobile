import { Text, View, StyleSheet } from "react-native";
import { Provider } from "react-redux";
import { store } from "../store";
import CartScreen from "../components/CartScreen";

export default function Index() {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <CartScreen />
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
