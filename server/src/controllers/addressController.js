const Address = require('../models/address');
const Order = require('../models/order');
const User = require('../models/user');
const httpStatusCode = require('../utils/constansts');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../middlewares/catchAsyncError');
const catchUniqueError = require('../helpers/catchUniqueError');
const mongoose = require('mongoose');

exports.addAddress = (req, res, next) => {
    const { _id: user } = req.user;

    Object.keys(req.body).forEach(field => {
        if (req.body[field] === '' || req.body[field] === 'undefined') {
            req.body[field] = undefined;
        }
    });

    const { contactNumber, country, city, province, county, ward, street, addressType, isDefault } =
        req.body;

    const address = new Address({
        user,
        contactNumber,
        country,
        province,
        city,
        county,
        ward,
        street,
        isDefault,
        addressType,
    });

    address.save(
        catchAsyncError(async (err, address) => {
            catchUniqueError(res, err);
            if (err) return next(new ErrorHandler(err, httpStatusCode.BAD_REQUEST));

            if (address) {
                return res.status(httpStatusCode.CREATED).json({
                    successMessage: 'Address created successfully',
                    address,
                });
            }
        })
    );
};

exports.deleteAddress = catchAsyncError(async (req, res, next) => {
    const { addressId } = req.params;

    if (mongoose.isValidObjectId(addressId)) {
        const address = await Address.findById(addressId);

        if (!address) return next(new ErrorHandler('Address not exist', httpStatusCode.NOT_FOUND));

        if (address.isDefault) {
            return next(
                new ErrorHandler('You can not delete default address', httpStatusCode.BAD_REQUEST)
            );
        }

        const order = await Order.findOne({
            deliveryAddress: addressId,
            isPaid: false,
        });

        if (order) {
            return next(
                new ErrorHandler(
                    'There is order that using this address has been still not completed so that you can delete it',
                    httpStatusCode.BAD_REQUEST
                )
            );
        }

        Address.deleteOne({ _id: addressId }, function (err) {
            if (err) return next(new ErrorHandler(err, httpStatusCode.BAD_REQUEST));

            return res.status(httpStatusCode.OK).json({
                success: true,
                message: 'Address deleted successfully',
            });
        });
    } else {
        return next(new ErrorHandler('Address id is invalid', httpStatusCode.BAD_REQUEST));
    }
});

exports.updateAddress = catchAsyncError(async (req, res, next) => {
    const { addressId } = req.params;

    if (mongoose.isValidObjectId(addressId)) {
        const address = await Address.findById(addressId);

        let updatedAddress = address;

        Object.keys(req.body).forEach(field => {
            if (!Array.isArray(field)) {
                updatedAddress[field] = req.body[field];
            }
        });

        Address.findByIdAndUpdate(
            addressId,
            updatedAddress,
            { runValidatros: true, new: true },
            (err, newAddress) => {
                if (err) return next(new ErrorHandler(err, httpStatusCode.BAD_REQUEST));

                if (newAddress)
                    return res.status(httpStatusCode.OK).json({
                        success: true,
                        message: "User's address updated successfully",
                        updatedAddress: newAddress,
                    });
            }
        );
    }
});

exports.getUserAddresses = async (req, res, next) => {
    const { _id: user } = req.user;

    const userAddresses = await Address.aggregate([
        {
            $match: {
                user,
            },
        },
        {
            $lookup: {
                from: 'users',
                localField: 'user',
                foreignField: '_id',
                as: 'user',
            },
        },
        {
            $unwind: '$user',
        },
        {
            $group: {
                _id: '$user._id',
                user: { $mergeObjects: '$user' },
                shippingInfo: {
                    $push: '$$ROOT',
                },
            },
        },
        {
            $project: {
                'user.firstName': 1,
                'user.lastName': 1,
                shippingInfo: 1,
                _id: 1,
            },
        },
        {
            $project: {
                'shippingInfo.user': 0,
            },
        },
    ]);

    return res.status(httpStatusCode.OK).json({
        successMessage: "User's addresses fetched successfully",
        userAddresses: userAddresses[0],
    });
};

//DEVNOTIFY testing purpose
exports.deleteAllUserAddresses = async (req, res, next) => {
    const response = await Address.deleteMany();

    if (response)
        res.status(httpStatusCode.OK).json({
            successMessage: 'deleted successfully',
        });
};
