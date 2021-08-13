const Shop = require('../models/shop');
const User = require('../models/user');
const Product = require('../models/productModal');
const Order = require('../models/order');
const Address = require('../models/address');
const mongoose = require('mongoose');
const ErrorHandler = require('../utils/errorHandler');
const httpStatusCode = require('../utils/constansts');
const catchAsyncError = require('../middlewares/catchAsyncError');
const processImagePath = require('../helpers/processImageSavePath');
const catchUniqueError = require('../helpers/catchUniqueError');
const deleteImage = require('../helpers/deleteImage');

exports.addShop = catchAsyncError(async (req, res, next) => {
    const { _id: $user } = req.user;

    const { isMallType } = req.body;

    if (!isMallType) {
        if (mongoose.isValidObjectId($user)) {
            const user = await User.findById($user).select(
                'addresses birthday isEmailVerified avatar identityCard'
            );

            if (!user) {
                return next(new ErrorHandler('User not exists', httpStatusCode.NOT_FOUND));
            }

            if (user.isShopRequestSent) {
                return next(
                    new ErrorHandler(
                        'You can not make another shop while previous shop is being processed',
                        httpStatusCode.BAD_REQUEST
                    )
                );
            }

            if (user.isEmailVerified) {
                if (
                    user.birthday !== null &&
                    // user.addresses.length >= 1 &&
                    user.avatar &&
                    user.identityCard.number &&
                    user.identityCard.cardImage.length >= 1
                ) {
                    if (user.role === 'shop') {
                    } else {
                        return next(
                            new ErrorHandler(
                                'This account has already been a shop',
                                httpStatusCode.BAD_REQUEST
                            )
                        );
                    }
                } else {
                    return next(
                        new ErrorHandler(
                            'User was not eligible for creating a shop, please fill in full information',
                            httpStatusCode.BAD_REQUEST
                        )
                    );
                }
            } else {
                return next(
                    new ErrorHandler(
                        'User email has been not confirmed yet',
                        httpStatusCode.UNAUTHORIZED
                    )
                );
            }
        } else {
            return next(new ErrorHandler('User id is invalid', httpStatusCode.BAD_REQUEST));
        }
    }

    const { shopName, shopDescription, shopCategory } = req.body;
    let shopLogo,
        homeImages = [];

    if (req.files && req.files.shopLogo) {
        shopLogo = processImagePath(req.files.shopLogo[0].path);
    } else {
        res.status(httpStatusCode.BAD_REQUEST).json({ errorMessage: "Please select shop's logo" });
    }

    if (req.files && req.files.homeImages) {
        req.files.homeImages.forEach(image => {
            homeImages.push(processImagePath(image.path));
        });
    }

    const shop = new Shop({
        user: req.user._id,
        shopLogo,
        shopName,
        shopDescription,
        homeImages,
        isMallType,
        shopCategory,
    });

    shop.save(async (err, shop) => {
        if (err) {
            catchUniqueError(res, err);
            return res.status(httpStatusCode.BAD_REQUEST).json({ errorMessage: err.message });
        }

        if (shop) {
            await User.updateOne({ _id: shop.user }, { isShopRequestSent: true });

            return res.status(httpStatusCode.CREATED).json({
                successMessage: 'Request for opening a shop has been sent',
                shop,
            });
        }
    });
});

exports.getApprovedShops = (req, res, next) => {
    Shop.find({ isApproved: true }).exec((err, shops) => {
        if (err) return res.status(httpStatusCode.BAD_REQUEST).json({ errorMessage: err.message });

        if (shops)
            return res.status(httpStatusCode.OK).json({
                successMessage: 'All shops fetched successfully',
                shops,
            });
    });
};

exports.getAllShops = async (req, res, next) => {
    Shop.find({}).exec(async (err, shops) => {
        if (err) return res.status(httpStatusCode.BAD_REQUEST).json({ errorMessage: err.message });

        if (shops) {
            const shopsProducts = await Product.aggregate([
                {
                    $group: {
                        _id: '$shop',
                        number_of_products: { $sum: 1 },
                    },
                },
            ]);

            const _shops = shops.map(({ _doc }) => {
                const doc = shopsProducts.find(({ _id }) => _id.toString() === _doc._id.toString());

                if (doc) {
                    const totalProducts = doc.number_of_products;
                    return { ..._doc, totalProducts };
                } else {
                    return { ..._doc, totalProducts: 0 };
                }
            });

            res.status(httpStatusCode.OK).json({
                successMessage: 'All shops fetched successfully',
                shops: _shops,
            });
        }
    });
};

