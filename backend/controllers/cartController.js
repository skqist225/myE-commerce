const Cart = require('../models/cart');
const Product = require('../models/productModal');
const ErrorHandler = require('../utils/errorHandler');
const httpStatusCode = require('../utils/constansts');
const catchAsyncError = require('../middlewares/catchAsyncError');
const mongoose = require('mongoose');

function runUpdate(condition, updateData) {
    return new Promise((resolve, reject) => {
        Cart.findOneAndUpdate(condition, updateData, {
            upsert: true,
            new: true,
        })
            .then(result => resolve(result))
            .catch(err => reject(err));
    });
}

exports.addToCart = (req, res, next) => {
    const { cartProduct } = req.body;
    const { _id: user } = req.user;

    Cart.findOne({ user }).exec((err, cart) => {
        if (err) return next(new ErrorHandler(err, httpStatusCode.BAD_REQUEST));

        if (cart) {
            const _product = cart.cartProducts.find(
                ({ productId }) => productId.toString() === cartProduct.productId.toString()
            );

            let condition, update;

            if (_product) {
                condition = {
                    user,
                    'cartProducts.productId': cartProduct.productId,
                };

                //DEVNOTIFY it should work in 2 case: product have 1 types and many types
                if (req.body.productTypeId) {
                    condition = {
                        ...condition,
                        'cartProducts.productTypeId': cartProduct.productTypeId,
                    };
                }

                update = {
                    $set: {
                        'cartProducts.$': cartProduct,
                    },
                };
            } else {
                condition = {
                    user,
                };
                update = {
                    $push: {
                        cartProducts: cartProduct,
                    },
                };
            }

            runUpdate(condition, update)
                .then(result => {
                    res.status(httpStatusCode.CREATED).json({
                        successMessage: 'acs',
                        cart: result,
                    });
                })
                .catch(error => res.status(httpStatusCode.BAD_REQUEST).json({ error }));
        } else {
            const cart = new Cart({
                user,
                cartProducts: [cartProduct],
            });

            cart.save((err, cart) => {
                if (err) return next(new ErrorHandler(err, httpStatusCode.BAD_REQUEST));

                if (cart) {
                    return res.status(httpStatusCode.CREATED).json({
                        successMessage: 'Cart created successfully',
                    });
                }
            });
        }
    });
};

function runUpdateCart(updateData, req) {
    return new Promise((resolve, reject) => {
        Cart.findOneAndUpdate({ user: req.user._id }, updateData, { new: true })
            .then(result => resolve(result))
            .catch(err => reject(err));
    });
}

exports.removeCartProducts = (req, res, next) => {
    const { removedProducts } = req.body;
    let promiseArray = [];

    removedProducts.forEach(product => {
        if (mongoose.isValidObjectId(product)) {
            let updateData;

            updateData = {
                $pull: {
                    cartProducts: {
                        productId: product,
                    },
                },
            };

            promiseArray.push(runUpdateCart(updateData, req));
        } else {
            return next(new ErrorHandler('Product id is invalid ', httpStatusCode.BAD_REQUEST));
        }
    });

    Promise.all(promiseArray)
        .then(response =>
            res.status(httpStatusCode.ACCEPTED).json({
                successMessage: 'Products cart updated successfully',
            })
        )
        .catch(err => next(new ErrorHandler(err, httpStatusCode.BAD_REQUEST)));
};

exports.getUserCart = async (req, res, next) => {
    const cart = await Cart.aggregate([
        {
            $match: { user: mongoose.Types.ObjectId(req.user._id) },
        },
        {
            $unwind: '$cartProducts',
        },
        {
            $lookup: {
                from: 'products',
                localField: 'cartProducts.productId',
                foreignField: '_id',
                as: 'product',
            },
        },
        {
            $project: {
                'product.description': 0,
                'product.category': 0,
                'product.supplier': 0,
                'product.images': 0,
                'product.transporters': 0,
                'product.soldNumber': 0,
                'product.productWeight': 0,
                'product.createdAt': 0,
                'product.updatedAt': 0,
                'product.__v': 0,
                user: 0,
                createdAt: 0,
                updatedAt: 0,
                __v: 0,
            },
        },
        {
            $unwind: '$product',
        },
        {
            $unwind: '$product.productTypes',
        },
        {
            $redact: {
                $cond: {
                    if: { $eq: ['$cartProducts.productTypeId', '$product.productTypes._id'] },
                    then: '$$KEEP',
                    else: '$$PRUNE',
                },
            },
        },
        {
            $lookup: {
                from: 'shops',
                localField: 'product.shop',
                foreignField: '_id',
                as: 'shop',
            },
        },
        { $unwind: '$shop' },
        {
            $project: {
                'shop.homeImages': 0,
                'shop.isApproved': 0,
                'shop.vouchers': 0,
                'shop.shopDescription': 0,
                'shop.user': 0,
                'shop.followers_nbm': 0,
                'shop.createdAt': 0,
                'shop.updatedAt': 0,
                'shop.shopCategory': 0,
                'shop.__v': 0,
            },
        },
        {
            $addFields: {
                quantity: '$cartProducts.quantity',
            },
        },
        {
            $project: {
                cartProducts: 0,
            },
        },
        {
            $group: {
                _id: '$shop.shopName',
                shop: { $mergeObjects: '$shop' },
                products: {
                    $push: '$$ROOT',
                },
                count: { $sum: 1 },
            },
        },
        {
            $project: {
                'products.shop': 0,
                'products.product.shop': 0,
            },
        },
    ]);

    res.status(httpStatusCode.OK).json({
        successMessage: "Fetch user's cart successfully",
        cart,
    });
};

//Testing
exports.deleteUserCart = catchAsyncError(async (req, res, next) => {
    const { _id: user } = req.user;

    Cart.deleteOne({ user }).exec(err => {
        if (err) return next(new ErrorHandler(err, httpStatusCode.BAD_REQUEST));

        return res.status(httpStatusCode.OK).json({
            successMessage: 'Cart deleted successfully',
        });
    });
});
