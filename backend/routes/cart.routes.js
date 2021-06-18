const router = require('express').Router();
const {
    addToCart,
    removeCartProducts,
    deleteCart,
    getUserCart,
} = require('../controllers/cart.controller');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

router.get(
    '/user/cart',
    [isAuthenticatedUser, authorizeRoles('user')],
    getUserCart
);

router.post(
    '/user/cart/add-to-cart',
    [isAuthenticatedUser, authorizeRoles('user')],
    addToCart
);

router.put(
    '/user/cart/remove-cart-products',
    [isAuthenticatedUser, authorizeRoles('user')],
    removeCartProducts
);

router.delete(
    '/user/cart/delete',
    [isAuthenticatedUser, authorizeRoles('user')],
    deleteCart
);

module.exports = router;
