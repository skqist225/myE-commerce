import { createSlice, createAsyncThunk, isAnyOf } from '@reduxjs/toolkit';
import getObjectSize from '../../helpers/getObjectSize';

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

export const getProductsByFilter = createAsyncThunk(
    'shop/getProductsByFilter',
    async (filter, { rejectWithValue }) => {
        try {
            let queryPineLine = `/advanced/${filter.shopId}/products?`;
            delete filter['shopId'];
            const filterSize = getObjectSize(filter);

            Object.keys(filter).forEach((key, index) => {
                if (key === 'transportersFilter' && filter['transportersFilter'].size > 0) {
                    const transporters = [...filter['transportersFilter']].join(',');

                    if (index + 1 < filterSize) {
                        queryPineLine += `transporters=${transporters}&`;
                    } else {
                        queryPineLine += `transporters=${transporters}`;
                    }
                } else if (key === 'categoriesFilter' && filter['categoriesFilter'].size > 0) {
                    const categories = [...filter['categoriesFilter']].join(',');

                    if (index + 1 < filterSize) {
                        queryPineLine += `categories=${categories}&`;
                    } else {
                        queryPineLine += `transporters=${categories}`;
                    }
                } else if (key !== 'transportersFilter' && key !== 'categoriesFilter') {
                    if (index + 1 < filterSize) {
                        queryPineLine += `${key}=${filter[key]}&`;
                    } else {
                        queryPineLine += `${key}=${filter[key]}`;
                    }
                }
            });

            console.log(queryPineLine);

            const {
                data: { products, successMessage },
            } = await axios.get(queryPineLine);

            return { products, successMessage };
        } catch ({ data: { errorMessage } }) {
            return rejectWithValue(errorMessage);
        }
    }
);

export const fetchShopById = createAsyncThunk(
    'shop/fetchShopById',
    async (shopId, { rejectWithValue }) => {
        try {
            const {
                data: {
                    shopAndProducts: { shop, shopProducts },
                    successMessage,
                },
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
        shop: null,
        shopProducts: [],
        filterProducts: [],
        selectedTab: 1,
        errorMessage: null,
        successMessage: null,
        loading: false,
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
            .addCase(fetchShopById.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.successMessage = payload.successMessage;
                state.shop = payload.shop;
                state.shopProducts = payload.shopProducts;
            })
            .addCase(getProductsByFilter.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.shopProducts = payload.products;
                state.successMessage = payload.successMessage;
            })
            .addMatcher(
                isAnyOf(
                    fetchSingleShop.pending,
                    fetchShopById.pending,
                    getProductsByFilter.pending
                ),
                state => {
                    state.loading = true;
                }
            )
            .addMatcher(
                isAnyOf(
                    fetchSingleShop.rejected,
                    fetchShopById.rejected,
                    getProductsByFilter.rejected
                ),
                (state, { payload }) => {
                    state.loading = false;
                    state.errorMessage = payload;
                }
            )
            .addMatcher(isAnyOf(fetchSingleShop.fulfilled), (state, { payload }) => {
                state.loading = false;
                state.successMessage = payload.successMessage;
                state.shop = payload.shop;
                state.shopProducts = payload.shopProducts;
            });
    },
});

export const { clearErrorMessage, clearSuccessMessage, setSelectedTab } = shopSlice.actions;

export default shopSlice.reducer;
