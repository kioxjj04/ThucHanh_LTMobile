import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {increment, decrement} from '../store/counterSlice';
import {RootState} from '../store';

export default function CounterScreen() {
    const dispatch = useDispatch();
    const counterValue = useSelector((state: RootState) => state.counter.value);

    return (
        <View style={styles.container}>
            <Text style={styles.counterText}>Counter: {counterValue}</Text>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={[styles.button, styles.incrementButton]}
                    onPress={() => dispatch(increment())}
                >
                    <Text style={styles.buttonText}>Increment</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.button, styles.decrementButton]}
                    onPress={() => dispatch(decrement())}
                >
                    <Text style={styles.buttonText}>Decrement</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    counterText: {
        fontSize: 32,
        marginBottom: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
    },
    button: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginHorizontal: 10,
    },
    incrementButton: {
        backgroundColor: 'green',
    },
    decrementButton: {
        backgroundColor: 'red',
    },
    buttonText: {
        fontSize: 18,
    },
});