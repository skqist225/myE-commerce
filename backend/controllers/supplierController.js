const Supplier = require('../models/supplier');
const Product = require('../models/productModal');
const httpStatusCode = require('../utils/constansts');
const ErrorHandler = require('../utils/errorHandler');
const processImagePath = require('../helpers/processImageSavePath');
const mongoose = require('mongoose');
const catchAsyncError = require('../middlewares/catchAsyncError');
const catchUniqueError = require('../helpers/catchUniqueError');

exports.addSupplier = (req, res, next) => {
    const { supplierName, contactNumber, headquarterAddress, webURL } = req.body;

    let supplierLogo = null;

    if (req.file) {
        supplierLogo = processImagePath(req.file.path);
    }

    Supplier.create({
        supplierName,
        contactNumber,
        headquarterAddress,
        webURL,
        supplierLogo,
    })
        .then(supplier => {
            return res.status(httpStatusCode.CREATED).json({
                success: true,
                message: 'Supplier created successfully',
                supplier,
            });
        })
        .catch(err => {
            catchUniqueError(res, err);

            return next(new ErrorHandler(err, httpStatusCode.BAD_REQUEST));
        });
};

exports.getAllSuppliers = (req, res, next) => {
    Supplier.find({}).exec((err, suppliers) => {
        if (err) return next(new ErrorHandler(err, httpStatusCode.BAD_REQUEST));

        if (suppliers)
            res.status(httpStatusCode.OK).json({
                success: true,
                message: 'All suppliers fetched successfully',
                suppliers,
            });
    });
};

exports.getSingleSupplier = (req, res, next) => {
    if (mongoose.isValidObjectId(req.params.supplierId)) {
        Supplier.findById(req.params.supplierId, (err, supplier) => {
            if (err) return next(new ErrorHandler(err, httpStatusCode.BAD_REQUEST));

            if (supplier)
                res.status(httpStatusCode.OK).json({
                    success: true,
                    message: 'Supplier fetched successfully',
                    supplier,
                });
        });
    }
};

exports.updateSupplier = catchAsyncError(async (req, res, next) => {
    const { supplierId: _id } = req.params;

    if (mongoose.isValidObjectId(supplier)) {
        let supplierUpdateInfo = {};

        Object.keys(req.body).forEach(key => {
            if (typeof req.body[key] !== 'undefined') {
                supplierUpdateInfo[key] = req.body[key];
            }
        });

        if (req.file) {
            isSaveFolderExist(req, res, 'supplier');
            supplierUpdateInfo.supplierLogo = processImagePath(req.file.path);
        }

        Supplier.findOneAndUpdate(
            { _id, isVerified: true },
            supplierUpdateInfo,
            { runValidators: true, new: true },
            (err, supplier) => {
                if (err) return next(new ErrorHandler(err, httpStatusCode.BAD_REQUEST));

                if (!supplier) {
                    res.status(httpStatusCode.NOT_FOUND).json({
                        success: false,
                        message: 'Supplier not found',
                    });
                }

                res.status(httpStatusCode.CREATED).json({
                    successMessage: `Update ${supplier.supplierName} successfully`,
                    supplier,
                });
            }
        );
    }
});

exports.verifySupplier = (req, res, next) => {
    const { supplierId } = req.params;

    if (mongoose.isValidObjectId(supplierId)) {
        Supplier.findByIdAndUpdate(supplierId, { isVerified: true }).exec((err, supplier) => {
            if (err) next(new ErrorHandler(err, httpStatusCode.BAD_REQUEST));

            if (supplier) {
                res.status(httpStatusCode.OK).json({
                    success: true,
                    message: `${supplier.supplierName} is verified`,
                });
            }
        });
    }
};

exports.deleteSupplier = catchAsyncError(async (req, res, next) => {
    const { supplierId } = req.params;

    if (mongoose.isValidObjectId(supplierId)) {
        const supplier = await Supplier.findById(supplierId);

        const product = await Product.findOne({ supplier: supplierId });

        if (!supplier.isVerified) {
            if (!product) {
                Supplier.deleteOne({ _id: supplierId }, err => {
                    if (err) return next(new ErrorHandler(err, httpStatusCode.BAD_REQUEST));

                    res.status(httpStatusCode.OK).json({
                        success: true,
                        message: 'Supplier deleted successfully',
                    });
                });
            } else {
                return next(
                    new ErrorHandler(
                        'This supplier is linking with some products, can not remove it now ',
                        httpStatusCode.FORBIDDEN
                    )
                );
            }
        } else {
            return next(
                new ErrorHandler(
                    'This supplier had been verified so that you can not delete it',
                    httpStatusCode.FORBIDDEN
                )
            );
        }
    }
});
