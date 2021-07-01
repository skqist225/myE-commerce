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

exports.registerUser = catchAsyncError(async (req, res, next) => {
    User.findOne({ username: req.body.username }).exec((err, user) => {
        if (user) {
            return next(new ErrorHandler('User already registered.', httpStatusCode.BAD_REQUEST));
        }
    });

    const { username, password, firstName, lastName, email, phoneNumber } = req.body;

    let user = {
        username,
        password,
        firstName,
        lastName,
        email,
        phoneNumber,
        role: req.body.role ? req.body.role : 'user',
        avatar: req.files.avatar ? processImagePath(req.files.avatar[0].path) : null,
        birthday: req.body.birthday ? req.body.birthday : null,
    };

    let _identityCard = {
        number: '',
        cardImage: [],
    };

    if (req.body.identityCard) {
        if (!req.body.identityCard.number || req.files['identityCard[cardImage][]'] === undefined) {
            return next(new ErrorHandler('Please enter card number and select card image'));
        }
        _identityCard.number = req.body.identityCard.number;

        _identityCard.cardImage.push(
            processImagePath(req.files['identityCard[cardImage][]'][0].path)
        );
        _identityCard.cardImage.push(
            processImagePath(req.files['identityCard[cardImage][]'][1].path)
        );

        user.identityCard = _identityCard;
    }

    const _user = await User.create(user);

    sendToken(_user, httpStatusCode.OK, res, 'User created successfully');
});

exports.loginUser = catchAsyncError(async (req, res, next) => {
    const { username, password } = req.body;

    if (!username || !password)
        return next(
            new ErrorHandler('Please enter username & password', httpStatusCode.BAD_REQUEST)
        );

    const user = await User.findOne({ username }).select('+password');

    if (!user) {
        res.status(httpStatusCode.BAD_REQUEST).json({
            errorMessage: 'User not found',
        });
    }

    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
        res.status(httpStatusCode.BAD_REQUEST).json({
            errorMessage: 'Password does not match or user name is invalid',
        });
    }

    sendToken(user, httpStatusCode.OK, res, 'Login successfully');
});

exports.logoutUser = (req, res, next) => {
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    });

    return res.status(httpStatusCode.OK).json({
        success: true,
        message: 'User logged out',
    });
};

exports.updateUser = catchAsyncError(async (req, res, next) => {
    if (mongoose.isValidObjectId(req.user._id)) {
        const user = await User.findById(req.user._id);
        //Find user in database

        //Know what field req.body contains

        //Just update on that field and exclude another fields

        //Entity's image just using if to check

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

        let _identityCard = {
            number: '',
            cardImage: [],
        };

        if (req.body.identityCard) {
            if (!_user.identityCard) {
                if (
                    !req.body.identityCard.number ||
                    req.files['identityCard[cardImage][]'] === undefined
                ) {
                    return next(new ErrorHandler('Please enter card number and select card image'));
                }
                _identityCard.number = req.body.identityCard.number;

                _identityCard.cardImage.push(
                    processImagePath(req.files['identityCard[cardImage][]'][0].path)
                );
                _identityCard.cardImage.push(
                    processImagePath(req.files['identityCard[cardImage][]'][1].path)
                );
                user.identityCard = _identityCard;
            } else {
                return next(new ErrorHandler('You can change this field after it had been set'));
            }
        }

        await user.save();

        return res.status(httpStatusCode.CREATED).json({
            success: true,
            message: 'User updated successfully',
            updatedUser: user,
        });
    }
});

exports.forgotPassword = catchAsyncError(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
        return next(new ErrorHandler('User not found with this email', httpStatusCode.NOT_FOUND));
    }

    const resetToken = user.getResetPasswordToken();

    await user.save({ validateBeforeSave: false });

    const resetUrl = `${req.protocol}://${req.get('host')}/password/reset/${resetToken}`;

    const message = `Your password reset token is as follow:\n\n${resetUrl}\n\nIf you have not requested this email, then ignore it.`;

    sendEmail({
        email: user.email,
        subject: 'Welcome to myE-commerce',
        message,
    })
        .then(result => console.log(`Email sent to ${user.email}`))
        .catch(async error => {
            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;

            await user.save({ validateBeforeSave: false });
            return next(new ErrorHandler(error.message, httpStatusCode.INTERNAL_SERVER));
        });

    return res.status(httpStatusCode.OK).json({
        success: true,
        message: `Email sent to ${user.email}`,
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
            new ErrorHandler(
                'Password reset token is invalid or has been expired',
                httpStatusCode.BAD_REQUEST
            )
        );

    if (req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHandler('Password does not match', httpStatusCode.BAD_REQUEST));
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    sendToken(user, httpStatusCode.OK, res, 'Password updated successfully');
});

