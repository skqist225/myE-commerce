import {
    createSlice,
    createAsyncThunk,
    createEntityAdapter,
} from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchComments = createAsyncThunk(
    'comments/fetchComments',
    async () => {
        const { data } = await axios.get('http://localhost:3001/comments');

        let tags = [];
        //tags = data.reduce((prev, cur) => [...prev, cur.tags],[])

        let likes = [];
        //likes = data.reduce((prev, cur) => [...prev, cur.likes],[])

        const mappedData = data.map(comment => ({
            ...comment,
            tags: comment.tags.map(tag => ({ ...tag, commentId: comment.id })),
            likes: comment.likes.map(like => ({
                ...like,
                commentId: comment.id,
            })),
        }));

        const comments = mappedData.map(comment => {
            let commentObj;
            Object.keys(comment).forEach(key => {
                if (!Array.isArray(comment[key])) {
                    commentObj = {
                        ...commentObj,
                        [key]: comment[key],
                    };
                } else {
                    if (key === 'likes') {
                        let likesIds = [];
                        comment[key].forEach(like => {
                            likesIds.push(like.id);
                        });
                        commentObj.likesIds = likesIds;
                        likes.push(comment[key]);
                    } else if (key === 'tags') {
                        let tagsIds = [];
                        comment[key].forEach(tag => {
                            tagsIds.push(tag.id);
                        });
                        commentObj.tagsIds = tagsIds;
                        tags.push(comment[key]);
                    }
                }
            });
            return commentObj;
        });

        return { comments, tags: tags.flat(), likes: likes.flat() };
    }
);

const commentsAdapter = createEntityAdapter({
    selectId: comment => comment.id,
});

export const deleteComment = createAsyncThunk(
    'comments/deleteComment',
    async id => {
        // await axios.delete(`http://localhost:3001/comments/${id}`);

        return { id };
    }
);

export const patchComment = createAsyncThunk(
    'comments/patchComment',
    async ({ id, newObj }) => {
        await axios.patch(`http://localhost:3001/comments/${id}`, newObj);

        return { id, changes: newObj };
    }
);

const likesAdapter = createEntityAdapter({
    selectId: like => like.id,
});

const tagsAdapter = createEntityAdapter({
    selectId: tag => tag.id,
});

const commentsSlice = createSlice({
    name: 'comments',
    initialState: commentsAdapter.getInitialState({
        loading: false,
        likes: likesAdapter.getInitialState(),
        tags: tagsAdapter.getInitialState(),
        error: null,
    }),
    reducers: {
        removeLikes(state) {
            likesAdapter.removeAll(state.likes);
        },
        removeTagById(state, { payload: tagId }) {
            const { commentId } = tagsAdapter
                .getSelectors()
                .selectById(state.tags, tagId);

            const comment = commentsAdapter
                .getSelectors()
                .selectById(state, commentId);

            commentsAdapter.updateOne(state, {
                id: comment.id,
                changes: {
                    ...comment,
                    tagsIds: comment.tagsIds.filter(_tagId => _tagId !== tagId),
                },
            });

            tagsAdapter.removeOne(state.tags, tagId);
        }, //0f930fed-215e-41d3-a278-65cb9f8d1dd1
    },
    extraReducers: {
        [fetchComments.pending](state) {
            state.loading = true;
        },
        [fetchComments.fulfilled](state, { payload }) {
            state.loading = false;

            commentsAdapter.setAll(state, payload.comments);
            likesAdapter.setAll(state.likes, payload.likes);
            tagsAdapter.setAll(state.tags, payload.tags);
        },
        [fetchComments.rejected](state) {
            state.loading = false;
            state.error = 'rejected';
        },
        [deleteComment.fulfilled](state, { payload }) {
            state.loading = false;
            commentsAdapter.removeOne(state, payload.id);
        },
        [patchComment.fulfilled](state, { payload: { id, changes } }) {
            commentsAdapter.updateOne(state, {
                id,
                changes,
            });
        },
    },
});

export const commentsSelectors = commentsAdapter.getSelectors(
    state => state.comments
);

export const likesSelectors = likesAdapter.getSelectors(
    state => state.comments.likes
);

export const tagsSelectors = tagsAdapter.getSelectors(
    state => state.comments.tags
);

export const { setAllComments, removeLikes, removeTagById } =
    commentsSlice.actions;

export default commentsSlice.reducer;
