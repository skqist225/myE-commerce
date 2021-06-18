const express = require('express');
const {
    addProduct,
    getAllProducts,
    getSingleProduct,
    updateProduct,
    getShopProducts,
    deleteAllProducts,
    updateProductType,
    deleteSingleProduct,
} = require('../controllers/product.controller');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');
const router = express.Router();
const upload = require('../middlewares/multer.js');

router.post(
    '/shop/product/add/',
    [isAuthenticatedUser, authorizeRoles('shop')],
    upload.fields([
        {
            name: 'images',
            maxCount: 5,
        },
        { name: 'productType[typeImage]', maxCount: 20 },
    ]),
    addProduct
);

router.get(
    '/products',

    getAllProducts
);

router.get(
    '/shop/products',
    [isAuthenticatedUser, authorizeRoles('shop')],
    getShopProducts
);

router.route('/product/:productId').get(getSingleProduct);

router
    .route(
        '/shop/product/:productId' // adjust: productType // query: ?addProductType=true // query: ?deleteProductType=true&productTypeId=
    )
    .put(
        [isAuthenticatedUser, authorizeRoles('shop')],
        upload.fields([
            {
                name: 'images',
                maxCount: 5,
            },
            { name: 'productType[typeImage]', maxCount: 20 },
        ]),
        updateProduct
    )
    .delete([isAuthenticatedUser, authorizeRoles('shop')], deleteSingleProduct);

router.put(
    '/shop/product/:productId/update-product-type',
    [isAuthenticatedUser, authorizeRoles('shop')],
    upload.fields([{ name: 'productType[typeImage]', maxCount: 20 }]),
    updateProductType
);

//Testing
router.delete(
    '/admin/products/delete',
    [isAuthenticatedUser, authorizeRoles('admin', 'shop')],
    deleteAllProducts
);

module.exports = router;
