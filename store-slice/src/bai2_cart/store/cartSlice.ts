import {createSlice} from '@reduxjs/toolkit'

interface cartState {
    id: string,
    name: string,
    price: number,
    quantity: number
}

const initialState: cartState[] = []

const counterSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const existingItem = state.find(item => item.id === action.payload.id);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.push({...action.payload, quantity: 1});
            }
        },
        removeFromCart: (state, action) => {
            return state.filter(item => item.id !== action.payload.id);
        },
        updateQuantity: (state, action) => {
            const item = state.find(item => item.id === action.payload.id);
            if (item) {
                item.quantity = action.payload.quantity;
            }
        },
        clearCart: () => {
            return [];
        }
    }
});

export const {addToCart, removeFromCart, updateQuantity, clearCart} = counterSlice.actions
export default counterSlice.reducer