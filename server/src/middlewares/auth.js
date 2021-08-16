const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('./catchAsyncError');
const httpStatusCode = require('../utils/constansts');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const NotAuthorizedError = require('../errors/not-authorized-error');
const ForbiddenError = require('../errors/forbidden-error');

exports.isAuthenticatedUser = catchAsyncError(async (req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
        return next(new NotAuthorizedError('Login first to access this resource'));
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decodedToken._id);
    next();
});

exports.authorizeRoles = (...roles) => {
    return (req, res, next) => {
        console.log(req.user);
        if (!roles.includes(req.user.role)) {
            return next(
                new ForbiddenError(
                    `Role (${req.user.role}) is not allowed to access this resource`
                )
            );
        }
        next();
    };
};
