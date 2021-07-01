import { createSlice, createAsyncThunk, isAnyOf } from '@reduxjs/toolkit';
import axios from '../../axios';

export const userLogin = createAsyncThunk(
    '/user/userLogin',
    async (loginInfo, { dispatch, rejectWithValue }) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        };
        dispatch(clearErrorMessage());

        try {
            const {
                data: { user },
            } = await axios.post('/login', loginInfo, config);

            if (user.role === 'admin') {
                localStorage.setItem('user', JSON.stringify(user));
                return user;
            } else {
                const errorMessage = `Role(${user.role}) do not have access to this resource.`;

                return rejectWithValue(errorMessage);
            }
        } catch ({ data: { errorMessage } }) {
            return rejectWithValue(errorMessage);
        }
    }
);

export const userLogout = createAsyncThunk('/user/userLogout', async () => {
    const { data } = await axios.get('/logout');

    return { data };
});

export const userRegister = createAsyncThunk('/user/userRegister', async registerInfo => {
    const { data } = await axios.post('/register', registerInfo);

    return { data };
});

const authSlice = createSlice({
    name: 'user',
    initialState: {
        user: {},
        isAuthenticated: false,
        loading: false,
        errorMessage: null,
    },
    reducers: {
        clearErrorMessage(state) {
            state.errorMessage = null;
        },
    },
    extraReducers: builder => {
        builder
            .addCase(userLogin.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.user = payload;
            })
            .addCase(userLogout.fulfilled, state => {
                state.loading = false;
                state.isAuthenticated = false;
                state.user = null;
            })
            .addCase(userRegister.fulfilled, (state, { payload: { data: user } }) => {
                state.loading = false;
                state.user = user;
            })
            .addCase(userLogout.rejected, (state, { payload }) => {
                state.loading = false;
                state.errorMessage = payload.data.error;
            })
            .addMatcher(
                isAnyOf(userLogin.pending, userLogout.pending, userRegister.pending),
                state => {
                    state.loading = true;
                    state.isAuthenticated = false;
                }
            )
            .addMatcher(
                isAnyOf(userLogin.rejected, userRegister.rejected, userLogout.rejected),
                (state, { payload }) => {
                    console.log(payload);

                    state.loading = false;
                    state.isAuthenticated = false;
                    state.user = null;
                    state.errorMessage = payload;
                }
            );
    },
});

export const { clearErrorMessage, getLoggingInAdminInfo } = authSlice.actions;

export default authSlice.reducer;
