import {
    createEntityAdapter,
    createSlice,
    createAsyncThunk,
    isAnyOf,
} from '@reduxjs/toolkit';
import axios from '../../axios';

export const fetchCategories = createAsyncThunk(
    'categories/fetchCategories',
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

export const addCategory = createAsyncThunk(
    'categories/addCategory',
    async (_category, { rejectWithValue }) => {
        const options = {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        };

        try {
            const {
                data: { category, successMessage },
            } = await axios.post(
                '/category/add?dest=category',
                _category,
                options
            );

            return { category, successMessage };
        } catch ({ data: { errorMessage } }) {
            return rejectWithValue(errorMessage);
        }
    }
);

const categoriesAdapter = createEntityAdapter({
    selectId: ({ _id }) => _id,
});

const categoriesSlice = createSlice({
    name: 'categories',
    initialState: categoriesAdapter.getInitialState({
        loading: false,
        errorMessage: null,
        successMessage: null,
    }),
    reducers: {
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
            .addCase(addCategory.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.successMessage = payload.successMessage;
                categoriesAdapter.addOne(state, payload.category);
            })
            .addMatcher(isAnyOf(fetchCategories.pending), state => {
                state.loading = true;
            })
            .addMatcher(
                isAnyOf(fetchCategories.rejected),
                (state, { payload }) => {
                    state.loading = false;
                    state.errorMessage = payload;
                }
            );
    },
});

export const { clearErrorMessage } = categoriesSlice.actions;

export const categoriesSelectors = categoriesAdapter.getSelectors(
    state => state.categories
);

export default categoriesSlice.reducer;
