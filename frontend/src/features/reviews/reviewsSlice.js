import { createSlice, createAsyncThunk, createEntityAdapter, isAnyOf } from '@reduxjs/toolkit';
import axios from '../../axios';

const productReviewsAdapter = createEntityAdapter({
    selectId: ({ _id }) => _id,
});

export const fetchProductReviews = createAsyncThunk(
    'reviews/fetchProductReviews',
    async (productId, { rejectWithValue }) => {
        try {
            const {
                data: { avgRatings, ratingsPerStar, reviews, successMessage },
            } = await axios.get(`/product/reviews/${productId}`);

            return { ratingsPerStar, reviews, successMessage, avgRatings };
        } catch ({ data: { errorMessage } }) {
            return rejectWithValue(errorMessage);
        }
    }
);

export const fetchReviewsByStar = createAsyncThunk(
    'reviews/fetchReviewsByStar',
    async ([productId, star], { rejectWithValue, getState, requestId }) => {
        try {
            const { loading, currentRequestId } = getState().reviews;

            console.log(currentRequestId, requestId);

            if (loading === true && currentRequestId !== requestId) {
                return rejectWithValue('Be patient');
            }

            const {
                data: { avgRatings, ratingsPerStar, reviews, successMessage },
            } = await axios.get(`/product/reviews/${productId}?star=${star}`);

            return { ratingsPerStar, reviews, successMessage, avgRatings };
        } catch ({ data: { errorMessage } }) {
            return rejectWithValue(errorMessage);
        }
    }
);

export const likeReview = createAsyncThunk(
    'reviews/likeReview',
    async (reviewId, { dispatch, rejectWithValue }) => {
        try {
            const {
                data: { successMessage, review },
            } = await axios.put(`/review/${reviewId}`);

            return { successMessage, review };
        } catch ({ data: { errorMessage } }) {
            return rejectWithValue(errorMessage);
        }
    },
    {
        condition: (reviewId, { getState }) => {
            const { likeReviewId, likeLoading } = getState().reviews;

            if (likeLoading === true && likeReviewId === reviewId) {
                return false;
            }
        },
    }
);

const reviewsSlice = createSlice({
    name: 'reviews',
    initialState: productReviewsAdapter.getInitialState({
        ratingsPerStar: [],
        avgRatings: [],
        currentRequestId: undefined,
        loading: false,
        likeLoading: null,
        likeReviewId: null,
        successMessage1: null,
        successMessage2: null,
        errorMessage: null,
        activeTab: 1,
    }),
    reducers: {
        setActiveTab(state, { payload }) {
            state.activeTab = payload;
        },
        setLikeReviewId(state, { payload }) {
            state.likeReviewId = payload;
        },
        clearSuccessMessage(state) {
            state.successMessage = null;
        },
        clearErrorMessage(state) {
            state.errorMessage = null;
        },
    },
    extraReducers: builder => {
        builder
            .addCase(fetchProductReviews.fulfilled, (state, action) => {
                const { requestId } = action.meta;
                const { ratingsPerStar, successMessage, avgRatings, reviews } = action.payload;
                if (state.loading === true && state.currentRequestId === requestId) {
                    state.loading = false;
                    state.ratingsPerStar = ratingsPerStar;
                    state.successMessage1 = successMessage;
                    state.avgRatings = avgRatings;
                    state.currentRequestId = undefined;
                    productReviewsAdapter.setAll(state, reviews);
                }
            })
            .addCase(likeReview.fulfilled, (state, { payload: { successMessage, review } }) => {
                state.likeLoading = false;
                state.successMessage2 = successMessage;
                state.likeReviewId = null;
                productReviewsAdapter.updateOne(state, {
                    id: review._id,
                    changes: { userLikes: review.userLikes },
                });
            })
            .addCase(fetchReviewsByStar.fulfilled, (state, action) => {
                const { requestId } = action.meta;
                const { ratingsPerStar, successMessage, avgRatings, reviews } = action.payload;

                if (state.loading === true && state.currentRequestId === requestId) {
                    state.loading = false;
                    state.ratingsPerStar = ratingsPerStar;
                    state.successMessage1 = successMessage;
                    state.avgRatings = avgRatings;
                    state.currentRequestId = undefined;
                    productReviewsAdapter.setAll(state, reviews);
                }
            })
            .addCase(likeReview.pending, state => {
                state.likeLoading = true;
            })
            .addCase(likeReview.rejected, (state, { payload }) => {
                state.likeLoading = false;
                state.likeReviewId = null;
                state.errorMessage = payload;
            })
            .addMatcher(
                isAnyOf(fetchProductReviews.pending, fetchReviewsByStar.pending),
                (state, action) => {
                    if (state.loading === false) {
                        state.currentRequestId = action.meta.requestId;
                        state.loading = true;
                    }
                }
            )
            .addMatcher(
                isAnyOf(fetchProductReviews.rejected, fetchReviewsByStar.rejected),
                (state, action) => {
                    const { requestId } = action.meta;
                    if (state.loading === 'pending' && state.currentRequestId === requestId) {
                        state.loading = false;
                        state.errorMessage = action.payload;
                        state.currentRequestId = undefined;
                    }
                }
            );
    },
});

export const { setLikeReviewId, setActiveTab } = reviewsSlice.actions;

export const reviewsSelector = productReviewsAdapter.getSelectors(state => state.reviews);

export default reviewsSlice.reducer;
