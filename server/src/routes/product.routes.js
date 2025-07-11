const express = require('express');
const {
    addProduct,
    getAllProducts,
    getSingleProduct,
    getSaleProducts,
    updateProduct,
    getShopProducts,
    deleteAllProducts,
    updateProductType,
    deleteSingleProduct,
    advancedGetAllProducts,
    getOneProductPerMallShop,
} = require('../controllers/productController');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');
const isSaveFolderExist = require('../helpers/isSaveFolderExist');
const router = express.Router();
const upload = require('../middlewares/multer.js');

//HIGHLIGHT=========================================ADD PRODUCT================================================================
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
    isSaveFolderExist('product'),
    addProduct
);

//HIGHLIGHT========================================UPDATE PRODUCT + DELETE PRODUCT(S)===========================================
router
    .route(
        '/shop/product/:productId' //HIGHLIGHT adjust: productType // query: ?addProductType=true // query: ?deleteProductType=true&productTypeId=
    )
    .put(
        [isAuthenticatedUser, authorizeRoles('shop', 'admin')],
        upload.fields([
            {
                name: 'images',
                maxCount: 5,
            },
            { name: 'productType[typeImage]', maxCount: 20 },
        ]),
        isSaveFolderExist('product'),
        updateProduct
    )
    .delete([isAuthenticatedUser, authorizeRoles('shop', 'admin')], deleteSingleProduct);

router.delete(
    '/admin/products/delete',
    [isAuthenticatedUser, authorizeRoles('admin')],
    deleteAllProducts
);

router.put(
    '/shop/product/:productId/update-product-type',
    [isAuthenticatedUser, authorizeRoles('shop')],
    upload.fields([{ name: 'productType[typeImage]', maxCount: 20 }]),
    isSaveFolderExist('product'),
    updateProductType
);

//HIGHLIGHT==============================================GET PRODUCTS==========================================================
router.get('/products', getAllProducts);
router.get('/advanced/:shopId/products', advancedGetAllProducts);
router.get('/get-sale-products', getSaleProducts);
router.get('/get-one-product-per-mall-shop/:shopCategory', getOneProductPerMallShop);
router.get(
    '/shop/products',
    [isAuthenticatedUser, authorizeRoles('shop')],
    getShopProducts
);
router.route('/product/:productId').get(getSingleProduct);

module.exports = router;
