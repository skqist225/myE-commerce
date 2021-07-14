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

            // if (review) {
            //     review.comment = comment;
            //     review.rating = rating;
            //     review.rateAt = new Date();
            //     if (req.files) {
            //         review.pictures = pictures;
            //     }

            //     await review.save({ new: true });

            //     res.status(httpStatusCode.CREATED).json({
            //         successMessage: 'Review created successfully',
            //         review,
            //     });
            // } else {
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
            // }
        });
    } else {
        return next(new ErrorHandler('Product id is invalid', httpStatusCode.BAD_REQUEST));
    }
};

exports.likeReview = async (req, res, next) => {
    const { reviewId: _id } = req.params;
    const { _id: user } = req.user;

    if (mongoose.Types.ObjectId) {
        const review = await Review.findOne({ _id, userLikes: { $in: [user] } }).select(
            'userLikes'
        );
        // .lean();

        if (review) {
            review.userLikes = review.userLikes.filter(
                $user => $user.toString() !== user.toString()
            );
            review.save({ new: true });
            res.status(httpStatusCode.OK).json({
                successMessage: 'Unlike Review successfully',
                review,
            });
            // Review.findOneAndUpdate(
            //     { _id },
            //     { $pull: { userLikes: mongoose.Types.ObjectId(user) } },
            //     { new: true }
            // )
            //     .select('userLikes')
            //     .exec((err, review) => {
            //         if (err) return next(new ErrorHandler(err, httpStatusCode.BAD_REQUEST));

            //         if (review) {
            //             res.status(httpStatusCode.OK).json({
            //                 successMessage: 'Unlike Review successfully',
            //                 review,
            //             });
            //         }
            //     });
        } else {
            if (review.userLikes) {
                review.userLikes.push(mongoose.Types.ObjectId(user));
            } else {
                review.userLikes = [mongoose.Types.ObjectId(user)];
            }
            review.save({ new: true });

            res.status(httpStatusCode.OK).json({
                successMessage: 'Like Review successfully',
                review,
            });
            // Review.findOneAndUpdate(
            //     { _id },
            //     { $push: { userLikes: mongoose.Types.ObjectId(user) } },
            //     { new: true }
            // )
            //     .select('userLikes')
            //     .exec((err, review) => {
            //         if (err) return next(new ErrorHandler(err, httpStatusCode.BAD_REQUEST));

            //         if (review) {
            //             res.status(httpStatusCode.OK).json({
            //                 successMessage: 'Like review successfully',
            //                 review,
            //             });
            //         }
            //     });
        }
    }
};

exports.getProductReviews = catchAsyncError(async (req, res, next) => {
    const { productId: product } = req.params;

    if (mongoose.isValidObjectId(product)) {
        const $reviews = Review.aggregate([
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
                $project: {
                    'user.username': 1,
                    'user.avatar': 1,
                    'product.productTypes': 1,
                    productTypeId: 1,
                    comment: 1,
                    pictures: 1,
                    video: 1,
                    rating: 1,
                    maskName: 1,
                    avgRatings: 1,
                    userLikes: 1,
                    createdAt: {
                        $toDate: '$_id',
                    },
                },
            },
        ]);
        let reviews;
        let successMessage = "Product's reviews fetched successfully";
        if (req.query.star) {
            if (req.query.star !== 'haveMedia' && req.query.star !== 'haveComment') {
                $reviews.match({ rating: req.query.star * 1 });
            } else if (req.query.star === 'haveComment') {
                $reviews.match({ comment: { $exists: true } });
                $reviews.redact({
                    $cond: {
                        if: { $gt: [{ $strLenCP: '$comment' }, 0] },
                        then: '$$KEEP',
                        else: '$$PRUNE',
                    },
                });
            } else {
                $reviews.match({ pictures: { $exists: true } });
                $reviews.redact({
                    $cond: {
                        if: { $gt: [{ $size: '$pictures' }, 0] },
                        then: '$$KEEP',
                        else: '$$PRUNE',
                    },
                });
            }

            successMessage = `Reviews ${req.query.star} fetched successfully`;
        }

        reviews = await $reviews;

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

        const avgRatings = await Review.aggregate([
            {
                $match: { product: mongoose.Types.ObjectId(product) },
            },
            {
                $group: { _id: '$product', avgRatings: { $avg: '$rating' } },
            },
        ]);

        res.status(httpStatusCode.OK).json({
            successMessage,
            reviews,
            ratingsPerStar,
            avgRatings,
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
