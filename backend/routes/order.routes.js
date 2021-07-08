const {
    getUserOrders,
    getShopOrders,
    getAllOrders,
    getUserSingleOrder,
    addOrder,
    updateOrder,
    deleteOrder,
} = require('../controllers/orderController');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

const router = require('express').Router();

router.post(
    '/order/add', //\?products=ObjectId&products=
    [isAuthenticatedUser, authorizeRoles('user')],
    addOrder
);

router.get('/user/orders', [isAuthenticatedUser, authorizeRoles('user')], getUserOrders);

router.get('/shop/orders', [isAuthenticatedUser, authorizeRoles('shop')], getShopOrders);

router.get('/admin/orders', [isAuthenticatedUser, authorizeRoles('admin')], getAllOrders);

router.get(
    '/user/order/:orderId',
    [isAuthenticatedUser, authorizeRoles('user')],
    getUserSingleOrder
);

router
    .route(
        '/shop/order/:orderId' //query: ? deleteShippingDetail=true&shippingDetailId=
    )
    .put([isAuthenticatedUser, authorizeRoles('shop')], updateOrder)
    .delete([isAuthenticatedUser, authorizeRoles('admin', 'shop')], deleteOrder);

module.exports = router;
