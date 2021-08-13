const Transporter = require('../models/transporter');
const Product = require('../models/productModal');
const Order = require('../models/order');
const httpStatusCode = require('../utils/constansts');
const ErrorHandler = require('../utils/errorHandler');
const mongoose = require('mongoose');
const processImagePath = require('../helpers/processImageSavePath');
const isSaveFolderExist = require('../helpers/isSaveFolderExist');
const catchAsyncError = require('../middlewares/catchAsyncError');

exports.addTransporter = (req, res, next) => {
    let transporterAddInfo = {};

    Object.keys(req.body).forEach(key => {
        if (typeof req.body[key] !== 'undefined') {
            transporterAddInfo[key] = req.body[key];
        }
    });

    if (req.file) {
        transporterAddInfo[transporterLogo] = processImagePath(req.file.path);
    }

    const transporter = new Transporter(transporterAddInfo);

    transporter.save((err, transporter) => {
        if (err) return next(new ErrorHandler(err, httpStatusCode.BAD_REQUEST));

        if (transporter) {
            return res.status(httpStatusCode.CREATED).json({
                success: true,
                successMessage: 'Transporter created successfully',
                transporter,
            });
        }
    });
};

exports.updateTransporter = async (req, res, next) => {
    const { transporterId: transporter } = req.params;
    let transporterUpdateInfo = {};

    Object.keys(req.body).forEach(key => {
        if (typeof req.body[key] !== 'undefined') {
            transporterUpdateInfo[key] = req.body[key];
        }
    });

    if (req.files) {
        transporterUpdateInfo[transporterLogo] = req.files[0];
    }

    Transporter.findByIdAndUpdate(
        transporter,
        transporterUpdateInfo,
        { new: true },
        (err, transporter) => {
            if (!transporter) {
                res.status(httpStatusCode.NOT_FOUND).json({
                    success: false,
                    message: 'Transporter not found',
                });
            }
            res.status(httpStatusCode.OK).json({
                successMessage: `${transporter.transporterName} updated successfully`,
                transporter,
            });
        }
    );
};

exports.getAllTransporters = catchAsyncError(async (req, res, next) => {
    const transporters = await Transporter.find();

    res.status(httpStatusCode.OK).json({
        successMessage: 'All transporter fetched successfully',
        transporters,
    });
});

exports.getProductTransporters = (req, res, next) => {
    const { productId: product } = req.params;

    if (!mongoose.isValidObjectId(product)) {
        res.status(httpStatusCode.BAD_REQUEST).json({ message: 'Product ID is invalid' });
    }

    Product.findById(product)
        .select('transporters')
        .populate('transporters')
        .exec((err, transporters) => {
            if (err) return next(new ErrorHandler(err, httpStatusCode.BAD_REQUEST));
            if (transporters) {
                return res.status(httpStatusCode.OK).json({
                    successMessage: "Product's transporters fetched successfully",
                    transporters,
                });
            }
        });
};
