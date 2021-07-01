import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';
import { categoriesSelectors, fetchCategories } from '../categories';

export const fetchProductById = createAsyncThunk(
    'product/fetchProductById',
    async ({ productId }, { dispatch, getState, rejectWithValue }) => {
        try {
            const {
                data: { product, successMessage },
            } = await axios.get(`/product/${productId}`);

            return { product, successMessage };
        } catch ({ data: { errorMessage } }) {
            return rejectWithValue(errorMessage);
        }
    }
);

const productSlice = createSlice({
    name: 'product',
    initialState: {
        productEntity: {},
        categoryPath: [],
        errorMessage: null,
        loading: true,
        successMessage: null,
    },
    reducers: {
        fetchCategoryPath(state, { payload }) {
            state.categoryPath = payload;
        },
        clearSuccessMessage(state) {
            state.successMessage = null;
        },
        clearErrorMessage(state) {
            state.errorMessage = null;
        },
    },
    extraReducers: builder => {
        builder
            .addCase(fetchProductById.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.successMessage = payload.successMessage;
                state.productEntity = payload.product;
            })
            .addCase(fetchProductById.pending, state => {
                state.loading = true;
            })
            .addCase(fetchProductById.rejected, (state, { payload }) => {
                state.loading = false;
                state.errorMessage = payload;
            });
    },
});

export const { clearErrorMessage, clearSuccessMessage, fetchCategoryPath } = productSlice.actions;

export default productSlice.reducer;
