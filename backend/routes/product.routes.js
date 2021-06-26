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

//FIXME=============================================ADD PRODUCT================================================================
router.post(
    '/shop/product/add',
    [isAuthenticatedUser, authorizeRoles('shop', 'admin')],
    upload.fields([
        {
            name: 'images',
            maxCount: 5,
        },
        { name: 'productTypes[typeImage]', maxCount: 20 },
    ]),
    addProduct
);

//FIXME============================================UPDATE PRODUCT + DELETE PRODUCT(S)===========================================
router
    .route(
        '/shop/product/:productId' //TODO adjust: productType // query: ?addProductType=true // query: ?deleteProductType=true&productTypeId=
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

router.delete(
    '/admin/products/delete',
    [isAuthenticatedUser, authorizeRoles('admin', 'shop')],
    deleteAllProducts
);

router.put(
    '/shop/product/:productId/update-product-type',
    [isAuthenticatedUser, authorizeRoles('shop')],
    upload.fields([{ name: 'productType[typeImage]', maxCount: 20 }]),
    updateProductType
);

//FIXME===================================================GET PRODUCTS==========================================================
router.get('/products', getAllProducts);
router.get(
    '/shop/products',
    [isAuthenticatedUser, authorizeRoles('shop')],
    getShopProducts
);
router.route('/product/:productId').get(getSingleProduct);

module.exports = router;
