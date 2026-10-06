import { Text, View, StyleSheet, Pressable, FlatList, Image } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import bikes from "../types/BikeList";

export default function ShopScreen() {
    const router = useRouter();

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>The world's best bike</Text>

            <View style={{ flexDirection: "row", justifyContent: "space-between", width: "80%", marginBottom: 16 }}>
                <Pressable style={styles.button}>
                    <Text style={styles.buttonText}>All</Text>
                </Pressable>
                <Pressable style={styles.button}>
                    <Text style={styles.buttonText}>Roadbike</Text>
                </Pressable>
                <Pressable style={styles.button}>
                    <Text style={styles.buttonText}>Mountain</Text>
                </Pressable>
            </View>
            
            <FlatList
                style={{ paddingHorizontal: 16, marginBottom: 16, marginTop: 16 }}
                numColumns={2}

                data={bikes}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={{ alignItems: 'center', width: '100%' }}
                renderItem={({ item }) => (
                    <Pressable
                        style={styles.listItem}
                        onPress={() => router.push({ pathname: "/store/[id]", params: { id: item.id.toString() } })}
                    >
                        <Image 
                            source={item.imageUrl} 
                            style={{ width: '100%', height: 100, resizeMode: 'contain', marginBottom: 8 }} />
                        <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 8 }}>{item.name}</Text>
                        <Text style={{ fontSize: 18, fontWeight: "bold", color: '#E94141' }}>${item.price}</Text>
                    </Pressable>
                )}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "#FFFFFF",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginVertical: 16,
    },
    button: {
        backgroundColor: "lightgray",
        borderRadius: 16,
        paddingVertical: 12,
        paddingHorizontal: 20,
    },
    buttonText: {
        fontWeight: "bold",
        color: "#333",

    },
    listItem: {
        width: 160,
        height: 150,
        margin: 8,
        backgroundColor: '#F7FAFF',
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8,
    },
});
