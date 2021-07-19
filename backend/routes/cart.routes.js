const router = require('express').Router();
const {
    addToCart,
    removeCartProducts,
    deleteUserCart,
    getUserCart,
} = require('../controllers/cartController');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

router.get('/user/cart', [isAuthenticatedUser, authorizeRoles('user')], getUserCart);

router.post('/user/cart/add-to-cart', [isAuthenticatedUser, authorizeRoles('user')], addToCart);

router.put(
    '/user/cart/remove-cart-products',
    [isAuthenticatedUser, authorizeRoles('user')],
    removeCartProducts
);

router.delete('/user/cart/delete', [isAuthenticatedUser, authorizeRoles('user')], deleteUserCart);

module.exports = router;
