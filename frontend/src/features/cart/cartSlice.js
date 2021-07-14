import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';
import { categoriesSelectors, fetchCategories } from '../categories';

export const addToCart = createAsyncThunk(
    'cart/addToCart',
    async (cartInfo, { dispatch, getState, rejectWithValue }) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };
            console.log(cartInfo);

            const {
                data: { cart, successMessage },
            } = await axios.post(`/user/cart/add-to-cart`, cartInfo, config);

            return { cart, successMessage };
        } catch ({ data: { errorMessage } }) {
            return rejectWithValue(errorMessage);
        }
    }
);

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cart: {},
        loading: 'idle',
        errorMessage: null,
        successMessage: null,
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
                state.cart = payload.cart;
            })
            .addCase(addToCart.pending, state => {
                state.loading = 'pending';
            })
            .addCase(addToCart.rejected, (state, { payload }) => {
                state.loading = 'idle';
                state.errorMessage = payload;
            });
    },
});

export const { clearErrorMessage, clearSuccessMessage } = cartSlice.actions;

export default cartSlice.reducer;