// exports.getUnapprovedShops = (req, res, next) => {
//     Shop.find({isApproved: false}).exec((err, shops) => {
//         if (err) return res.status(httpStatusCode.BAD_REQUEST).json({ errorMessage: err.message });

//         if (shops)
//             return res.status(httpStatusCode.OK).json({
//                 successMessage: 'All shops fetched successfully',
//                 shops,
//             });
//     });
// };

exports.getShopById = async (req, res, next) => {
    const { shopId: shop } = req.params;

    if (mongoose.isValidObjectId(shop)) {
        const shopAndProducts = await Product.aggregate([
            {
                $match: { shop: mongoose.Types.ObjectId(shop) },
            },
            {
                $lookup: {
                    from: 'shops',
                    localField: 'shop',
                    foreignField: '_id',
                    as: 'shop',
                },
            },
            {
                $unwind: '$shop',
            },
            {
                $lookup: {
                    from: 'categories',
                    localField: 'category',
                    foreignField: '_id',
                    as: 'category',
                },
            },
            {
                $unwind: '$category',
            },
            {
                $group: {
                    _id: '$shop._id',
                    shop: { $mergeObjects: '$shop' },
                    shopProducts: { $push: '$$ROOT' },
                },
            },
            {
                $project: {
                    'shopProducts.shop': 0,
                    'shopProducts.description': 0,
                    'shopProducts.supplier': 0,
                    'shopProducts.productWeight': 0,
                    'shopProducts.transporters': 0,
                },
            },
        ]);

        res.status(httpStatusCode.OK).json({
            successMessage: `${shop.shopName} fetched successfully`,
            shopAndProducts: shopAndProducts[0],
        });
    } else {
        return next(new ErrorHandler('Shop id is invalid', httpStatusCode.BAD_REQUEST));
    }
};

exports.getShopByName = async (req, res, next) => {
    let { shopName } = req.params;
    shopName = shopName.replace(/_/g, ' ');

    const shop = await Shop.findOne({
        shopName: { $regex: new RegExp(shopName, 'i') },
    }).lean();

    const shopProducts = await Product.find({ shop: shop._id });

    return res.status(httpStatusCode.OK).json({
        successMessage: `${shop.shopName} fetched successfully`,
        shopProducts,
        shop,
    });
};

exports.getMallShop = async (req, res) => {
    let { shopCategory } = req.params;
    shopCategory = shopCategory.substring(shopCategory.indexOf('.') + 1);

    if (mongoose.isValidObjectId(shopCategory)) {
        const shops = await Shop.aggregate([
            {
                $match: {
                    shopCategory: mongoose.Types.ObjectId(shopCategory),
                    isMallType: true,
                },
            },
        ]);

        res.status(httpStatusCode.OK).json({
            successMessage: 'All mall shop fetched successfully',
            shops,
        });
    } else {
        return res.status(httpStatusCode.BAD_REQUEST).json({ errorMessage: 'Id is invalid' });
    }
};

exports.updateShop = catchAsyncError(async (req, res, next) => {
    const { shopId } = req.params;

    if (mongoose.isValidObjectId(shopId)) {
        const shop = await Shop.findById(shopId);

        if (!shop) {
            return res.status(httpStatusCode.NOT_FOUND).json({ errorMessage: 'Shop not found' });
        }

        let updatedShop = shop;

        Object.keys(req.body).forEach(field => {
            if (!Array.isArray(field)) {
                updateShop[field] = req.body[field];
            }
        });

        if (req.files) {
            if (req.files.shopLogo) {
                updatedShop.shopLogo = processImagePath(req.files.shopLogo[0].path);
            }

            if (req.files.homeImages) {
                req.files.homeImages.forEach(image => {
                    updatedShop.homeImages.push(processImagePath(image.path));
                });
            }
        }

        Shop.findByIdAndUpdate(
            shopId,
            updatedShop,
            { runValidators: true, new: true },
            (err, newShop) => {
                if (err) {
                    return next(new ErrorHandler(err, httpStatusCode.BAD_REQUEST));
                }

                if (newShop) {
                    res.status(httpStatusCode.CREATED).json({
                        successMessage: 'Shop updated successfully',
                        updatedShop: newShop,
                    });
                }
            }
        );
    } else {
        return next(new ErrorHandler('Shop id is invalid', httpStatusCode.BAD_REQUEST));
    }
});

