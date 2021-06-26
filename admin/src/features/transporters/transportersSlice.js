import {
    createEntityAdapter,
    createAsyncThunk,
    createSlice,
    isAnyOf,
} from '@reduxjs/toolkit';

import axios from '../../axios';

const transportersAdapter = createEntityAdapter({
    selectId: ({ _id }) => _id,
});

export const fetchTransporters = createAsyncThunk(
    'transporters/fetchTransporters',
    async (_, { rejectWithValue }) => {
        try {
            const {
                data: { transporters },
            } = await axios.get('/transporters');

            return transporters;
        } catch ({ data: { errorMessage } }) {
            return rejectWithValue(errorMessage);
        }
    }
);

export const addTransporter = createAsyncThunk(
    'transporters/addTransporter',
    async (_transporter, { rejectWithValue }) => {
        const options = {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        };
        try {
            const {
                data: { transporter, successMessage },
            } = await axios.post(
                '/admin/transporter/add?dest=transporter',
                _transporter,
                options
            );

            return { transporter, successMessage };
        } catch ({ data: { errorMessage } }) {
            return rejectWithValue(errorMessage);
        }
    }
);

const transportersSlice = createSlice({
    name: 'transporters',
    initialState: transportersAdapter.getInitialState({
        loading: false,
        successMessages: null,
        errorMessage: null,
    }),
    reducers: {
        clearErrorMessage(state) {
            state.errorMessage = null;
        },
    },
    extraReducers: builder => {
        builder
            .addCase(fetchTransporters.pending, (state, { payload }) => {
                state.loading = true;
            })
            .addCase(addTransporter.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.successMessages = payload.successMessage;
                transportersAdapter.addOne(state, payload.transporter);
            })
            .addCase(fetchTransporters.fulfilled, (state, { payload }) => {
                state.loading = false;
                transportersAdapter.setAll(state, payload);
            })
            .addMatcher(
                isAnyOf(fetchTransporters.rejected, addTransporter.rejected),
                (state, { payload }) => {
                    state.loading = false;
                    state.errorMessage = payload;
                }
            );
    },
});

export const { clearErrorMessage } = transportersSlice.actions;

export const transportersSelector = transportersAdapter.getSelectors(
    state => state.transporters
);

export default transportersSlice.reducer;
