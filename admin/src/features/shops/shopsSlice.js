import { createSlice, createEntityAdapter, createAsyncThunk, isAnyOf } from '@reduxjs/toolkit';
import { changeIsShopRequestSentStatus } from '../../features/users';
import axios from '../../axios';

const shopsAdapter = createEntityAdapter({
    selectId: ({ _id }) => _id,
});

export const fetchShops = createAsyncThunk('/shops/fetchShops', async (_, { rejectWithValue }) => {
    try {
        const {
            data: { shops, successMessage },
        } = await axios.get('/admin/shops');

        return { shops, successMessage };
    } catch ({ data: { errorMessage } }) {
        return rejectWithValue(errorMessage);
    }
});

export const addShop = createAsyncThunk('shops/addShop', async (_shop, { rejectWithValue }) => {
    try {
        const {
            data: { shop, successMessage },
        } = await axios.post('/shop/add?dest=shop', _shop);

        return { shop, successMessage };
    } catch ({ data: { errorMessage } }) {
        return rejectWithValue(errorMessage);
    }
});

export const deleteShop = createAsyncThunk(
    'shops/deleteShop',
    async (shopId, { rejectWithValue }) => {
        try {
            const {
                data: { successMessage },
            } = await axios.delete(`shop/${shopId}`);

            return { shopId, successMessage };
        } catch ({ data: { errorMessage } }) {
            return rejectWithValue(errorMessage);
        }
    }
);

export const patchShop = createAsyncThunk(
    'shops/patchShop',
    async ({ shopId, shopChanges }, { rejectWithValue }) => {
        try {
            const {
                data: { updatedShop, successMessage },
            } = await axios.put(`shop/${shopId}?dest=shop`, shopChanges);

            return { updatedShop, successMessage };
        } catch ({ data: { errorMessage } }) {
            return rejectWithValue(errorMessage);
        }
    }
);

export const approveShop = createAsyncThunk(
    'shop/approveShop',
    async (shopId, { rejectWithValue }) => {
        try {
            const {
                data: { successMessage },
            } = await axios.post(`/admin/approve-shop/${shopId}`);

            return { shopId, successMessage };
        } catch ({ data: { errorMessage } }) {
            return rejectWithValue(errorMessage);
        }
    }
);

export const cancelShopRequest = createAsyncThunk(
    'shop/cancelShopRequest',
    async (shopId, { dispatch, rejectWithValue }) => {
        try {
            const {
                data: {
                    shop: { user },
                    cancelMessage,
                },
            } = await axios.post(`/admin/delete-request/${shopId}`);

            dispatch(changeIsShopRequestSentStatus(user));
            dispatch(deleteShop(shopId));

            return { cancelMessage };
        } catch ({ data: { errorMessage } }) {
            return rejectWithValue(errorMessage);
        }
    }
);

const shopsSlice = createSlice({
    name: 'shops',
    initialState: shopsAdapter.getInitialState({
        loading: false,
        successMessage: null,
        cancelMessage: null,
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
            .addCase(fetchShops.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.successMessage = payload.successMessage;
                shopsAdapter.setAll(state, payload.shops);
            })
            .addCase(addShop.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.successMessage = payload.successMessage;
                shopsAdapter.addOne(state, payload.shop);
            })
            .addCase(approveShop.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.successMessage = payload.successMessage;
                shopsAdapter.updateOne(state, {
                    id: payload.shopId,
                    changes: { isApproved: true },
                });
            })
            .addCase(deleteShop.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.successMessage = payload.successMessage;
                shopsAdapter.removeOne(state, payload.shopId);
            })
            .addCase(cancelShopRequest.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.cancelMessage = payload.cancelMessage;
            })
            .addCase(patchShop.fulfilled, (state, { payload: { updatedShop, successMessage } }) => {
                state.loading = false;
                state.successMessage = successMessage;
                shopsAdapter.updateOne(state, { id: updatedShop._id, changes: { updatedShop } });
            })
            .addMatcher(
                isAnyOf(
                    fetchShops.pending,
                    addShop.pending,
                    approveShop.pending,
                    cancelShopRequest.pending,
                    deleteShop.pending
                ),
                state => {
                    state.loading = true;
                }
            )
            .addMatcher(
                isAnyOf(
                    fetchShops.rejected,
                    addShop.rejected,
                    approveShop.rejected,
                    cancelShopRequest.rejected,
                    deleteShop.rejected
                ),
                (state, { payload }) => {
                    state.loading = false;
                    state.errorMessage = payload;
                }
            );
    },
});

export const { clearSuccessMessage, clearErrorMessage } = shopsSlice.actions;

export const shopsSelectors = shopsAdapter.getSelectors(state => state.shops);

export default shopsSlice.reducer;
