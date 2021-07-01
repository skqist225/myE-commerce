import { createSlice, createAsyncThunk, createEntityAdapter, isAnyOf } from '@reduxjs/toolkit';
import axios from '../../axios';

export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async (_, { rejectWithValue }) => {
        try {
            const {
                data: { products, successMessage },
            } = await axios.get('/products');

            const mappedData = products.map(product => ({
                ...product,
                productTypes: product.productTypes.map(productType => ({
                    ...productType,
                    productId: product._id,
                })),
            }));

            const productTypes = mappedData.reduce((prev, cur) => [...prev, cur.productTypes], []);

            const _products = mappedData.map(product => ({
                ...product,
                productTypes: product.productTypes.map(productType => productType._id),
            }));

            return {
                products: _products,
                successMessage,
                productTypes: productTypes.flat(),
            };
        } catch ({ data: { errorMessage } }) {
            return rejectWithValue(errorMessage);
        }
    }
);

export const addProduct = createAsyncThunk(
    'products/addProduct',
    async (_product, { dispatch, rejectWithValue }) => {
        try {
            const {
                data: { product, successMessage },
            } = await axios.post('/shop/product/add?dest=product', _product);

            return { product, successMessage };
        } catch ({ data: { errorMessage } }) {
            return rejectWithValue(errorMessage);
        }
    }
);

export const deleteProduct = createAsyncThunk(
    'products/deleteProduct',
    async (productId, { rejectWithValue }) => {
        try {
            const {
                data: { successMessage },
            } = await axios.delete(`/shop/product/${productId}`);

            return { productId, successMessage };
        } catch ({ data: { errorMessage } }) {
            return rejectWithValue(errorMessage);
        }
    }
);

export const patchProduct = createAsyncThunk(
    'products/patchProduct',
    async ({ productId, productBody }) => {
        // await axiosInstance.patch(`product/${productId}`, productBody);

        return { productId, changes: productBody };
    }
);
const productsAdapter = createEntityAdapter({
    selectId: ({ _id }) => _id,
});

const productTypesAdapter = createEntityAdapter({ selectId: ({ _id }) => _id });

const productsSlice = createSlice({
    name: 'products',
    initialState: productsAdapter.getInitialState({
        productTypes: productTypesAdapter.getInitialState(),
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
            .addCase(fetchProducts.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.successMessage = payload.successMessage;
                productsAdapter.setAll(state, payload.products);
                productTypesAdapter.setAll(state.productTypes, payload.productTypes);
            })
            .addCase(addProduct.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.successMessage = payload.successMessage;
                productsAdapter.addOne(state, payload.product);
            })
            .addCase(deleteProduct.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.successMessage = payload.successMessage;
                productsAdapter.removeOne(state, payload.productId);
            })
            .addCase(patchProduct.fulfilled, (state, { payload: { productId, changes } }) => {
                state.loading = false;
                productsAdapter.updateOne(state, {
                    id: productId,
                    changes,
                });
            })
            .addMatcher(
                isAnyOf(fetchProducts.pending, deleteProduct.pending, patchProduct.pending),
                state => {
                    state.loading = true;
                }
            )
            .addMatcher(
                isAnyOf(
                    fetchProducts.rejected,
                    deleteProduct.rejected,
                    patchProduct.rejected,
                    addProduct.rejected
                ),
                (state, { payload }) => {
                    state.loading = false;
                    state.errorMessage = payload;
                }
            );
    },
});

export const { clearErrorMessage, clearSuccessMessage } = productsSlice.actions;

export const productsSelectors = productsAdapter.getSelectors(state => state.products);

export const productTypesSelectors = productTypesAdapter.getSelectors(
    state => state.products.productTypes
);

export default productsSlice.reducer;
