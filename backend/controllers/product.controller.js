const Product = require('../models/product');
const Shop = require('../models/shop');
const Order = require('../models/order');
const ErrorHandler = require('../utils/errorHandler');

const httpStatusCode = require('../utils/constansts');
const catchAsyncError = require('../middlewares/catchAsyncError');
const processImagePath = require('../helpers/processImageSavePath');
const mongoose = require('mongoose');
const deleteImage = require('../helpers/deleteImage');
// const isProductNameExist = require('../helpers/isProductNameExist');

exports.addProduct = catchAsyncError(async (req, res, next) => {
    const userId = req.user._id;

    if (mongoose.isValidObjectId(userId)) {
        const shop = await Shop.findOne({ user: userId });
        const shopProducts = await Product.find({ shop: shop._id });

        const isProductNameExist = ({ productName }) => {
            let prdName = req.body.productName;

            if (prdName.includes('-')) {
                let prdNameSubName1 = prdName.split('-');

                if (productName.includes('-')) {
                    if (
                        productName.split('-').length === prdNameSubName1.length
                    ) {
                    }

                    const prdNameSubName2 = productName.split('-');

                    let trueAcc = 0;

                    for (let i = 0; i < prdNameSubName1.length; i++) {
                        if (prdNameSubName1[i] === prdNameSubName2[i]) {
                            trueAcc++;
                        }
                    }

                    if (trueAcc === prdNameSubName1.length) {
                        return true;
                    }
                }
            }

            return productName === prdName;
        };

        if (shop) {
            if (shopProducts.length > 0) {
                if (shopProducts.some(isProductNameExist)) {
                    return res.status(httpStatusCode.BAD_REQUEST).json({
                        errorMessage:
                            'This product name is already exists in our shop',
                    });
                }
            }

            const {
                productName,
                description,
                category,
                supplier,
                transporters,
                isFreeship,
                productWeight,
                discountPercent,
            } = req.body;

            let _product = {
                shop: shop._id,
                productName,
                description,
                category,
                supplier,
                transporters,
                isFreeship,
                productWeight,
                discountPercent,
                productTypes: [],
                images: [],
            };

            if (req.files.images) {
                req.files.images.forEach(image => {
                    _product.images.push(processImagePath(image.path));
                });
            }

            const { typeName, typeStock, typePrice } = req.body.productTypes;

            if (Array.isArray(typeName)) {
                const arraySize = typeName.length;

                if (
                    typeStock.length !== arraySize ||
                    typePrice.length !== arraySize ||
                    (req.files['productTypes[typeImage]'] &&
                        req.files['productTypes[typeImage]'].length !==
                            arraySize)
                ) {
                    return res.status(httpStatusCode.BAD_REQUEST).json({
                        success: false,
                        errorMessage: 'Can not leave out any field',
                    });
                }

                for (let i = 0; i < arraySize; i++) {
                    let productTypeObj = {
                        typeName: '',
                        typeImage: '',
                        typeStock: 0,
                        typePrice: 0,
                    };
                    productTypeObj.typeName = typeName[i];
                    productTypeObj.typeStock = typeStock[i];
                    productTypeObj.typePrice = typePrice[i];
                    productTypeObj.typeImage = req.files[
                        'productTypes[typeImage]'
                    ]
                        ? processImagePath(
                              req.files['productTypes[typeImage]'][i].path
                          )
                        : '';

                    _product.productTypes.push(productTypeObj);
                }
            } else {
                let productTypeObj = {
                    typeName,
                    typeStock,
                    typePrice,
                    typeImage: processImagePath(
                        req.files['productTypes[typeImage]'][0].path
                    ),
                };

                if (req.query.addProductType === 'true') {
                    Product.findByIdAndUpdate(
                        product._id,
                        {
                            $push: { productType: productTypeObj },
                        },
                        { runValidators: true, new: true }
                    ).exec((err, product) => {
                        if (err)
                            return res
                                .status(httpStatusCode.BAD_REQUEST)
                                .json({ errorMessage: err.message });

                        return res.status(httpStatusCode.CREATED).json({
                            updatedProduct: product,
                        });
                    });
                }
            }

            const product = new Product(_product);

            product.save(async (err, product) => {
                if (err)
                    res.status(httpStatusCode.BAD_REQUEST).json({
                        errorMessage: err.message,
                    });

                if (product) {
                    return res.status(httpStatusCode.CREATED).json({
                        success: true,
                        successMessage: 'Product created successfully',
                        product,
                    });
                }
            });
        } else {
            return next(
                new ErrorHandler('Shop not found', httpStatusCode.NOT_FOUND)
            );
        }
    } else {
        return next(
            new ErrorHandler('User id is invalid', httpStatusCode.BAD_REQUEST)
        );
    }
});

