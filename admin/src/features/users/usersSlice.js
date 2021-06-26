import {
    createSlice,
    createAsyncThunk,
    createEntityAdapter,
    isAnyOf,
} from '@reduxjs/toolkit';
import axios from '../../axios';

const usersAdapter = createEntityAdapter({
    selectId: ({ _id }) => _id,
});

export const fetchUsers = createAsyncThunk(
    '/users/fetchUsers',
    async (_, { rejectWithValue }) => {
        try {
            const {
                data: { users },
            } = await axios.get('/admin/users');

            return users;
        } catch ({
            error: {
                response: {
                    data: { errorMessage },
                },
            },
        }) {
            return rejectWithValue(errorMessage);
        }
    }
);

const usersSlice = createSlice({
    name: 'users',
    initialState: usersAdapter.getInitialState({
        loading: false,
        errorMessage: null,
    }),
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchUsers.fulfilled, (state, { payload }) => {
                state.loading = true;
                usersAdapter.setAll(state, payload);
            })
            .addMatcher(isAnyOf(fetchUsers.pending), state => {
                state.loading = false;
            })
            .addMatcher(isAnyOf(fetchUsers.rejected), (state, { payload }) => {
                state.loading = false;
                state.errorMessage = payload;
            });
    },
});

export const usersSelectors = usersAdapter.getSelectors(state => state.users);

export default usersSlice.reducer;
