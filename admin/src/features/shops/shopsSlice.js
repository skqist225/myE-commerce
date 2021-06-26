import {
    createSlice,
    createEntityAdapter,
    createAsyncThunk,
    isAnyOf,
} from '@reduxjs/toolkit';
import axios from '../../axios';

const shopsAdapter = createEntityAdapter({
    selectId: ({ _id }) => _id,
});

export const fetchShops = createAsyncThunk('/shops/fetchShops', async () => {
    const { data } = await axios.get('/shops');

    return { data };
});

const shopsSlice = createSlice({
    name: 'shops',
    initialState: shopsAdapter.getInitialState({
        loading: false,
        errorMessage: null,
    }),
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchShops.fulfilled, (state, { payload: { data } }) => {
                state.loading = false;
                shopsAdapter.setAll(state, data);
            })
            .addMatcher(isAnyOf(fetchShops.pending), state => {
                state.loading = true;
            })
            .addMatcher(isAnyOf(fetchShops.rejected), (state, { payload }) => {
                state.loading = true;
                state.errorMessage = payload.error;
            });
    },
});

export const shopsSelectors = shopsAdapter.getSelectors(state => state.shops);

export default shopsSlice.reducer;
