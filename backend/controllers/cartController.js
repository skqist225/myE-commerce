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
                    res.status(httpStatusCode.CREATED).json({ result });
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
                        cart,
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

    Promise.all(promiseArray).then(response =>
        res
            .status(httpStatusCode.ACCEPTED)
            .json({
                success: true,
                message: 'Products cart updated successfully',
                response,
            })
            .catch(err => res.status(httpStatusCode.BAD_REQUEST).json({ err }))
    );
};

exports.getUserCart = (req, res, next) => {
    Cart.findOne({ user: req.user._id })
        .populate('cartProducts.productId', 'productName productType')
        .exec((err, cart) => {
            if (err) return next(new ErrorHandler(err, httpStatusCode.BAD_REQUEST));

            if (cart) {
                let _cart = cart;
                let i = 0;

                cart.cartProducts.forEach(cartProduct => {
                    let _productType;
                    _productType = cartProduct.productId.productType.filter(
                        ({ _id }) => _id.toString() === cartProduct.productTypeId.toString()
                    );

                    _cart.cartProducts[i].productId.productType = _productType;
                    i++;
                });

                return res.status(httpStatusCode.OK).json({
                    success: true,
                    message: 'Cart created successfully',
                    cart_products_nbm: cart.cartProducts.length,
                    cart: _cart,
                });
            }
        });
};

//Testing
exports.deleteCart = catchAsyncError(async (req, res, next) => {
    const cart = await Cart.findOne({ user: req.user._id });

    if (cart.cartProducts.length === 0) {
        Cart.deleteOne({ user: req.user._id }).exec(err => {
            if (err) return next(new ErrorHandler(err, httpStatusCode.BAD_REQUEST));

            return res.status(httpStatusCode.OK).json({
                success: true,
                message: 'Cart deleted successfully',
            });
        });
    }
});
