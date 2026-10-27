import ShoppingCart from "@/components/ShoppingCart";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <ShoppingCart />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}