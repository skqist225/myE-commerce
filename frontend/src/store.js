import { configureStore } from '@reduxjs/toolkit';

import {
    categoriesReducer,
    categoryReducer,
    authReducer,
    shopReducer,
    mallShopsReducer,
    transportersReducer,
    productReducer,
    reviewsReducer,
    cartReducer,
    userAddressesReducer,
} from './features';

const rootReducer = {
    auth: authReducer,
    categories: categoriesReducer,
    shop: shopReducer,
    mallShops: mallShopsReducer,
    transporters: transportersReducer,
    product: productReducer,
    reviews: reviewsReducer,
    cart: cartReducer,
    userAddresses: userAddressesReducer,
};

const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

const store = configureStore({
    reducer: rootReducer,

    devTools: process.env.NODE_ENV !== 'production',
    preloadedState: {
        auth: {
            user,
            isAuthenticated: user === null ? false : true,
            loading: false,
            successMessage: null,
            errorMessage: null,
        },
    },
});

export default store;
