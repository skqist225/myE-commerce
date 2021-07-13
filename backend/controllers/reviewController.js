const Review = require('../models/review');
const mongoose = require('mongoose');
const processImagePath = require('../helpers/processImageSavePath');
const ErrorHandler = require('../utils/errorHandler');
const httpStatusCode = require('../utils/constansts');
const catchAsyncError = require('../middlewares/catchAsyncError');

exports.createProductReview = (req, res, next) => {
    const { productId: product } = req.params; //DEVNOTIFY product coming from req.params

    if (mongoose.isValidObjectId(product)) {
        const { comment, rating } = req.body;

        let pictures = [];

        let reviewObj = {
            user: req.user._id,
            product,
            comment,
            rating: Number(rating),
            rateAt: new Date(),
        };

        if (req.files) {
            req.files.forEach(file => {
                pictures.push(processImagePath(file.path));
            });
            reviewObj.pictures = pictures;
        }

        Review.findOne({ product, user: req.user._id }).exec(async (err, review) => {
            if (err) return next(new ErrorHandler(err, httpStatusCode.BAD_REQUEST));

            if (review) {
                review.comment = comment;
                review.rating = rating;
                review.rateAt = new Date();
                if (req.files) {
                    review.pictures = pictures;
                }

                await review.save({ new: true });

                res.status(httpStatusCode.CREATED).json({
                    successMessage: 'Review created successfully',
                    review,
                });
            } else {
                const _review = new Review(reviewObj);

                _review.save((err, review) => {
                    if (err) return next(new ErrorHandler(err, httpStatusCode.BAD_REQUEST));

                    if (review) {
                        res.status(httpStatusCode.CREATED).json({
                            successMessage: 'Review created successfully',
                            review,
                        });
                    }
                });
            }
        });
    } else {
        return next(new ErrorHandler('Product id is invalid', httpStatusCode.BAD_REQUEST));
    }
};

exports.likeReview = async (req, res, next) => {
    const { reviewId: _id } = req.params;
    const { amount } = req.body;

    if (mongoose.Types.ObjectId) {
        const review = await Review.findOneAndUpdate(
            { _id },
            { $inc: { number_of_likes: amount } },
            { new: true }
        )
            .select('number_of_likes')
            .lean();

        res.status(httpStatusCode.OK).json({
            successMessage: 'Like Review successfully',
            review,
        });
    }
};

exports.getProductReviews = catchAsyncError(async (req, res, next) => {
    const { productId: product } = req.params;

    if (mongoose.isValidObjectId(product)) {
        const reviews = await Review.aggregate([
            {
                $match: { product: mongoose.Types.ObjectId(product) },
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
                $lookup: {
                    from: 'products',
                    localField: 'product',
                    foreignField: '_id',
                    as: 'product',
                },
            },
            {
                $unwind: '$product',
            },

            {
                $addFields: {
                    avgRatings: { $avg: '$rating' },
                },
            },
            {
                $project: {
                    'user.username': 1,
                    'user.avatar': 1,
                    'product.productTypes': 1,
                    productTypeId: 1,
                    comment: 1,
                    pictures: 1,
                    video: 1,
                    rating: 1,
                    number_of_likes: 1,
                    maskName: 1,
                    createdAt: {
                        $toDate: '$_id',
                    },
                },
            },
        ]);

        const ratingsPerStar = await Review.aggregate([
            {
                $match: { product: mongoose.Types.ObjectId(product) },
            },
            {
                $group: {
                    _id: '$rating',
                    number_of_ratings: { $sum: 1 },
                },
            },
        ]);

        res.status(httpStatusCode.OK).json({
            succesMessage: "Product's reviews fetched successfully",
            reviews,
            ratingsPerStar,
        });
    }
});

exports.getAllReviews = async (req, res) => {
    const reviews = await Review.find({});

    res.status(httpStatusCode.OK).json({
        succesMessage: 'sucess',
        reviews,
    });
};

exports.getUserReviews = catchAsyncError(async (req, res, next) => {
    const reviews = await Review.find({ user: req.user._id }).populate(
        'product',
        'productType productName'
    );

    return res.status(httpStatusCode.OK).json({
        succes: true,
        message: "User's review fetched successfully",
        reviews_nbm: reviews.length,
        reviews,
    });
});

exports.deleteReview = catchAsyncError(async (req, res, next) => {
    const { reviewId } = req.params;

    if (mongoose.isValidObjectId(reviewId)) {
        Review.deleteOne({ user: req.user._id, _id: reviewId }, err => {
            if (err) return next(new ErrorHandler(err, httpStatusCode.BAD_REQUEST));

            return res.status(httpStatusCode.OK).json({
                succes: true,
                message: 'Review deleted successfully',
            });
        });
    }
});
