const Product = require('../models/productModal');
const Shop = require('../models/shop');
const Order = require('../models/order');
const Review = require('../models/review');
const ErrorHandler = require('../utils/errorHandler');
const httpStatusCode = require('../utils/constansts');
const catchAsyncError = require('../middlewares/catchAsyncError');
const processImagePath = require('../helpers/processImageSavePath');
const mongoose = require('mongoose');
const deleteImage = require('../helpers/deleteImage');
const ProductFeatures = require('../utils/productFeatureAPIs');
const { updateOne } = require('../models/productModal');

exports.addProduct = catchAsyncError(async (req, res, next) => {
    const { _id: user } = req.user;

    if (mongoose.isValidObjectId(user)) {
        const { _id: shop } = await Shop.findOne({ user }).select('_id').lean();
        const isProductNameExist = await Product.findOne({
            shop,
            productName: {
                $regex: new RegExp(req.body.productName.replace(/-|_|\./g, ''), 'i'),
            },
        })
            .select('_id')
            .lean();

        if (shop) {
            if (isProductNameExist) {
                res.status(httpStatusCode.BAD_REQUEST).json({
                    errorMessage: 'This product name is already exists in your shop',
                });
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

            if (transporters.length > 3) {
                res.status(httpStatusCode.BAD_REQUEST).json({
                    errorMessage: 'Please do not choose over 3 transporters',
                });
            }

            let _product = {
                shop,
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

            if (!req.body.productTypes) {
                res.status(httpStatusCode.BAD_REQUEST).json({
                    success: false,
                    message: "Product's types is required",
                });
            }

            const { typeName, typeStock, typePrice } = req.body.productTypes;

            if (Array.isArray(typeName)) {
                const arraySize = typeName.length;

                if (
                    typeStock.length !== arraySize ||
                    typePrice.length !== arraySize ||
                    (req.files['productTypes[typeImage]'] &&
                        req.files['productTypes[typeImage]'].length !== arraySize)
                ) {
                    res.status(httpStatusCode.BAD_REQUEST).json({
                        success: false,
                        errorMessage: "Please fill in full prodyct's type information",
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

                    productTypeObj.typeImage = req.files['productTypes[typeImage]']
                        ? processImagePath(req.files['productTypes[typeImage]'][i].path)
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
                _product.productTypes.push(productTypeObj);

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
                if (err) return next(new ErrorHandler(err, httpStatusCode.BAD_REQUEST));

                if (product) {
                    await Shop.updateOne(
                        { _id: shop },
                        { number_of_products: { $sum: 1 } }
                    );

                    res.status(httpStatusCode.CREATED).json({
                        successMessage: 'Product created successfully',
                        product,
                    });
                }
            });
        } else {
            return next(new ErrorHandler('Shop not found', httpStatusCode.NOT_FOUND));
        }
    } else {
        return next(new ErrorHandler('User id is invalid', httpStatusCode.BAD_REQUEST));
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
                successMessage: 'Product updated successfully',
                updatedProduct: product,
            });
        } else {
            return next(new ErrorHandler('Shop not found', httpStatusCode.NOT_FOUND));
        }
    } else {
        return next(
            new ErrorHandler('Product id is invalid', httpStatusCode.BAD_REQUEST)
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
                            req.files['productType[typeImage]'].length !== arraySize)
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
                                    ({ _id }) => _id.toString() === prdType.toString()
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
                                product.productType[index] = productTypeArray[i];
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
                                    new ErrorHandler(err, httpStatusCode.BAD_REQUEST)
                                );

                            return res.status(httpStatusCode.CREATED).json({
                                successMessage: "Product's type updated successfully",
                                updatedProduct: product,
                            });
                        });
                    }

                    if (req.query.updateProductType === 'true') {
                        const { productTypeId } = req.query;
                        if (!Array.isArray(productTypeId)) {
                            const index = product.productType.findIndex(
                                ({ _id }) => _id.toString() === productTypeId.toString()
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
            return next(new ErrorHandler('Shop not found', httpStatusCode.NOT_FOUND));
        }
    } else {
        return next(
            new ErrorHandler('Product id is invalid', httpStatusCode.BAD_REQUEST)
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
        Product.deleteOne({ _id: productId }, (err, product) => {
            if (err)
                return res
                    .status(httpStatusCode.BAD_REQUEST)
                    .json({ errorMessage: err.message });

            if (product) {
                if (product.productTypes) {
                    product.productTypes.forEach(type => {
                        deleteImage(type.typeImage);
                    });
                }

                if (product.images) {
                    product.images.forEach(image => deleteImage(image));
                }

                return res.status(httpStatusCode.OK).json({
                    successMessage: `Delete product successfully`,
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
                res.status(httpStatusCode.OK).json({
                    successMessage: 'All products fetched successfully',
                    products,
                });
            }
        });
};

exports.advancedGetAllProducts = async (req, res, next) => {
    try {
        let features = new ProductFeatures(Product, req.query, req.params.shopId)
            .filter()
            .sort()
            .paginate();

        if (req.query.ratingFilter) {
            const productsRatings = await Review.aggregate([
                {
                    $group: {
                        _id: '$product',
                        avgRatings: { $avg: '$rating' },
                    },
                },
                {
                    $match: {
                        avgRatings: { $gte: Math.abs(req.query.ratingFilter) },
                    },
                },
            ]);
            features.query = features.query.match({
                _id: {
                    $in: productsRatings.map(
                        ({ _id }) => new mongoose.Types.ObjectId(_id)
                    ),
                },
            });
        }

        const products = await features.query;

        res.status(httpStatusCode.OK).json({
            successMessage: 'All products fetched successfully',
            number_of_products: products.length,
            products,
        });
    } catch (error) {
        res.status(httpStatusCode.BAD_REQUEST).json({ errorMessage: error.message });
    }
};

exports.getShopProducts = catchAsyncError(async (req, res, next) => {
    const { _id: user } = req.user;
    const { _id: shop } = await Shop.findOne({ user });

    Product.find({ shop }).exec((err, shopProducts) => {
        if (err) return next(new ErrorHandler(err, httpStatusCode.BAD_REQUEST));

        if (shopProducts)
            res.status(httpStatusCode.OK).json({
                successMessage: "All shop's products fetched successfully",
                shopProducts,
            });
    });
});

exports.getSaleProducts = async (req, res, next) => {
    const products = await Product.aggregate([
        {
            $match: {
                discountPercent: { $gte: 0, $lte: 100 },
            },
        },
        {
            $sort: {
                discountPercent: 1,
                soldInFlashSaleTime: 1,
            },
        },
    ]);

    res.status(httpStatusCode.OK).json({
        successMessage: 'Sale products fetched successfully',
        products,
    });
};

exports.getOneProductPerMallShop = async (req, res, next) => {
    const { shopCategory } = req.params;
    const shopCategoryId = shopCategory.substring(shopCategory.indexOf('.') + 1);

    if (mongoose.isValidObjectId(shopCategoryId)) {
        const numberOfShops = await Shop.countDocuments({ shopCategory: shopCategoryId });
        let randomRange = numberOfShops - 8;

        const randomSkipNumber = Math.floor(Math.random() * randomRange);
        const shopId = await Shop.find({ shopCategory: shopCategoryId })
            .skip(randomSkipNumber)
            .limit(8)
            .select('_id');
        const shopIds = [];
        shopId.forEach(({ _id }) => shopIds.push(_id));
        let products = [];
        for (let id of shopIds) {
            const product = await Product.findOne({
                shop: mongoose.Types.ObjectId(id),
            })
                .lean()
                .populate('shop', 'shopName')
                .select('_id shop productTypes');
            products.push(product);
        }

        // const products = await Product.find({ shop: { $in: 'shopIds' } }, { shop: 1 });

        // const products = await Product.aggregate([
        //     {
        //         $match: { shop: { $in: shopIds } },
        //     },
        //     {
        //         $lookup: {
        //             from: 'shops',
        //             localField: 'shop',
        //             foreignField: '_id',
        //             as: 'shop',
        //         },
        //     },
        // ]);

        res.status(httpStatusCode.OK).json({
            products: products.filter(product => product !== null),
            // products,
        });
    }
};

exports.getSingleProduct = (req, res, next) => {
    const { productId: product } = req.params;

    if (mongoose.isValidObjectId(product)) {
        Product.findById(product)
            .populate('transporters', 'transporterName transportFee -_id')
            .populate('supplier', 'supplierName headquarterAddress -_id')
            .populate('category', 'categoryName _id parentId')
            .populate('shop', '_id shopName shopLogo isMallType shopLocation')
            .lean()
            .exec(async (err, product) => {
                if (err) return next(new ErrorHandler(err, httpStatusCode.BAD_REQUEST));

                if (!product) {
                    res.status(httpStatusCode.NOT_FOUND).json({
                        message: 'Product not found',
                    });
                }

                if (product) {
                    const number_of_products = 0;

                    const number_of_stocks = product.productTypes.reduce(
                        (acc, type) => acc + type.typeStock,
                        0
                    );

                    const $product = { ...product, number_of_products, number_of_stocks };

                    res.status(httpStatusCode.OK).json({
                        successMessage: `${product.productName} fetched successfully`,
                        product: $product,
                    });
                }
            });
    } else {
        return next(
            new ErrorHandler('Product id is invalid', httpStatusCode.BAD_REQUEST)
        );
    }
};

//For testing purpose
exports.deleteAllProducts = (req, res, next) => {
    Product.find({}).then(products => {
        Product.deleteMany({}).exec((err, done) => {
            if (err) return next(new ErrorHandler(err, httpStatusCode.BAD_REQUEST));

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

                res.status(httpStatusCode.OK).json({
                    successMessage: 'All products are deleted successfully',
                });
            }
        });
    });
};
