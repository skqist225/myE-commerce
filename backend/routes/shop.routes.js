const {
    addShop,
    deleteAllShops,
    updateShop,
    deleteShop,
    getApprovedShops,
    getAllShops,
    approvedShop,
    getShopById,
    cancelShopRequest,
    getShopByName,
    getMallShop,
} = require('../controllers/shopController');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');
const upload = require('../middlewares/multer');

const router = require('express').Router();

router.post(
    '/shop/add',
    [isAuthenticatedUser, authorizeRoles('user', 'admin')],
    upload.fields([
        { name: 'shopLogo', maxCount: 1 },
        { name: 'homeImages', maxCount: 10 },
    ]),
    addShop
);

router.get('/shops', getApprovedShops); //approved shop

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

router.post('/admin/delete-request/:shopId', [
    isAuthenticatedUser,
    authorizeRoles('admin'),
    cancelShopRequest,
]);

router
    .route('/shop/:shopId')
    .delete([isAuthenticatedUser, authorizeRoles('shop', 'admin')], deleteShop)
    .put(
        [isAuthenticatedUser, authorizeRoles('shop', 'admin')],
        upload.fields([
            { name: 'shopLogo', maxCount: 1 },
            { name: 'homeImages', maxCount: 5 },
        ]),
        updateShop
    );

router.get('/shop/:shopName', getShopByName);
router.get('/shop/:shopId/search', getShopById);
router.get('/shop/shopCategory/:shopCategory', getMallShop);

router.delete(
    '/admin/shops/delete',
    [isAuthenticatedUser, authorizeRoles('admin')],
    deleteAllShops
);

module.exports = router;
