import { createSlice, createAsyncThunk, createEntityAdapter, isAnyOf } from '@reduxjs/toolkit';
import axios from '../../axios';

const ordersAdapter = createEntityAdapter({
    selectId: ({ _id }) => _id,
});

export const addOrder = createAsyncThunk(
    'orders/addOrder',
    async (ordersArray, { rejectWithValue }) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };

            const {
                data: { order, successMessage },
            } = await axios.post(`/order/add`, ordersArray, config);

            return { order, successMessage };
        } catch ({ data: { errorMessage } }) {
            return rejectWithValue(errorMessage);
        }
    }
);

export const fetchUserOrders = createAsyncThunk(
    'orders/fetchUserOrders',
    async (_, { rejectWithValue }) => {
        try {
            const {
                data: { orders, successMessage },
            } = await axios.get(`/user/orders`);

            return { orders, successMessage };
        } catch ({ data: { errorMessage } }) {
            return rejectWithValue(errorMessage);
        }
    }
);

const ordersSlice = createSlice({
    name: 'orders',
    initialState: ordersAdapter.getInitialState({
        loading: 'idle',
        addOrderSuccess: null,
        errorMessage: null,
    }),
    reducers: {
        clearSuccessMessage(state) {
            state.addOrderSuccess = null;
        },
        clearErrorMessage(state) {
            state.errorMessage = null;
        },
    },
    extraReducers: builder => {
        builder
            .addCase(fetchUserOrders.fulfilled, (state, { payload }) => {
                state.loading = 'idle';
                state.addOrderSuccess = payload.successMessage;
                ordersAdapter.setAll(state, payload.orders);
            })
            .addCase(addOrder.fulfilled, (state, { payload }) => {
                state.loading = 'idle';
                state.addOrderSuccess = payload.successMessage;
                ordersAdapter.addOne(state, payload.order);
            })

            .addMatcher(isAnyOf(fetchUserOrders.pending, addOrder.pending), state => {
                state.loading = 'pending';
            })
            .addMatcher(
                isAnyOf(fetchUserOrders.rejected, addOrder.rejected),
                (state, { payload }) => {
                    state.loading = 'idle';
                    state.errorMessage = payload;
                }
            );
    },
});

export const { clearSuccessMessage, clearErrorMessage } = ordersSlice.actions;

export const ordersSelector = ordersAdapter.getSelectors(state => state.orders);

export default ordersSlice.reducer;
