const {
    addShop,
    deleteAllShops,
    updateShop,
    deleteShop,
    getAllShops,
    approvedShop,
    getSingleShop,
} = require('../controllers/shop.controller');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');
const upload = require('../middlewares/multer');

const router = require('express').Router();

router.post(
    '/shop/add',
    [isAuthenticatedUser, authorizeRoles('user')],
    upload.fields([
        { name: 'shopLogo', maxCount: 1 },
        { name: 'homeImage', maxCount: 5 },
    ]),
    addShop
);

router.get('/shops', getAllShops); //approved shop

router.get(
    '/admin/shops', //query: null => true, approve = false
    [isAuthenticatedUser, authorizeRoles('admin')],
    getAllShops
);

router.post('/admin/approve-shop/:shopId', [
    isAuthenticatedUser,
    authorizeRoles('admin'),
    approvedShop,
]);

router
    .route('/shop/:shopId')
    .delete([isAuthenticatedUser, authorizeRoles('shop')], deleteShop)
    .put(
        [isAuthenticatedUser, authorizeRoles('shop')],
        upload.fields([
            { name: 'shopLogo', maxCount: 1 },
            { name: 'homeImage', maxCount: 5 },
        ]),
        updateShop
    );

router.get('/shop/:shopId/search', getSingleShop);

router.delete(
    '/admin/shops/delete',
    [isAuthenticatedUser, authorizeRoles('admin')],
    deleteAllShops
);

module.exports = router;
