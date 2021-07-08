import { configureStore } from '@reduxjs/toolkit';

import {
    usersReducer,
    authReducer,
    productsReducer,
    transportersReducer,
    categoriesReducer,
    productReducer,
    shopsReducer,
    shopReducer,
    dropDownReducer,
} from './features';

const rootReducer = {
    users: usersReducer,
    auth: authReducer,
    transporters: transportersReducer,
    products: productsReducer,
    product: productReducer,
    shops: shopsReducer,
    shop: shopReducer,
    categories: categoriesReducer,
    dropDown: dropDownReducer,
    // posts: postsReducer,
    // suppliers: suppliersReducer,
    // carts: categoriesReducer,
    // orders: ordersReducer,
};
const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : {};

const isUserHaveProps = Object.keys(user).length > 0;

export default configureStore({
    reducer: rootReducer,

    devTools: process.env.NODE_ENV !== 'production',
    preloadedState: {
        auth: {
            user,
            isAuthenticated: isUserHaveProps,
            loading: false,
            errorMessage: null,
        },
    },
});
