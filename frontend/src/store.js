import { configureStore } from '@reduxjs/toolkit';

import { categoriesReducer } from './features';

const rootReducer = {
    categories: categoriesReducer,
};

const store = configureStore({
    reducer: rootReducer,

    devTools: process.env.NODE_ENV !== 'production',
    preloadedState: {},
});

export default store;
