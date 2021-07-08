import { createSlice } from '@reduxjs/toolkit';

const dropDownSlice = createSlice({
    name: 'dropDown',
    initialState: {
        dropDown1: false,
        dropDown2: false,
        dropDown3: false,
        dropDown4: false,
        dropDown5: false,
        dropDown6: false,
        dropDown7: false,
        dropDown8: false,
        dropDown9: false,
        dropDown10: false,
    },
    reducers: {
        setDropDown(state, { payload: { name, value } }) {
            state[name] = value;
        },
    },
});

export const { setDropDown } = dropDownSlice.actions;

export default dropDownSlice.reducer;
