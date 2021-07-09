import { createSlice, createAsyncThunk, createEntityAdapter, isAnyOf } from '@reduxjs/toolkit';

import axios from '../../axios';

const namespace = 'categories';

export const fetchCategories = createAsyncThunk(
    `${namespace}/fetchCategories`,
    async (_, { rejectWithValue }) => {
        try {
            const {
                data: { categories, successMessage },
            } = await axios.get('/categories');

            return { categories, successMessage };
        } catch ({ data: { errorMessage } }) {
            return rejectWithValue(errorMessage);
        }
    }
);

const categoriesAdapter = createEntityAdapter({
    selectId: ({ _id }) => _id,
});

const categoriesSlice = createSlice({
    name: namespace,
    initialState: categoriesAdapter.getInitialState({
        loading: true,
        errorMessage: null,
        successMessage: null,
    }),
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
            .addCase(fetchCategories.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.successMessage = payload.successMessage;
                categoriesAdapter.setAll(state, payload.categories);
            })
            .addMatcher(isAnyOf(fetchCategories.pending), state => {
                state.loading = true;
            })
            .addMatcher(isAnyOf(fetchCategories.rejected), (state, { payload }) => {
                state.loading = false;
                state.errorMessage = payload;
            });
    },
});

export const { clearErrorMessage, clearSuccessMessage } = categoriesSlice.actions;

export const categoriesSelectors = categoriesAdapter.getSelectors(state => state.categories);

export default categoriesSlice.reducer;