exports.updateProduct = async (req, res, next) => {
    const { productId } = req.params;
    const user = req.user._id;

    const shop = await Shop.findOne({ user });
    const shopProducts = await Product.find({ shop: shop._id });

    if (mongoose.isValidObjectId(productId)) {
        if (shop) {
            const isProductNameExist = productName => {
                return (
                    productName.replace(/-/g, '') ===
                    req.body.productName.replace(/-/g, '')
                );
            };

            if (
                req.body.productName &&
                shopProducts.length > 0 &&
                shopProducts.some(isProductNameExist)
            ) {
                return next(
                    new ErrorHandler(
                        'This product name is already exists in our shop',
                        httpStatusCode.BAD_REQUEST
                    )
                );
            }

            const product = await Product.findById(productId);

            Object.keys(req.body).forEach(field => {
                if (!Array.isArray(req.body[field])) {
                    product[field] = req.body[field];
                }
            });

            if (req.body.transporters) {
                product.transporters = req.body.transporters;
            }

            if (req.files && req.files.images) {
                product.images = [];

                req.files.images.forEach(image => {
                    product.images.push(processImagePath(image.path));
                });
            }

            await product.save();

            return res.status(httpStatusCode.CREATED).json({
                success: true,
                message: 'Product updated successfully',
                updatedProduct: product,
            });
        } else {
            return next(
                new ErrorHandler('Shop not found', httpStatusCode.NOT_FOUND)
            );
        }
    } else {
        return next(
            new ErrorHandler(
                'Product id is invalid',
                httpStatusCode.BAD_REQUEST
            )
        );
    }
};

exports.updateProductType = catchAsyncError(async (req, res, next) => {
    const { productId } = req.params;
    const user = req.user._id;

    if (mongoose.isValidObjectId(user)) {
        const shop = await Shop.findOne({ user });

        if (shop) {
            const product = await Product.findById(productId);

            if (req.body.productType) {
                const { typeName, typeStock, typePrice } = req.body.productType;

                if (Array.isArray(typeName)) {
                    const arraySize = typeName.length;

                    if (
                        typeStock.length !== arraySize ||
                        typePrice.length !== arraySize ||
                        (req.files['productType[typeImage]'] &&
                            req.files['productType[typeImage]'].length !==
                                arraySize)
                    ) {
                        return res.status(httpStatusCode.BAD_REQUEST).json({
                            success: false,
                            message: 'YOu can not leave out any field',
                        });
                    }
                    let productTypeArray = [];

                    for (let i = 0; i < arraySize; i++) {
                        let productTypeObj = {
                            typeName: '',
                            typeImage: '',
                            typeStock: 0,
                            typePrice: 0,
                        };
                        productTypeObj.typeName = typeName[i];
                        productTypeObj.typeStock = typeStock[i];
                        productTypeObj.typePrice = typePrice[i];
                        productTypeObj.typeImage = processImagePath(
                            req.files['productType[typeImage]'][i].path
                        );

                        productTypeArray.push(productTypeObj);
                    }
                    if (req.query.addProductType === 'true') {
                        productTypeArray.forEach(obj => {
                            product.productType.push(obj);
                        });
                    }

                    if (req.query.updateProductType === 'true') {
                        const { productTypeId } = req.query;
                        if (Array.isArray(productTypeId)) {
                            let i = 0;
                            productTypeId.forEach(prdType => {
                                const index = product.productType.findIndex(
                                    ({ _id }) =>
                                        _id.toString() === prdType.toString()
                                );

                                if (index === -1) {
                                    return next(
                                        new ErrorHandler(
                                            'Product type not exists',
                                            httpStatusCode.BAD_REQUEST
                                        )
                                    );
                                }
                                productTypeArray[i]._id = prdType;
                                product.productType[index] =
                                    productTypeArray[i];
                                i++;
                            });
                        }
                    }
                } else {
                    let productTypeObj = {
                        typeName,
                        typeStock,
                        typePrice,
                        typeImage: processImagePath(
                            req.files['productType[typeImage]'][0].path
                        ),
                    };

                    if (req.query.addProductType === 'true') {
                        Product.findByIdAndUpdate(
                            product._id,
                            {
                                $push: { productType: productTypeObj },
                            },
                            { runValidators: true, new: true }
                        ).exec((err, product) => {
                            if (err)
                                return next(
                                    new ErrorHandler(
                                        err,
                                        httpStatusCode.BAD_REQUEST
                                    )
                                );

                            return res.status(httpStatusCode.CREATED).json({
                                success: true,
                                message: "Product's type updated successfully",
                                updatedProduct: product,
                            });
                        });
                    }

                    if (req.query.updateProductType === 'true') {
                        const { productTypeId } = req.query;
                        if (!Array.isArray(productTypeId)) {
                            const index = product.productType.findIndex(
                                ({ _id }) =>
                                    _id.toString() === productTypeId.toString()
                            );

                            if (index === -1) {
                                return next(
                                    new ErrorHandler(
                                        'Product type not exists',
                                        httpStatusCode.BAD_REQUEST
                                    )
                                );
                            }
                            productTypeObj._id = productTypeId;
                            product.productType[index] = productTypeObj;
                        }
                    }
                }
            }

            if (req.query.deleteProductType === 'true') {
                const { productTypeId } = req.query;

                let modifyArray;

                if (Array.isArray(productTypeId)) {
                    let afterDeleteArray;

                    afterDeleteArray = product.productType;

                    productTypeId.forEach(prdType => {
                        afterDeleteArray = afterDeleteArray.filter(
                            ({ _id }) => _id.toString() !== prdType.toString()
                        );
                    });

                    modifyArray = afterDeleteArray;
                } else {
                    modifyArray = product.productType.filter(
                        ({ _id }) => _id.toString() !== productTypeId.toString()
                    );
                }

                product.productType = modifyArray;
            }

            await product.save();

            return res.status(httpStatusCode.CREATED).json({
                success: true,
                message: "Product's type updated successfully",
                updatedProduct: product,
            });
        } else {
            return next(
                new ErrorHandler('Shop not found', httpStatusCode.NOT_FOUND)
            );
        }
    } else {
        return next(
            new ErrorHandler(
                'Product id is invalid',
                httpStatusCode.BAD_REQUEST
            )
        );
    }
});

