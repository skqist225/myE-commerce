const Transporter = require('../models/transporter');
const Product = require('../models/productModal');
const Order = require('../models/order');
const httpStatusCode = require('../utils/constansts');
const ErrorHandler = require('../utils/errorHandler');
const mongoose = require('mongoose');
const processImagePath = require('../helpers/processImageSavePath');

exports.addTransporter = (req, res, next) => {
    const { transporterName, contactNumber, policy, transportFee, pickUpArea, deliveryArea } =
        req.body;

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
        if (err) res.status(httpStatusCode.BAD_REQUEST).json({ errorMessage: err });

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
    const { transporterId } = req.params;

    const transporter = await Transporter.findById(transporterId);

    if (!transporter) return next(new ErrorHandler(err, httpStatusCode.BAD_REQUEST));

    let updatedTransporter = transporter;

    Object.keys(req.body).forEach(key => {
        updatedTransporter[key] = req.body[key];
    });

    if (req.files) {
        updatedTransporter[transporterLogo] = req.files[0];
    }

    Transporter.findByIdAndUpdate(
        transporterId,
        updatedTransporter,
        { new: true },
        (err, newTransporter) => {
            return res.status(httpStatusCode.OK).json({
                successMessage: `${newTransporter.transporterName} updated successfully`,
                updatedTransporter: newTransporter,
            });
        }
    );
};

exports.getAllTransporters = (req, res, next) => {
    Transporter.find({}).exec((err, transporters) => {
        if (err) return next(new ErrorHandler(err, httpStatusCode.BAD_REQUEST));

        if (transporters) {
            return res.status(httpStatusCode.OK).json({
                successMessage: 'All transporter fetched successfully',
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
                if (err) return next(new ErrorHandler(err, httpStatusCode.BAD_REQUEST));

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
