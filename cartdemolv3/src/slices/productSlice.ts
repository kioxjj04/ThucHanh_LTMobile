// slices/productSlice.ts
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Product {
    id: number;
    name: string;
    price: number;
    image: string;
}

interface ProductsState {
    items: Product[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

// Lấy danh sách sản phẩm từ MockAPI
export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async () => {
        const response = await fetch('https://6832c2f1c3f2222a8cb371f1.mockapi.io/Products');
        if (!response.ok) throw new Error('Failed to fetch products');
        const data = await response.json();
        return data.map((item: any) => ({
            id: Number(item.id),
            name: item.name,
            price: Number(item.price),
            image: item.image
        })) as Product[];
    }
);

const initialState: ProductsState = {
    items: [],
    status: 'idle',
    error: null
};

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setProducts: (state, action: PayloadAction<Product[]>) => {
            state.items = action.payload;
            state.status = 'succeeded';
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Unknown error';
            });
    }
});

export const { setProducts } = productsSlice.actions;
export default productsSlice.reducer;