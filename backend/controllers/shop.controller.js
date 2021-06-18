const Shop = require('../models/shop');
const User = require('../models/user');
const Product = require('../models/product');
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
    const userId = req.user._id;

    if (mongoose.isValidObjectId(userId)) {
        // const _id = mongoose.Types.ObjectId(userId);
        const user = await User.findById(userId).select(
            'addresses birthday isEmailVerified avatar identityCard'
        );

        if (!user) {
            return next(
                new ErrorHandler('User not exists', httpStatusCode.NOT_FOUND)
            );
        }

        if (user.isShopRequestSent) {
            return next(
                new ErrorHandler(
                    'You can not make another shop while previous shop is being processed',
                    httpStatusCode.BAD_REQUEST
                )
            );
        }

        //Address

        if (user.isEmailVerified) {
            if (
                user.birthday !== null &&
                // user.addresses.length >= 1 &&
                user.avatar &&
                user.identityCard.number &&
                user.identityCard.cardImage.length >= 1
            ) {
                if (user.role !== 'shop') {
                    const { shopName, shopDescription } = req.body;
                    let shopLogo,
                        homeImage = [];

                    console.log(req.files);

                    if (req.files && req.files.shopLogo) {
                        shopLogo = processImagePath(req.files.shopLogo[0].path);
                    } else {
                        return next(
                            new ErrorHandler(
                                "Please select a shop's logo to upload",
                                httpStatusCode.BAD_REQUEST
                            )
                        );
                    }

                    if (req.files && req.files.homeImage) {
                        req.files.homeImage.forEach(image => {
                            homeImage.push(processImagePath(image.path));
                        });
                    }

                    const shop = new Shop({
                        user: req.user._id,
                        shopLogo,
                        shopName,
                        shopDescription,
                        homeImage,
                    });

                    shop.save(async (err, shop) => {
                        if (err) {
                            catchUniqueError(res, err);
                            return next(
                                new ErrorHandler(
                                    err,
                                    httpStatusCode.BAD_REQUEST
                                )
                            );
                        }

                        if (shop) {
                            await User.findByIdAndUpdate(
                                { _id: shop.user },
                                { isShopRequestSent: true }
                            );

                            return res.status(httpStatusCode.CREATED).json({
                                success: true,
                                message:
                                    'Request for opening a shop has been sent',
                                shop,
                            });
                        }
                    });
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
        return next(
            new ErrorHandler('User id is invalid', httpStatusCode.BAD_REQUEST)
        );
    }
});

exports.getAllShops = (req, res, next) => {
    let isApproved = true;
    if (req.user && req.user.role === 'admin') {
        if (req.query) {
            isApproved = req.query.approve; //false
        }
    }

    Shop.find({ isApproved }).exec((err, shops) => {
        if (err) return res.status(httpStatusCode.BAD_REQUEST).json({ err });

        if (shops)
            return res.status(httpStatusCode.OK).json({
                success: true,
                shops_nbm: shops.length,
                shops,
            });
    });
};

exports.getSingleShop = (req, res, next) => {
    const { shopId } = req.params;
    if (mongoose.isValidObjectId(shopId)) {
        Shop.findById(shopId)
            .populate('user')
            .exec(async (err, shop) => {
                if (err)
                    return next(
                        new ErrorHandler(err, httpStatusCode.BAD_REQUEST)
                    );

                if (shop) {
                    const shopProducts = await Product.find({ shop: shop._id });

                    return res.status(httpStatusCode.OK).json({
                        success: true,
                        message: `${shop.shopName} fetched successfully`,
                        products_nbm: shopProducts.length,
                        shopProducts,
                        shop,
                    });
                }
            });
    } else {
        return next(
            new ErrorHandler('Shop id is invalid', httpStatusCode.BAD_REQUEST)
        );
    }
};

exports.updateShop = catchAsyncError(async (req, res, next) => {
    const { shopId } = req.params;

    if (mongoose.isValidObjectId(shopId)) {
        const shop = await Shop.findOne({ shopId });
        if (!shop) {
            return next(
                new ErrorHandler('Shop not exists', httpStatusCode.NOT_FOUND)
            );
        }

        let updateShop = shop;

        Object.keys(req.body).forEach(field => {
            if (!Array.isArray(field)) {
                updateShop[field] = req.body[field];
            }
        });

        if (req.files && req.files.shopLogo) {
            updateShop.shopLogo = processImagePath(req.files.shopLogo[0].path);
        }

        if (req.files && req.files.homeImage) {
            req.files.homeImage.forEach(image => {
                updateShop.homeImage.push(processImagePath(image.path));
            });
        }

        Shop.findByIdAndUpdate(
            shopId,
            updatedShop,
            { runValidators: true, new: true },
            (err, newShop) => {
                if (err) {
                    return next(
                        new ErrorHandler(err, httpStatusCode.BAD_REQUEST)
                    );
                }

                if (newShop) {
                    res.status(httpStatusCode.CREATED).json({
                        success: true,
                        message: 'Shop updated successfully',
                        updatedShop: newShop,
                    });
                }
            }
        );
    } else {
        return next(
            new ErrorHandler('Shop id is invalid', httpStatusCode.BAD_REQUEST)
        );
    }
});

//Delete all products, if having product left can not delete
exports.deleteShop = catchAsyncError(async (req, res, next) => {
    const { shopId } = req.params;

    if (mongoose.isValidObjectId(shopId)) {
        const shop = await Shop.findOne({ _id: shopId }).select(
            'orders products'
        );

        if (shop) {
            return next(
                new ErrorHandler('Shop not found', httpStatusCode.NOT_FOUND)
            );
        }

        if (shop.orders.length > 0) {
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
                    return next(
                        new ErrorHandler(err, httpStatusCode.BAD_REQUEST)
                    );

                if (shop) {
                    await User.findByIdAndUpdate(shop.user, {
                        isShopRequestSent: false,
                    });

                    if (shop.shopLogo) {
                        deleteImage(shop.shopLogo);
                    }

                    if (shop.homeImage) {
                        shop.homeImage.forEach(image => {
                            deleteImage(image);
                        });
                    }
                    return res.status(httpStatusCode.OK).json({
                        success: true,
                        message: 'Shop deleted successfully',
                    });
                }
            })
        );
    } else {
        return next(
            new ErrorHandler('Shop id is invalid', httpStatusCode.BAD_REQUEST)
        );
    }
});

exports.cancelRequestForCreatingShop = (req, res, next) => {};

exports.approvedShop = catchAsyncError(async (req, res, next) => {
    const { shopId } = req.params;

    if (mongoose.isValidObjectId(shopId)) {
        Shop.findByIdAndUpdate(
            shopId,
            {
                isApproved: true,
            },
            { new: true }
        )
            .then(async shop => {
                await User.findByIdAndUpdate(shop.user._id, {
                    role: 'shop',
                });

                return res.status(httpStatusCode.OK).json({
                    success: true,
                    message: `${shop.shopName} is approved`,
                    approved: shop.isApproved,
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
            if (err)
                return next(new ErrorHandler(err, httpStatusCode.BAD_REQUEST));

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
