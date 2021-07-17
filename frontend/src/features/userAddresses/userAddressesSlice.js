import { createEntityAdapter, createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import axios from '../../axios';

const userAddressesAdapter = createEntityAdapter({
    selectId: ({ _id }) => _id,
});

export const fetchUserAddresses = createAsyncThunk(
    'userAddresses/fetchUserAddresses',
    async (_, { rejectWithValue }) => {
        try {
            const {
                data: { userAddresses, successMessage },
            } = await axios.get('/user/addresses');

            return { userAddresses, successMessage };
        } catch ({ data: { errorMessage } }) {
            return rejectWithValue(errorMessage);
        }
    }
);

const userAddressSlice = createSlice({
    name: 'userAddresses',
    initialState: userAddressesAdapter.getInitialState({
        loading: false,
        userInfo: undefined,
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
            .addCase(fetchUserAddresses.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.successMessage = payload.successMessage;
                state.userInfo = payload.userAddresses.user;
                userAddressesAdapter.setAll(state, payload.userAddresses.shippingInfo);
            })
            .addMatcher(isAnyOf(fetchUserAddresses.pending), state => {
                state.loading = true;
            })
            .addMatcher(isAnyOf(fetchUserAddresses.rejected), (state, { payload }) => {
                state.loading = false;
                state.errorMessage = payload;
            });
    },
});

export const { clearErrorMessage, clearSuccessMessage } = userAddressSlice.actions;

export const userAddressesSelector = userAddressesAdapter.getSelectors(
    state => state.userAddresses
);

export default userAddressSlice.reducer;
