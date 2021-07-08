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
            return res.status(httpStatusCode.OK).json({
                success: true,
                message: 'All suppliers fetched successfully',
                suppliers_nbm: suppliers.length,
                suppliers,
            });
    });
};

exports.getSingleSupplier = (req, res, next) => {
    if (mongoose.isValidObjectId(req.params.supplierId)) {
        Supplier.findById(req.params.supplierId, (err, supplier) => {
            if (err) return next(new ErrorHandler(err, httpStatusCode.BAD_REQUEST));

            if (supplier)
                return res.status(httpStatusCode.OK).json({
                    success: true,
                    message: 'Supplier fetched successfully',
                    supplier,
                });
        });
    }
};

exports.updateSupplier = catchAsyncError(async (req, res, next) => {
    const { supplierId } = req.params;

    if (mongoose.isValidObjectId(supplierId)) {
        const oldSupplier = await Supplier.findById(supplierId);

        const { supplierName, contactNumber, headquarterAddress, webURL } = req.body;

        let newSupplier = {
            supplierName,
            contactNumber,
            headquarterAddress,
            webURL,
        };

        if (req.file) {
            newSupplier.supplierLogo = processImagePath(req.file.path);
        }

        if (!oldSupplier.isVerified) {
            Supplier.findByIdAndUpdate(
                supplierId,
                newSupplier,
                { runValidators: true, new: true },
                (err, supplier) => {
                    if (err) return next(new ErrorHandler(err, httpStatusCode.BAD_REQUEST));

                    if (supplier)
                        return res.status(httpStatusCode.CREATED).json({
                            success: true,
                            message: 'Update supplier successfully',
                            updatedSupplier: supplier,
                        });
                }
            );
        } else {
            return next(
                new ErrorHandler(
                    'This supplier had been verified so that you can modify its information',
                    httpStatusCode.FORBIDDEN
                )
            );
        }
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
