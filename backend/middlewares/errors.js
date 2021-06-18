const ErrorHandler = require('../utils/errorHandler');
const httpStatusCode = require('../utils/constansts');

module.exports = (err, req, res, next) => {
    if (process.env.NODE_ENV === 'DEVELOPMENT') {
        let error = { ...err };

        if (err.code === 11000 && err.name === 'MongoError') {
            const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
            error = new ErrorHandler(
                message,
                httpStatusCode.UNPROCESSABLEENTITY
            );
        }

        // if(err.name === 'JsonWebToken')

        res.status(error.statusCode || 500).json({
            success: false,
            message: error.message || 'Internal Server Error',
        });
    }
};