exports.deleteSingleProduct = catchAsyncError(async (req, res, next) => {
    const { productId } = req.params;
    const shop = await Shop.findOne({ user: req.user._id });

    if (mongoose.isValidObjectId(productId)) {
        // const orders = await Order.find({ shop, isPaid: false })
        //     .populate('products.productId', '_id')
        //     .select('products');
        //
        // let isOk = true;
        //
        // orders.forEach(order => {
        //     order.products.some(product => {
        //         if (product.productId) {
        //             if (
        //                 product.productId._id.toString() ===
        //                 productId.toString()
        //             )
        //                 isOk = false;
        //             return true;
        //         }
        //     });
        // });
        //
        // if (!isOk) {
        //     return res.status(httpStatusCode.BAD_REQUEST).json({
        //         success: true,
        //         message:
        //             'Can not delete this product because there is order containing it has been still not completed yet',
        //     });
        // } else {
        Product.findOneAndDelete({ _id: productId, shop }, (err, product) => {
            if (err)
                return next(new ErrorHandler(err, httpStatusCode.BAD_REQUEST));

            if (product) {
                product.productType.forEach(type => {
                    deleteImage(type.typeImage);
                });

                if (product.images) {
                    product.images.forEach(image => deleteImage(image));
                }

                return res.status(httpStatusCode.OK).json({
                    success: true,
                    message: `Delete ${product._id} successfully`,
                    removedProduct: product,
                });
            }
        });
        // }
    }

    //Check if product is being processed in order, if all orders contain this product has been processed successfull, we can delete it
});

//========================================================GET PRODUCTS================================================

exports.getAllProducts = (req, res, next) => {
    Product.find({})
        // .populate('transporters', 'transporterName transportFee -_id')
        .populate('category', 'categoryName -_id')
        .populate('supplier', 'supplierName headquarterAddress -_id')
        .exec((err, products) => {
            if (err)
                return res
                    .status(httpStatusCode.BAD_REQUEST)
                    .json({ errorMessage: err.message });

            if (products) {
                return res.status(httpStatusCode.OK).json({
                    successMessage: 'All products fetched successfully',
                    products,
                });
            }
        });
};

exports.getShopProducts = catchAsyncError(async (req, res, next) => {
    const shop = await Shop.findOne({ user: req.user._id });

    Product.find({ shop: shop._id }).exec((err, products) => {
        if (err) return next(new ErrorHandler(err, httpStatusCode.BAD_REQUEST));

        if (products)
            return res.status(httpStatusCode.OK).json({
                success: true,
                message: "Shop's products fetched successfully",
                products,
            });
    });
});

exports.getSingleProduct = (req, res, next) => {
    const { productId } = req.params;

    if (mongoose.isValidObjectId(productId)) {
        Product.findById(productId)
            .populate('transporters', 'transporterName transportFee -_id')
            .populate('supplier', 'supplierName headquarterAddress -_id')
            .populate('category', 'categoryName -_id')
            .exec((err, product) => {
                if (err)
                    return next(
                        new ErrorHandler(err, httpStatusCode.BAD_REQUEST)
                    );

                if (product)
                    return res.status(httpStatusCode.OK).json({
                        success: true,
                        message: `${product.productName} fetched successfully`,
                        product,
                    });
            });
    } else {
        return next(
            new ErrorHandler(
                'Product id is invalid',
                httpStatusCode.BAD_REQUEST
            )
        );
    }
};

//For testing purpose
exports.deleteAllProducts = (req, res, next) => {
    Product.find({}).then(products => {
        Product.deleteMany({}).exec((err, done) => {
            if (err)
                return next(new ErrorHandler(err, httpStatusCode.BAD_REQUEST));

            if (done) {
                Shop.updateMany({}, { products: [] }).exec();

                products.forEach(product => {
                    if (product.images) {
                        product.images.forEach(image => deleteImage(image));
                    }

                    if (product.productType.length > 0) {
                        product.productType.forEach(({ typeImage }) =>
                            deleteImage(typeImage)
                        );
                    }
                });

                return res.status(httpStatusCode.OK).json({
                    success: true,
                    message: 'All products are deleted successfully',
                });
            }
        });
    });
};
