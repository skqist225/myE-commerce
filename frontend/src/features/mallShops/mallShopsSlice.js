import { createSlice, createEntityAdapter, createAsyncThunk, isAnyOf } from '@reduxjs/toolkit';
import axios from '../../axios';

const mallShopsAdapter = createEntityAdapter({
    selectId: ({ _id }) => _id,
});

const namespace = 'mallShops';

export const fetchMallShops = createAsyncThunk(
    `/${namespace}/fetchMallShops`,
    async (shopCategory, { rejectWithValue }) => {
        try {
            const {
                data: { shops, successMessage },
            } = await axios.get(`/shop/shopCategory/${shopCategory}`);

            return { shops, successMessage };
        } catch ({ data: { errorMessage } }) {
            return rejectWithValue(errorMessage);
        }
    }
);

const mallShopsSlice = createSlice({
    name: namespace,
    initialState: mallShopsAdapter.getInitialState({
        loading: false,
        successMessage: null,
        errorMessage: null,
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
            .addCase(fetchMallShops.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.successMessage = payload.successMessage;
                mallShopsAdapter.setAll(state, payload.shops);
            })
            .addMatcher(isAnyOf(fetchMallShops.pending), state => {
                state.loading = true;
            })
            .addMatcher(isAnyOf(fetchMallShops.rejected), (state, { payload }) => {
                state.loading = false;
                state.errorMessage = payload;
            });
    },
});

export const { clearSuccessMessage, clearErrorMessage } = mallShopsSlice.actions;

export const mallShopsSelectors = mallShopsAdapter.getSelectors(state => state.mallShops);

export default mallShopsSlice.reducer;
