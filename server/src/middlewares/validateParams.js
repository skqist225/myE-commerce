const { param } = require('express-validator');
const mongoose = require('mongoose');
const BadRequestError = require('../errors/bad-request-error');

const validateParams = id =>
    param(id).customSanitizer(value => {
        if (!mongoose.isValidObjectId(value)) {
            throw new BadRequestError('Invalid params');
        }

        return mongoose.Types.ObjectId(value);
    });
module.exports = validateParams;
