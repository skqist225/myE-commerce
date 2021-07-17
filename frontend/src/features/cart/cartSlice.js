import { createSlice, createAsyncThunk, isAnyOf } from '@reduxjs/toolkit';
import axios from '../../axios';

export const fetchUserCart = createAsyncThunk(
    'cart/fetchUserCart',
    async (_, { rejectWithValue }) => {
        try {
            const {
                data: { cart, successMessage },
            } = await axios.get(`/user/cart`);

            return { cart, successMessage };
        } catch ({ data: { errorMessage } }) {
            return rejectWithValue(errorMessage);
        }
    }
);

export const deleteProductInCart = createAsyncThunk(
    'cart/deleteProductInCart',
    async (productId, { dispatch, rejectWithValue }) => {
        try {
            const config = {
                headers: { 'Content-Type': 'application/json' },
            };

            const {
                data: { successMessage },
            } = await axios.put(
                `/user/cart/remove-cart-products`,
                {
                    removedProducts: [productId],
                },
                config
            );
            if (successMessage) {
                dispatch(fetchUserCart());
            }

            return { successMessage };
        } catch ({ data: { errorMessage } }) {
            return rejectWithValue(errorMessage);
        }
    }
);

export const addToCart = createAsyncThunk(
    'cart/addToCart',
    async (cartInfo, { dispatch, getState, rejectWithValue }) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };

            const {
                data: { successMessage },
            } = await axios.post(`/user/cart/add-to-cart`, cartInfo, config);

            if (successMessage) {
                dispatch(fetchUserCart());
            }

            return { successMessage };
        } catch ({ data: { errorMessage } }) {
            return rejectWithValue(errorMessage);
        }
    }
);

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cart: [],
        loading: 'idle',
        errorMessage: null,
        successMessage: null,
        deleteSuccessMessage: null,
    },
    reducers: {
        clearSuccessMessage(state) {
            state.successMessage = null;
        },
        clearErrorMessage(state) {
            state.errorMessage = null;
        },
    },
    extraReducers: builder => {
        builder
            .addCase(addToCart.fulfilled, (state, { payload }) => {
                state.loading = 'idle';
                state.successMessage = payload.successMessage;
                // state.cart = payload.cart;
            })
            .addCase(fetchUserCart.fulfilled, (state, { payload }) => {
                state.loading = 'idle';
                state.successMessage = payload.successMessage;
                state.cart = payload.cart;
            })
            .addCase(deleteProductInCart.fulfilled, (state, { payload }) => {
                state.loading = 'idle';
                state.deleteSuccessMessage = payload.successMessage;
            })
            .addMatcher(isAnyOf(addToCart.pending, fetchUserCart.pending), state => {
                state.loading = 'pending';
            })
            .addMatcher(
                isAnyOf(addToCart.rejected, fetchUserCart.rejected),
                (state, { payload }) => {
                    state.loading = 'idle';
                    state.errorMessage = payload;
                }
            );
    },
});

export const { clearErrorMessage, clearSuccessMessage } = cartSlice.actions;

export default cartSlice.reducer;
