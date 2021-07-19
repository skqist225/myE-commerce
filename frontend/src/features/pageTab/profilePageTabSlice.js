import { createSlice } from '@reduxjs/toolkit';

const profilePageTabSlice = createSlice({
    name: 'profilePageTab',
    initialState: {
        currentTab: undefined,
    },
    reducers: {
        setTab(state, { payload }) {
            state.currentTab = payload;
        },
        resetCurrentTab(state, { payload }) {
            state.currentTab = undefined;
        },
    },
});

export const { setTab, resetCurrentTab } = profilePageTabSlice.actions;

export default profilePageTabSlice.reducer;