//Delete all products, if having product left can not delete
exports.deleteShop = catchAsyncError(async (req, res, next) => {
    const { shopId } = req.params;

    if (mongoose.isValidObjectId(shopId)) {
        const shop = await Shop.findOne({ _id: shopId }).select('orders products');

        if (!shop) {
            return res.status(httpStatusCode.BAD_REQUEST).json({ errorMessage: 'Shop not found' });
        }

        if (shop.orders && shop.orders.length > 0) {
            shop.orders.forEach(order => {
                if (!order.isPaid) {
                    return res.status(httpStatusCode.BAD_REQUEST).json({
                        success: false,
                        message:
                            "Can not delete this shop because there is order containing shop's products has been still not completed",
                    });
                }
            });
        }

        Shop.findByIdAndDelete(
            shopId,
            catchAsyncError(async (err, shop) => {
                if (err)
                    return res
                        .status(httpStatusCode.BAD_REQUEST)
                        .json({ errorMessage: err.message });

                if (shop) {
                    await User.findByIdAndUpdate(shop.user, {
                        isShopRequestSent: false,
                    });

                    // if (shop.shopLogo) {
                    //     deleteImage(shop.shopLogo);
                    // }

                    // if (shop.homeImages) {
                    //     shop.homeImages.forEach(image => {
                    //         deleteImage(image);
                    //     });
                    // }
                    return res.status(httpStatusCode.OK).json({
                        successMessage: 'Shop deleted successfully',
                    });
                }
            })
        );
    } else {
        return next(new ErrorHandler('Shop id is invalid', httpStatusCode.BAD_REQUEST));
    }
});

exports.cancelShopRequest = catchAsyncError(async (req, res, next) => {
    const { shopId: shop } = req.params;

    if (!mongoose.isValidObjectId(shop)) {
        return next(new ErrorHandler('Shop ID is invalid', httpStatusCode.BAD_REQUEST));
    }

    const { user: _id } = await Shop.findById(shop).select('user').lean();
    await User.updateOne(
        { _id },
        {
            isShopRequestSent: false,
        }
    );

    Shop.deleteOne({ _id: shop }).exec((err, done) => {
        if (err) return next(new ErrorHandler(err, httpStatusCode.BAD_REQUEST));
    });

    res.status(httpStatusCode.OK).json({
        cancelMessage: `Requesting for opening ${shop.shopName} canceled`,
    });
});

exports.approvedShop = catchAsyncError(async (req, res, next) => {
    const { shopId: shop } = req.params;

    if (mongoose.isValidObjectId(shop)) {
        Shop.findByIdAndUpdate(
            shop,
            {
                isApproved: true,
            },
            { new: true }
        )
            .then(async shop => {
                if (req.user.role !== 'admin') {
                    await User.findByIdAndUpdate(shop.user._id, {
                        role: 'shop',
                    });
                }

                res.status(httpStatusCode.OK).json({
                    successMessage: `${shop.shopName} is approved`,
                });
            })
            .catch(err => {
                return next(new ErrorHandler(err, httpStatusCode.BAD_REQUEST));
            });
    }
});

//Testing
exports.deleteAllShops = (req, res, next) => {
    Shop.find({}).then(shops => {
        Shop.deleteMany({}, (err, done) => {
            if (err) return next(new ErrorHandler(err, httpStatusCode.BAD_REQUEST));

            if (done) {
                shops.forEach(shop => {
                    if (shop.shopLogo) {
                        deleteImage(shop.shopLogo);
                    }

                    if (shop.homeImage) {
                        shop.homeImage.forEach(image => {
                            deleteImage(image);
                        });
                    }
                });

                return res.status(httpStatusCode.OK).json({
                    success: true,
                    message: 'All shops deleted successfully',
                });
            }
        });
    });
};

//DEVNOTIFY
// const shopsProducts = shops.map(async ({ _id }) => {
//     const totalProducts = await Product.countDocuments({ shop: _id });

//     return new Promise((resolve, reject) => {
//         resolve(totalProducts);
//     });
// });

// Promise.all(shopsProducts).then(value => {
//     let i = -1;
//     const _shops = shops.map(({ _doc }) => {
//         i++;
//         return { ..._doc, totalProducts: value[i] };
//     });
// });
