import { createSlice, createAsyncThunk, createEntityAdapter, isAnyOf } from '@reduxjs/toolkit';
import axios from '../../axios';

const productReviewsAdapter = createEntityAdapter({
    selectId: ({ _id }) => _id,
});

export const fetchProductReviews = createAsyncThunk(
    'product/fetchProductReviews',
    async (productId, { rejectWithValue }) => {
        try {
            const {
                data: { ratingsPerStar, reviews, successMessage },
            } = await axios.get(`/product/reviews/${productId}`);

            return { ratingsPerStar, reviews, successMessage };
        } catch ({ data: { errorMessage } }) {
            return rejectWithValue(errorMessage);
        }
    }
);

export const likeReview = createAsyncThunk(
    'product/likeReview',
    async ([reviewId, amount], { rejectWithValue }) => {
        try {
            const config = {
                headers: { 'Content-Type': 'application/json' },
            };

            const {
                data: { successMessage, review },
            } = await axios.put(`/review/${reviewId}`, { amount }, config);

            return { successMessage, review };
        } catch ({ data: { errorMessage } }) {
            return rejectWithValue(errorMessage);
        }
    }
);

const reviewsSlice = createSlice({
    name: 'reviews',
    initialState: productReviewsAdapter.getInitialState({
        ratingsPerStar: [],
        loading: true,
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
            .addCase(fetchProductReviews.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.ratingsPerStar = payload.ratingsPerStar;
                state.successMessage = payload.successMessage;
                productReviewsAdapter.setAll(state, payload.reviews);
            })
            .addCase(likeReview.fulfilled, (state, { payload: { successMessage, review } }) => {
                state.loading = false;
                state.successMessage = successMessage;
                productReviewsAdapter.updateOne(state, {
                    id: review._id,
                    changes: { number_of_likes: review.number_of_likes },
                });
            })
            .addMatcher(isAnyOf(fetchProductReviews.pending, likeReview.pending), state => {
                state.loading = true;
            })
            .addMatcher(
                isAnyOf(fetchProductReviews.rejected, likeReview.rejected),
                (state, { payload }) => {
                    state.loading = false;
                    state.errorMessage = payload;
                }
            );
    },
});

export const reviewsSelector = productReviewsAdapter.getSelectors(state => state.reviews);

export default reviewsSlice.reducer;
