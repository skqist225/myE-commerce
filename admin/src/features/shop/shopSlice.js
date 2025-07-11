import { createSlice, createAsyncThunk, isAnyOf } from '@reduxjs/toolkit';

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

export const fetchShopById = createAsyncThunk(
    '/shop/fetchShopById',
    async (shopId, { rejectWithValue }) => {
        try {
            const {
                data: { shop, shopProducts, successMessage },
            } = await axios.get(`/shop/${shopId}/search`);

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
        selectedTab: 1,
        errorMessage: null,
        successMessage: null,
        loading: true,
    },
    reducers: {
        setSelectedTab(state, { payload }) {
            state.selectedTab = payload;
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
            .addMatcher(isAnyOf(fetchSingleShop.pending, fetchShopById.pending), state => {
                state.loading = true;
            })
            .addMatcher(
                isAnyOf(fetchSingleShop.rejected, fetchShopById.rejected),
                (state, { payload }) => {
                    state.loading = false;
                    state.errorMessage = payload;
                }
            )
            .addMatcher(
                isAnyOf(fetchSingleShop.fulfilled, fetchShopById.fulfilled),
                (state, { payload }) => {
                    state.loading = false;
                    state.successMessage = payload.successMessage;
                    state.shop = payload.shop;
                    state.shopProducts = payload.shopProducts;
                }
            );
    },
});

export const { clearErrorMessage, clearSuccessMessage, setSelectedTab } = shopSlice.actions;

export default shopSlice.reducer;
