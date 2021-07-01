import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axios from '../../axios';

export const fetchSingleShop = createAsyncThunk(
    'shop/fetchSingleShop',
    async (shopName, { rejectWithValue }) => {
        try {
            const {
                data: { shop, shopProducts, successMessage },
            } = await axios.get(`/shop/${shopName}`);

            return { shop, shopProducts, successMessage };
        } catch ({ data: { errorMessage } }) {
            return rejectWithValue(errorMessage);
        }
    }
);

const shopSlice = createSlice({
    name: 'shop',
    initialState: {
        shop: {},
        shopProducts: [],
        errorMessage: null,
        successMessage: null,
        loading: true,
    },
    reducers: {
        setViewedShopId(state, { payload }) {
            state.shopId = payload;
        },
        clearErrorMessage(state) {
            state.errorMessage = null;
        },
        clearSuccessMessage(state) {
            state.successMessage = null;
        },
    },
    extraReducers: builder => {
        builder
            .addCase(fetchSingleShop.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.successMessage = payload.successMessage;
                state.shop = payload.shop;
                state.shopProducts = payload.shopProducts;
            })
            .addCase(fetchSingleShop.pending, state => {
                state.loading = true;
            })
            .addCase(fetchSingleShop.rejected, (state, { payload }) => {
                state.loading = false;
                state.errorMessage = payload;
            });
    },
});

export const { clearErrorMessage, clearSuccessMessage, setViewedShopId } = shopSlice.actions;

export default shopSlice.reducer;
