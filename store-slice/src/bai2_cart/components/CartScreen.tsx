import {View, Text, TouchableOpacity, StyleSheet, FlatList} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {addToCart, removeFromCart, updateQuantity, clearCart} from '../store/cartSlice';
import {RootState} from '../store';

export default function CartScreen() {
    const dispatch = useDispatch();
    const cartItems = useSelector((state: RootState) => state.cart);

    const handleAddToCart = (item: any) => {
        dispatch(addToCart(item));
    };

    const handleRemoveFromCart = (itemId: string) => {
        dispatch(removeFromCart({id: itemId}));
    };

    const handleUpdateQuantity = (itemId: string, quantity: number) => {
        dispatch(updateQuantity({id: itemId, quantity}));
    };

    const handleClearCart = () => {
        dispatch(clearCart());
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>🛒 Giỏ Hàng</Text>
            
            {/* Danh sách sản phẩm */}
            <FlatList
            data={cartItems}
            keyExtractor={(item, index) => String(item.id ?? index)}
            renderItem={({ item }) => (
                <View style={styles.cartItem}>
                <View>
                    <Text>{item.name}</Text>
                    <Text>${item.price}</Text>
                </View>
                <View>
                    <Text>Số lượng: {item.quantity}</Text>
                    {/* Nút tăng/giảm */}
                    <TouchableOpacity onPress={() => handleUpdateQuantity(item.id, item.quantity - 1)}>
                    <Text>-</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleUpdateQuantity(item.id, item.quantity + 1)}>
                    <Text>+</Text>
                    </TouchableOpacity>
                </View>
                {/* Nút xóa */}
                <TouchableOpacity onPress={() => handleRemoveFromCart(item.id)}>
                    <Text>Xóa</Text>
                </TouchableOpacity>
                </View>
            )}
            />
            
            <View style={styles.buttonRow}>
            <TouchableOpacity 
                style={styles.addButton}
                onPress={() => handleAddToCart({
                    id: `product-${Date.now()}`,
                    name: 'New Product',
                    price: 10,
                    quantity: 1,
                })}
            >
                <Text>+ Thêm Sản Phẩm</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
                style={styles.clearButton}
                onPress={handleClearCart}
            >
                <Text>🗑️ Xóa Giỏ</Text>
            </TouchableOpacity>
            </View>
            
            {/* Tính tổng tiền */}
            <View style={styles.totalBox}>
            <Text>Tổng: ${cartItems.reduce((total, item) => total + item.price * item.quantity, 0)}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    cartItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    addButton: {
        backgroundColor: '#4CAF50',
        padding: 10,
        borderRadius: 5,
    },
    clearButton: {
        backgroundColor: '#f44336',
        padding: 10,
        borderRadius: 5,
    },
    totalBox: {
        marginTop: 20,
        alignItems: 'flex-end',
    },
});