const mongoose = require('mongoose');
const catchAsyncError = require('../middlewares/catchAsyncError');
const Order = require('../models/order');
const Shop = require('../models/shop');
const Product = require('../models/productModal');
const User = require('../models/user');
const Address = require('../models/address');
const httpStatusCode = require('../utils/constansts');
const ErrorHandler = require('../utils/errorHandler');

exports.addOrder = catchAsyncError(async (req, res, next) => {
    let products = [],
        shopIds = [];
    const userId = req.user._id;

    if (req.body.products) {
        req.body.products.forEach(({ productId, quantity }) => {
            products.push({
                productId: mongoose.Types.ObjectId(productId),
                quantity,
            });
        });
    }

    if (products.length > 0) {
        // products.forEach(async ({ productId }) => {
        //     let productObj = await Product.findById(productId).select('shop');

        //     shopIds.push(productObj.shop);
        //     console.log(shopIds);
        // });
        let productObj = await Product.findById(products[0].productId).select('shop');

        if (!shopIds.every(id => id.toString() === shopIds[0].toString())) {
            console.log('false');

            return next(
                new ErrorHandler(
                    'Can not add product of different shop to an order',
                    httpStatusCode.BAD_REQUEST
                )
            );
        }

        let deliveryAddress;

        if (req.body.deliveryAddress) {
            deliveryAddress = req.body.deliveryAddress;
        } else {
            let address = await Address.findOne({
                user: userId,
                isDefault: true,
            }).select('_id');

            if (address) {
                deliveryAddress = address;
            } else {
                return res.status(httpStatusCode.BAD_REQUEST).json({
                    suceess: false,
                    message: 'Please add address',
                });
            }
        }

        const { paymentType, transporter } = req.body;

        const order = new Order({
            user: userId,
            shop: productObj.shop,
            products,
            deliveryAddress,
            paymentType,
            transporter,
        });

        order.save(
            catchAsyncError(async (err, order) => {
                if (err) return next(new ErrorHandler(err, httpStatusCode.BAD_REQUEST));

                if (order) {
                    return res.status(httpStatusCode.CREATED).json({
                        success: true,
                        message: 'Order created successfully',
                        order,
                    });
                }
            })
        );
    } else {
        return next(new ErrorHandler('Can not make an order without product'));
    }
});

exports.getUserOrders = (req, res, next) => {
    Order.find({ user: req.user._id }).exec((err, orders) => {
        if (err) {
            return next(new ErrorHandler(err, httpStatusCode.BAD_REQUEST));
        }

        if (orders) {
            return res.status(httpStatusCode.OK).json({
                success: true,
                message: "User's orders fetched successfully",
                orders_nbm: orders.length,
                orders,
            });
        }
    });
};

exports.getShopOrders = catchAsyncError(async (req, res, next) => {
    const shop = await Shop.findOne({ user: req.user._id });

    Order.find({ shop }).exec((err, orders) => {
        if (err) {
            return next(new ErrorHandler(err, httpStatusCode.BAD_REQUEST));
        }

        if (orders) {
            return res.status(httpStatusCode.OK).json({
                success: true,
                message: "Shop's orders fetched successfully",
                orders_nbm: orders.length,
                orders,
            });
        }
    });
});

exports.getAllOrders = catchAsyncError(async (req, res, next) => {
    const orders = await Order.find({});

    if (!orders) {
        return next(new ErrorHandler('Order not found', httpStatusCode.BAD_REQUEST));
    }

    return res.status(httpStatusCode.OK).json({
        success: true,
        message: 'All orders fetched successfully',
        orders_nbm: orders.length,
        orders,
    });
});

