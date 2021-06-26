const Transporter = require('../models/transporter');
const Product = require('../models/product');
const Order = require('../models/order');
const httpStatusCode = require('../utils/constansts');
const ErrorHandler = require('../utils/errorHandler');
const mongoose = require('mongoose');
const processImagePath = require('../helpers/processImageSavePath');

exports.addTransporter = (req, res, next) => {
    const {
        transporterName,
        contactNumber,
        policy,
        transportFee,
        pickUpArea,
        deliveryArea,
    } = req.body;

    let transporterLogo;
    if (req.file) {
        transporterLogo = processImagePath(req.file.path);
    } else {
        return res
            .status(httpStatusCode.BAD_REQUEST)
            .json({ errorMessage: 'Please select transporter logo' });
    }

    const transporter = new Transporter({
        transporterName,
        transporterLogo,
        contactNumber,
        policy,
        transportFee,
        pickUpArea,
        deliveryArea,
    });

    transporter.save((err, transporter) => {
        if (err)
            res.status(httpStatusCode.BAD_REQUEST).json({ errorMessage: err });

        if (transporter) {
            return res.status(httpStatusCode.CREATED).json({
                success: true,
                successMessage: 'Transporter created successfully',
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
