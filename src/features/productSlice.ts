import { createAsyncThunk, createSlice, createSelector, PayloadAction } from '@reduxjs/toolkit';

import * as ProductService from '../services/product';
import { RootState } from "../app/store";

export type Product = {
    id: string;
    name: string;
    stocked: boolean;
}

interface ProductState {
    products: Product[];
    loading: {
        retrieve: boolean;
    };
    errors: {
        retrieve: string | null;
    }
}

const initialState: ProductState = {
    products: [],
    loading: {
        retrieve: false,
    },
    errors: {
        retrieve: null,
    }
};

export const retrieveProductsAsync = createAsyncThunk(
    'product/retrieveAll',
    async () => {
        return await ProductService.retrieveAll();
    }
);

export const updateProductAsync = createAsyncThunk(
    'product/update',
    async (product: Product) => {
        return await ProductService.update(product);
    }
);

export const removeProductAsync = createAsyncThunk(
    'product/remove',
    async (product: Product) => {
        return await ProductService.remove(product);
    }
);

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        addProduct: (state, action: PayloadAction<Product>) => {
            state.products.push(action.payload);
        },
        removeProduct: (state, action: PayloadAction<Product>) => {
            state.products = state.products.filter(product => product.id !== action.payload.id);
        },
        updateProduct: (state, action: PayloadAction<Product>) => {
            state.products = state.products.map(
                product => product.id === action.payload.id ? action.payload : product
            );
        }
    },
    extraReducers: builder => {
        builder.addCase(
            retrieveProductsAsync.fulfilled,
            (state, action: PayloadAction<Product[]>) => {
                state.products = action.payload;
                state.loading.retrieve = false;
            }
        );

        builder.addCase(
            retrieveProductsAsync.pending,
            state => {
                state.loading.retrieve = true
            }
        );

        builder.addCase(
            retrieveProductsAsync.rejected,
            state => {
                state.loading.retrieve = false;
                state.errors.retrieve = 'Something went wrong!';
            }
        );

        builder.addCase(
            updateProductAsync.fulfilled,
            (state, action: PayloadAction<Product>) => {
                const product = action.payload;

                state.products = state.products.map(
                    existing => existing.id === product.id ? product : existing
                );
            }
        );

        builder.addCase(
            removeProductAsync.fulfilled,
            (state, action: PayloadAction<Product>) => {
                const product = action.payload;

                state.products = state.products.filter(
                    existing => existing.id !== product.id
                );
            }
        );
    }
});

export const { addProduct, removeProduct, updateProduct } = productSlice.actions;

export default productSlice.reducer;

const selectProductSlice = (state: RootState) => state.product;

export const selectAllProducts = createSelector(
    [selectProductSlice],
    (state: ProductState) => state.products
);

export const selectStockedProducts = createSelector(
    [selectAllProducts],
    (products: Product[]) => products.filter(product => product.stocked)
);

export const selectNeededProducts = createSelector(
    [selectAllProducts],
    (products: Product[]) => products.filter(product => !product.stocked)
);

