import { createSlice, createAsyncThunk, isAnyOf } from '@reduxjs/toolkit';
import axios from '../../axios';

export const userLogin = createAsyncThunk(
    'auth/userLogin',
    async (loginInfo, { rejectWithValue }) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            };

            const {
                data: { user, successMessage },
            } = await axios.post('/login', loginInfo, config);

            if (user) {
                localStorage.removeItem('user');
                localStorage.setItem('user', JSON.stringify(user));
            }

            return { user, successMessage };
        } catch ({ data: { errorMessage } }) {
            return rejectWithValue(errorMessage);
        }
    }
);

export const userLogout = createAsyncThunk(
    '/user/userLogout',
    async (_, { rejectWithValue }) => {
        try {
            const {
                data: { successMessage },
            } = await axios.get('/logout');

            localStorage.removeItem('user');

            return { successMessage };
        } catch ({ data: { errorMessage } }) {
            return rejectWithValue(errorMessage);
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        isAuthenticated: false,
        successMessage: null,
        errorMessage: null,
        loading: true,
    },
    reducers: {
        clearSuccessMessage(state) {
            state.successMessage = null;
        },
        clearErrorMessage(state) {
            state.errorMessage = null;
        },
        updateUserLoggedOut(state) {
            state.user = null;
            state.isAuthenticated = false;
            state.successMessage = null;
            state.errorMessage = null;
            state.loading = false;
        },
    },
    extraReducers: builder => {
        builder
            .addCase(userLogin.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.successMessage = payload.successMessage;
                state.isAuthenticated = true;
                state.user = payload.user;
            })
            .addCase(userLogout.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.isAuthenticated = false;
                state.successMessage = payload.successMessage;
                state.user = null;
            })
            .addMatcher(isAnyOf(userLogin.pending), state => {
                state.loading = true;
            })
            .addMatcher(isAnyOf(userLogin.rejected), (state, { payload }) => {
                state.loading = false;
                state.isAuthenticated = false;
                state.errorMessage = payload;
            });
    },
});

export const { clearSuccessMessage, clearErrorMessage, updateUserLoggedOut } =
    authSlice.actions;

export default authSlice.reducer;
