const catchUniqueError = function (res, err) {
    if (err.name === 'MongoError' && err.code === 11000) {
        // Duplicate username
        return res.status(422).json({
            succes: false,
            message: `${Object.keys(err.keyValue)} already exist!`,
        });
    }
};

module.exports = catchUniqueError;