exports.getUserProfile = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.user._id);

    return res.status(httpStatusCode.OK).json({
        success: true,
        message: "User's profile fetched successfully",
        user,
    });
});

exports.followOtherUsers = catchAsyncError(async (req, res, next) => {
    const { userId } = req.params;

    if (mongoose.isValidObjectId(userId)) {
        const followedUser = await User.findById(userId).select('role firstName lastName');

        if (!followedUser) {
            return next(new ErrorHandler('User not found', httpStatusCode.NOT_FOUND));
        }

        if (followedUser.role === 'shop') {
            User.updateOne(req.user._id, {
                $push: { following: userId },
            }).exec(err => {
                if (err) return next(new ErrorHandler(err, httpStatusCode.BAD_REQUEST));

                return res.status(httpStatusCode.OK).json({
                    success: true,
                    message: `Follow ${followedUser.firstName} ${followedUser.lastName} successfully`,
                });
            });
        } else {
            return next(
                new ErrorHandler(
                    'You can not follow user, just only shop!',
                    httpStatusCode.BAD_REQUEST
                )
            );
        }
    }
});

exports.unfollowOtherUsers = catchAsyncError(async (req, res, next) => {
    const { userId } = req.params;

    const unfollowedUser = await User.findById(userId).select('firstName lastName');

    if (!unfollowedUser) {
        return next(new ErrorHandler(err, httpStatusCode.BAD_REQUEST));
    }

    User.updateOne(req.user._id, {
        $pull: { following: userId },
    }).exec(err => {
        if (err) return next(new ErrorHandler(err, httpStatusCode.BAD_REQUEST));

        return res.status(httpStatusCode.OK).json({
            success: true,
            message: `Unfollow ${unfollowedUser.firstName} ${unfollowedUser.lastName} successfully`,
        });
    });
});

exports.deleteUser = catchAsyncError(async (req, res, next) => {
    const { userId } = req.params;

    if (mongoose.isValidObjectId(userId)) {
        User.findOneAndDelete({ _id: userId, role: 'user' }, (err, user) => {
            if (err)
                return next(
                    new ErrorHandler(
                        'You do not have permission to delete this person',
                        httpStatusCode.BAD_REQUEST
                    )
                );

            if (user) {
                if (user.avatar) {
                    deleteImage(user.avatar);
                }

                if (user.identityCard.cardImage) {
                    user.identityCard.cardImage.forEach(image => {
                        deleteImage(image);
                    });
                }

                return res.status(httpStatusCode.OK).json({
                    success: true,
                    message: 'User deleted successfully',
                });
            }
        });
    }
});

exports.getAllUsers = catchAsyncError(async (req, res, next) => {
    const users = await User.find();
    const admin_nbm = await User.countDocuments({ role: 'admin' });

    return res.status(httpStatusCode.OK).json({
        successMessage: 'User fetched successfully',
        admin_nbm,
        users,
    });
});

exports.verifyEmail = (req, res, next) => {
    User.updateOne({ _id: req.user._id }, { $set: { isEmailVerified: true } }).exec(err => {
        if (err) res.status(httpStatusCode.BAD_REQUEST).json({ errorMessage: err.message });

        return res.status(httpStatusCode.CREATED).json({
            successMessage: 'Email verified successfully',
        });
    });
};

exports.deleteAllUsers = (req, res, next) => {
    User.find({}).then(users => {
        User.deleteMany({}, (err, done) => {
            if (err) res.status(httpStatusCode.BAD_REQUEST).json({ errorMessage: err.message });

            if (done) {
                users.forEach(user => {
                    if (user.avatar) {
                        console.log(user.avatar);
                        deleteImage(user.avatar);
                    }

                    if (user.identityCard.cardImage) {
                        user.identityCard.cardImage.forEach(image => {
                            console.log(image);

                            deleteImage(image);
                        });
                    }
                });

                // deleteCollection('users');

                return res.status(httpStatusCode.OK).json({
                    successMessage: 'All users deleted',
                });
            }
        });
    });
};
