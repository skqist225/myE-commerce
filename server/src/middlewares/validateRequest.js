const { validationResult } = require('express-validator');
const RequestValidationError = require('../errors/request-validation-error');

const validateRequest = (req, res, next) => {
    const errors = validationResult(req);

    console.log(errors.array());

    if (!errors.isEmpty()) {
        return next(new RequestValidationError(errors.array()));
    }

    next();
};

module.exports = validateRequest;
