const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('./catchAsyncError');
const httpStatusCode = require('../utils/constansts');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

exports.isAuthenticatedUser = catchAsyncError(async (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
        return next(
            new ErrorHandler(
                'Login first to access this resource',
                httpStatusCode.UNAUTHORIZED
            )
        );
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decodedToken._id);
    next();
});

exports.authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(
                new ErrorHandler(
                    `Role (${req.user.role}) is not allowed to access this resource`,
                    httpStatusCode.FORBIDDEN
                )
            );
        }
        next();
    };
};
