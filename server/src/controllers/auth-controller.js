const User = require('../models/user');
const sendToken = require('../utils/jwtToken');
const httpStatusCode = require('../utils/constansts');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../middlewares/catchAsyncError');
const mongoose = require('mongoose');
const processImagePath = require('../helpers/processImageSavePath');
const deleteImage = require('../helpers/deleteImage');
const deleteCollection = require('../helpers/deleteCollection');
const sendEmail = require('../helpers/sendEmail');
const RequestValidationError = require('../errors/request-validation-error');
const BadRequestError = require('../errors/bad-request-error');
const NotFoundError = require('../errors/not-found-error');
const crypto = require('crypto');
const ForbiddenError = require('../errors/forbidden-error');

exports.registerUser = catchAsyncError(async (req, res, next) => {
    const existingUser = await User.findOne({ username: req.body.username })
        .select('_id')
        .lean();

    if (existingUser) {
        return next(new BadRequestError('User already registered'));
    }

    // if(req.role) {

    // }

    const user = new User(req.body);
    await user.save();

    sendToken(user, httpStatusCode.OK, res);
});

exports.loginUser = catchAsyncError(async (req, res, next) => {
    const { username, password } = req.body;

    if (!username || !password)
        return next(
            new RequestValidationError([{ message: 'Please enter username & password' }])
        );

    const user = await User.findOne({ username }).select('+password');
    if (!user) {
        return next(new BadRequestError('user not found'));
    }

    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched) {
        return next(
            new BadRequestError('Password does not match or user name is invalid')
        );
    }

    sendToken(user, httpStatusCode.OK, res);
});

exports.logoutUser = (req, res, next) => {
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    });

    return res.status(httpStatusCode.OK).json({
        successMessage: 'User logged out',
    });
};

exports.updateUser = catchAsyncError(async (req, res, next) => {
    let user;

    if (req.params.userId) {
        user = await User.findById(req.params.userId);
    } else {
        user = req.user;
    }

    Object.keys(req.body).forEach(field => {
        if (!Array.isArray(req.body[field]) && req.body[field] !== 'identityCard') {
            user[field] = req.body[field];
        }
    });

    if (req.files.avatar) {
        user.avatar = processImagePath(req.files.avatar[0].path);
    }

    if (req.body.addresses) {
        req.body.addresses.forEach(address => {
            user.addresses.push(address);
        });
    }

    if (user.isIdenityInfoVerified) {
        return next(
            new ForbiddenError('You can change identity info after it had been set')
        );
    }

    if (req.body.identityCard) {
        let _identityCard = {
            number: '',
            cardImage: [],
        };

        const {
            identityCard: { number },
        } = req.body;
        const errors = [];

        if (!number) {
            errors.push({
                message: 'Card number is required',
                field: 'identityCard.number',
            });
        }

        if (req.files['identityCard[cardImage][]'] === undefined) {
            errors.push({
                message: 'Card image is required',
                field: 'identityCard.cardImage',
            });
        }

        if (number.length < 9 || number.length > 12) {
            errors.push({
                message: 'Invalid number length',
                field: 'identityCard.number',
            });
        }

        if (errors.length > 0) {
            return next(new RequestValidationError(errors));
        }

        req.files['identityCard[cardImage][]'].forEach(({ path }) => {
            _identityCard.cardImage.push(processImagePath(path));
        });

        user.identityCard = _identityCard;
    }

    await user.save();
    res.send({
        successMessage: 'User updated successfully',
        updated: user,
    });
});

exports.forgotPassword = catchAsyncError(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
        return next(new NotFoundError('User not found'));
    }

    const resetToken = await user.getResetPasswordToken();
    const resetUrl = `${req.protocol}://${req.get('host')}/password/reset/${resetToken}`;
    const message = `Your password reset token is as follow:\n\n${resetUrl}\n\nIf you have not requested this email, then ignore it.`;

    sendEmail({
        email: user.email,
        subject: 'Welcome to myE-commerce',
        message,
    })
        .then(result => {
            res.status(httpStatusCode.OK).json({
                successMessage: `Email sent to ${user.email}`,
            });
        })
        .catch(async error => {
            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;

            console.log(error);

            await user.save({ validateBeforeSave: false });
            return next(new ErrorHandler(error.message, httpStatusCode.INTERNAL_SERVER));
        });
});

