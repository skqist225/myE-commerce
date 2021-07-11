import { createEntityAdapter, createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';

import axios from '../../axios';

const transportersAdapter = createEntityAdapter({
    selectId: ({ _id }) => _id,
});

export const fetchTransporters = createAsyncThunk(
    'transporters/fetchTransporters',
    async (_, { rejectWithValue }) => {
        try {
            const {
                data: { transporters, successMessage },
            } = await axios.get('/transporters');

            return { transporters, successMessage };
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
            } = await axios.post('/admin/transporter/add?dest=transporter', _transporter, options);

            return { transporter, successMessage };
        } catch ({ data: { errorMessage } }) {
            return rejectWithValue(errorMessage);
        }
    }
);

export const patchTransporter = createAsyncThunk(
    'transporters/patchTransporter',
    async ({ transporterId, transporterChanges }, { rejectWithValue }) => {
        try {
            const {
                data: { updatedTransporter, successMessage },
            } = await axios.put(`/admin/transporter/${transporterId}`, transporterChanges);

            return { updatedTransporter, successMessage };
        } catch ({ data: { errorMessage } }) {
            return rejectWithValue(errorMessage);
        }
    }
);

const transportersSlice = createSlice({
    name: 'transporters',
    initialState: transportersAdapter.getInitialState({
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
            .addCase(addTransporter.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.successMessage = payload.successMessage;
                transportersAdapter.addOne(state, payload.transporter);
            })
            .addCase(
                patchTransporter.fulfilled,
                (state, { payload: { updatedTransporter, successMessage } }) => {
                    state.loading = false;
                    state.successMessage = successMessage;
                    transportersAdapter.updateOne(state, {
                        id: updatedTransporter._id,
                        changes: { updatedTransporter },
                    });
                }
            )
            .addCase(fetchTransporters.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.successMessage = payload.successMessage;
                transportersAdapter.setAll(state, payload.transporters);
            })
            .addMatcher(isAnyOf(patchTransporter.pending, fetchTransporters.pending), state => {
                state.loading = true;
            })
            .addMatcher(
                isAnyOf(
                    fetchTransporters.rejected,
                    addTransporter.rejected,
                    patchTransporter.rejected
                ),
                (state, { payload }) => {
                    state.loading = false;
                    state.errorMessage = payload;
                }
            );
    },
});

export const { clearErrorMessage, clearSuccessMessage } = transportersSlice.actions;

export const transportersSelector = transportersAdapter.getSelectors(state => state.transporters);

export default transportersSlice.reducer;
