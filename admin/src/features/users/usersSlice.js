import { createSlice, createAsyncThunk, createEntityAdapter, isAnyOf } from '@reduxjs/toolkit';
import axios from '../../axios';

const usersAdapter = createEntityAdapter({
    selectId: ({ _id }) => _id,
});

export const fetchUsers = createAsyncThunk('/users/fetchUsers', async (_, { rejectWithValue }) => {
    try {
        const {
            data: { users, successMessage },
        } = await axios.get('/admin/users');

        return { users, successMessage };
    } catch ({ data: { errorMessage } }) {
        return rejectWithValue(errorMessage);
    }
});

const usersSlice = createSlice({
    name: 'users',
    initialState: usersAdapter.getInitialState({
        loading: false,
        successMessage: null,
        errorMessage: null,
    }),
    reducers: {
        changeIsShopRequestSentStatus(state, { payload }) {
            usersAdapter.updateOne(state, { id: payload, changes: { isShopRequestSent: false } });
        },
    },
    extraReducers: builder => {
        builder
            .addCase(fetchUsers.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.successMessage = payload.successMessage;
                usersAdapter.setAll(state, payload.users);
            })
            .addMatcher(isAnyOf(fetchUsers.pending), state => {
                state.loading = true;
            })
            .addMatcher(isAnyOf(fetchUsers.rejected), (state, { payload }) => {
                state.loading = false;
                state.errorMessage = payload;
            });
    },
});

export const { changeIsShopRequestSentStatus } = usersSlice.actions;

export const usersSelectors = usersAdapter.getSelectors(state => state.users);

export default usersSlice.reducer;
