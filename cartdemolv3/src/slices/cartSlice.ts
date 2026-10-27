// slices/cartSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
}

interface CartState {
    items: CartItem[];
    discountCode: string | null;
    taxRate: number; // 10% = 0.1
    shippingCost: number;
}

const initialState: CartState = {
    items: [], // Always start empty for SSR consistency
    discountCode: null,
    taxRate: 0.1,
    shippingCost: 10
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        loadCart: (state) => {
            if (typeof window !== 'undefined' && window.localStorage) {
                try {
                    const raw = localStorage.getItem('cartItems');
                    if (raw) {
                        const parsed = JSON.parse(raw);
                        if (Array.isArray(parsed)) {
                            state.items = parsed.map((item: any) => ({
                                id: Number(item.id) || 0,
                                name: String(item.name || ''),
                                price: Number(item.price) || 0,
                                quantity: Number(item.quantity) || 1
                            }));
                        } else {
                            state.items = [];
                        }
                    }
                } catch {
                    state.items = [];
                }
            }
        },
        addToCart: (state, action: PayloadAction<Omit<CartItem, 'quantity'>>) => {
            const newItemId = Number(action.payload.id);
            const newItemPrice = Number(action.payload.price) || 0;

            const existingItem = state.items.find(
                item => item.id === newItemId
            );

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.items.push({
                    id: newItemId,
                    name: String(action.payload.name || ''),
                    price: newItemPrice,
                    quantity: 1
                });
            }

            // Lưu vào localStorage
            if (typeof window !== 'undefined' && window.localStorage) {
                localStorage.setItem('cartItems', JSON.stringify(state.items));
            }
        },

        increaseQuantity: (state, action: PayloadAction<number>) => {
            const targetId = Number(action.payload);
            const item = state.items.find(item => item.id === targetId);
            if (item) item.quantity += 1;
            if (typeof window !== 'undefined' && window.localStorage) {
                localStorage.setItem('cartItems', JSON.stringify(state.items));
            }
        },

        decreaseQuantity: (state, action: PayloadAction<number>) => {
            const targetId = Number(action.payload);
            const item = state.items.find(item => item.id === targetId);
            if (item && item.quantity > 1) item.quantity -= 1;
            if (typeof window !== 'undefined' && window.localStorage) {
                localStorage.setItem('cartItems', JSON.stringify(state.items));
            }
        },

        removeFromCart: (state, action: PayloadAction<number>) => {
            const targetId = Number(action.payload);
            state.items = state.items.filter(item => item.id !== targetId);
            if (typeof window !== 'undefined' && window.localStorage) {
                localStorage.setItem('cartItems', JSON.stringify(state.items));
            }
        },

        clearCart: (state) => {
            state.items = [];
            if (typeof window !== 'undefined' && window.localStorage) {
                localStorage.removeItem('cartItems');
            }
        },

        // Áp dụng mã giảm giá
        applyDiscount: (state, action: PayloadAction<string>) => {
            state.discountCode = action.payload;
        },

        // Đặt phí vận chuyển
        setShippingCost: (state, action: PayloadAction<number>) => {
            state.shippingCost = Number(action.payload) || 0;
        }
    }
});

export default cartSlice.reducer;
export const {
    loadCart,
    addToCart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
    applyDiscount,
    setShippingCost
} = cartSlice.actions;