import { configureStore } from '@reduxjs/toolkit';

import {
    usersReducer,
    authReducer,
    productsReducer,
    transportersReducer,
    categoriesReducer,
} from '../features';

const rootReducer = {
    users: usersReducer,
    auth: authReducer,
    transporters: transportersReducer,
    products: productsReducer,
    // products: productsReducer,
    // shops: shopsReducer,
    categories: categoriesReducer,
    // posts: postsReducer,
    // transporters: transportersReducer,
    // suppliers: suppliersReducer,
    // carts: categoriesReducer,
    // orders: ordersReducer,
};
const user = localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user'))
    : {};

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