//update order status and order's description
exports.updateOrder = catchAsyncError(async (req, res, next) => {
    const { orderId } = req.params;
    if (mongoose.isValidObjectId(orderId)) {
        const order = await Order.findById(orderId);

        if (!order) {
            return next(new ErrorHandler('Order not found', httpStatusCode.BAD_REQUEST));
        }

        if (req.body.orderStatus) {
            order.orderStatus = req.body.orderStatus;
        }

        if (req.body.shippingInfo) {
            if (!req.query.updateShippingDetail) {
                req.body.shippingInfo.forEach(shippingDetail => {
                    if (shippingDetail.at) {
                        order.shippingInfo.push({
                            shippingDescription: shippingDetail.shippingDescription,
                            at: shippingDetail.at,
                        });
                    } else {
                        order.shippingInfo.push({
                            shippingDescription: shippingDetail.shippingDescription,
                            at: new Date(),
                        });
                    }
                });
            }

            if (req.query.updateShippingDetail === 'true') {
                const { shippingDetailId } = req.query;

                let shippingInfoArray = [];

                req.body.shippingInfo.forEach(shippingDetail => {
                    shippingInfoArray.push(shippingDetail);
                });

                if (Array.isArray(shippingDetailId)) {
                    let i = 0;
                    shippingDetailId.forEach(detailId => {
                        const index = order.shippingInfo.findIndex(
                            ({ _id }) => _id.toString() === detailId.toString()
                        );

                        if (index === -1) {
                            return next(
                                new ErrorHandler(
                                    'Shipping detail not exists',
                                    httpStatusCode.BAD_REQUEST
                                )
                            );
                        }

                        shippingInfoArray[i]._id = detailId;

                        if (shippingInfoArray[i].at) {
                            order.shippingInfo[index] = shippingInfoArray[i];
                        } else {
                            order.shippingInfo[index].shippingDescription =
                                shippingInfoArray[i].shippingDescription;
                            order.shippingInfo[index].at = new Date();
                        }

                        i++;
                    });
                } else {
                    const index = order.shippingInfo.findIndex(
                        ({ _id }) => _id.toString() === shippingDetailId.toString()
                    );

                    if (index === -1) {
                        return next(
                            new ErrorHandler('Product type not exists', httpStatusCode.BAD_REQUEST)
                        );
                    }

                    shippingInfoArray[0]._id = shippingDetailId;

                    if (shippingInfoArray[0].at) {
                        order.shippingInfo[index] = shippingInfoArray[0];
                    } else {
                        order.shippingInfo[index].shippingDescription =
                            shippingInfoArray[0].shoppingDescription;
                        order.shippingInfo[index].at = new Date();
                    }
                }
            }
        }

        if (req.query.deleteShippingDetail === 'true' && !req.body.shippingInfo) {
            const { shippingDetailId } = req.query;

            let modifyArray;

            if (Array.isArray(shippingDetailId)) {
                let afterDeleteArray;

                afterDeleteArray = order.shippingInfo;

                shippingDetailId.forEach(detailId => {
                    afterDeleteArray = afterDeleteArray.filter(
                        ({ _id }) => _id.toString() !== detailId.toString()
                    );
                });

                modifyArray = afterDeleteArray;
            } else {
                modifyArray = order.shippingInfo.filter(
                    ({ _id }) => _id.toString() !== shippingDetailId.toString()
                );
            }

            order.shippingInfo = modifyArray;
        }

        await order.save({ new: true });

        return res.status(httpStatusCode.CREATED).json({
            success: true,
            message: 'Order updated successfully',
            updatedOrder: order,
        });
    } else {
        return next(new ErrorHandler('Order id is invalid'));
    }
});

//Testing
exports.deleteOrder = (req, res, next) => {
    const { orderId } = req.params;

    if (mongoose.isValidObjectId(orderId)) {
        Order.deleteOne({ _id: orderId }).exec(err => {
            if (err) return next(new ErrorHandler(err, httpStatusCode.BAD_REQUEST));

            return res.status(httpStatusCode.OK).json({
                success: true,
                message: 'Order deleted successfully',
            });
        });
    } else {
        return next(new ErrorHandler('Order id is invalid', httpStatusCode.BAD_REQUEST));
    }
};

exports.getUserSingleOrder = catchAsyncError(async (req, res, next) => {
    const { orderId } = req.params;
    const order = await Order.findOne({ user: req.user._id, _id: orderId });

    if (!order) {
        return next(new ErrorHandler('Order not found', httpStatusCode.NOT_FOUND));
    }

    return res.status(httpStatusCode.OK).json({
        success: true,
        message: "User's order fetched successfully",
    });
});
