const Voucher = require('../models/voucher');
const Shop = require('../models/shop');
const httpStatusCode = require('../utils/constansts');
const ErrorHandler = require('../utils/errorHandler');

exports.addShopVoucher = (req, res, next) => {
    const { isFreeshipVoucher } = req.body;

    let _voucher;

    if (isFreeshipVoucher) {
        _voucher = {
            voucherImage,
            end,
            amount,
            voucherDescription,
            isFreeshipVoucher,
        };
    } else {
        _voucher = {
            discountPrice,
            onWhatPriceOfProduct,
            voucherImage,
            end,
            amount,
        };
    }

    const voucher = new Voucher(_voucher);

    voucher.save((err, voucher) => {
        if (err) return next(new ErrorHandler(err, httpStatusCode.BAD_REQUEST));

        if (voucher) {
            Shop.findOne({ user: req.user._id }, async (err, shop) => {
                if (err) return next(new ErrorHandler(err, httpStatusCode.BAD_REQUEST));

                if (shop) {
                    shop.vouchers.push(voucher);

                    await shop.save();
                }
            });

            return res.status(httpStatusCode.CREATED).json({
                success: true,
                message: 'Voucher created successfully',
                voucher,
            });
        }
    });
};

exports.addAdminVoucher = (req, res, next) => {
    const { discountPrice, onWhatPriceOfProduct, voucherImage, end, amount } = req.body;

    const voucher = new Voucher({
        discountPrice,
        onWhatPriceOfProduct,
        voucherImage,
        end,
        amount,
    });

    voucher.save((err, voucher) => {
        if (err) return next(new ErrorHandler(err, httpStatusCode.BAD_REQUEST));

        if (voucher)
            return res.status(httpStatusCode.CREATED).json({
                success: true,
                message: 'Voucher created successfully',
                voucher,
            });
    });
};
