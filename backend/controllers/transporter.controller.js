const Transporter = require('../models/transporter');
const Product = require('../models/product');
const Order = require('../models/order');
const httpStatusCode = require('../utils/constansts');
const ErrorHandler = require('../utils/errorHandler');
const mongoose = require('mongoose');

exports.addTransporter = (req, res, next) => {
    const {
        transporterName,
        transporterlogo,
        contactNumber,
        policy,
        transportFee,
    } = req.body;

    const transporter = new Transporter({
        transporterName,
        transporterlogo,
        contactNumber,
        policy,
        transportFee,
    });

    transporter.save((err, transporter) => {
        if (err) return next(new ErrorHandler(err, httpStatusCode.BAD_REQUEST));

        if (transporter) {
            return res.status(httpStatusCode.CREATED).json({
                success: true,
                message: 'Transporter created successfully',
                transporter,
            });
        }
    });
};

exports.getAllTransporters = (req, res, next) => {
    Transporter.find({}).exec((err, transporters) => {
        if (err) return next(new ErrorHandler(err, httpStatusCode.BAD_REQUEST));

        if (transporters) {
            return res.status(httpStatusCode.OK).json({
                success: true,
                message: 'All transporter fetched successfully',
                transporters_nbm: transporters.length,
                transporters,
            });
        }
    });
};

exports.getProductTransporters = (req, res, next) => {
    const { productId } = req.params;

    if (mongoose.isValidObjectId(productId)) {
        Product.findById(productId)
            .select('transporters')
            .populate('transporters')
            .exec((err, transporters) => {
                if (err)
                    return next(
                        new ErrorHandler(err, httpStatusCode.BAD_REQUEST)
                    );

                if (transporters) {
                    return res.status(httpStatusCode.OK).json({
                        success: true,
                        message: "Product's transporters fetched successfully",
                        transporters_nbm: transporters.length,
                        transporters,
                    });
                }
            });
    }
};