exports.resetPassword = catchAsyncError(async (req, res, next) => {
    const resetPasswordToken = crypto
        .createHash('sha256')
        .update(req.params.resetToken)
        .digest('hex');

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user)
        return next(
            new NotFoundError('Password reset token is invalid or has been expired')
        );

    if (req.body.password !== req.body.confirmPassword) {
        return next(new BadRequestError('Password does not match'));
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    sendToken(user, httpStatusCode.OK, res);
});

exports.getUserProfile = catchAsyncError(async (req, res, next) => {
    res.send({
        successMessage: "User's profile fetched successfully",
        user: req.user,
    });
});

exports.followOtherUsers = catchAsyncError(async (req, res, next) => {
    const followedUser = await User.findById(req.params.userId)
        .select('_id role firstName lastName')
        .lean();

    if (!followedUser) {
        return next(new NotFoundError('User not found'));
    }
    const user = req.user;

    if (followedUser.role !== 'shop') {
        return next(new BadRequestError('You can not follow user, just only shop!'));
    }

    const isUserExistInFollowList = user.following.find(
        userId => userId.toString() === followedUser._id.toString()
    );
    if (!isUserExistInFollowList) user.following.push(followedUser._id);
    await user.save();
    res.send({
        successMessage: `Follow ${followedUser.firstName} ${followedUser.lastName} successfully`,
    });
});

exports.unfollowOtherUsers = catchAsyncError(async (req, res, next) => {
    const unfollowedUser = await User.findById(req.params.userId)
        .select('firstName lastName _id')
        .lean();

    if (!unfollowedUser) {
        return next(new NotFoundError(err, httpStatusCode.BAD_REQUEST));
    }

    const user = req.user;
    const beforeUnfollowNumber = user.following.length;
    user.following = user.following.filter(
        followingUser => followingUser.toString() !== unfollowedUser._id.toString()
    );
    await user.save();
    const afterUnfollowNumber = user.following.length;

    if (beforeUnfollowNumber !== afterUnfollowNumber) {
        return res.send({
            successMessage: `Unfollow ${unfollowedUser.firstName} ${unfollowedUser.lastName} successfully`,
        });
    }

    res.send({});
});

exports.deleteUser = (req, res, next) => {
    User.findOneAndDelete({ _id: req.params.userId, role: 'user' }, (err, user) => {
        if (err) console.log(err);

        if (user) {
            if (user.avatar) {
                deleteImage(user.avatar);
            }

            if (user.identityCard.cardImage) {
                user.identityCard.cardImage.forEach(image => {
                    deleteImage(image);
                });
            }

            res.send({
                successMessage: 'User deleted successfully',
            });
        }
    });
};

exports.getAllUsers = catchAsyncError(async (req, res, next) => {
    const users = await User.find({ role: 'user' });

    res.send({
        successMessage: 'Users fetched successfully',
        num_of_users: users.length,
        users,
    });
});

exports.getAllAdmin = catchAsyncError(async (req, res, next) => {
    const admins = await User.find({ role: 'admin' });

    res.send({
        successMessage: 'Admins fetched successfully',
        number_of_admins: admins.length,
        admins,
    });
});

exports.verifyEmail = catchAsyncError(async (req, res, next) => {
    await User.updateOne({ _id: req.user._id }, { $set: { isEmailVerified: true } });

    res.send({
        successMessage: 'Email verified successfully',
    });
});

exports.deleteAllUsers = async (req, res, next) => {
    const condition = {
        role: {
            $in: ['user', 'shop'],
        },
    };

    const userAssets = [];
    const users = await User.find(condition)
        .select('avatar identityCard.cardImage')
        .lean();

    users.forEach(user => {
        if (user.avatar) {
            userAssets.push(user.avatar);
        }
        if (user.identityCard.cardImage.length > 0) {
            userAssets.push(user.identityCard.cardImage.flatten());
        }
    });

    User.deleteMany(condition, (err, done) => {
        if (err)
            res.status(httpStatusCode.BAD_REQUEST).json({
                errorMessage: err.message,
            });

        if (done) {
            if (userAssets.length > 0) {
                userAssets.forEach(asset => {
                    deleteImage(asset);
                });
            }

            return res.status(httpStatusCode.OK).json({
                successMessage: 'All users deleted',
            });
        }
    });
};
