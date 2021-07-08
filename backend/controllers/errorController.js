const sendErrorDev = (err, res) => {
    const { stack, message, status } = err;

    res.status(err.statusCode).json({
        status,
        error: err,
        message,
        stack,
    });
};

const sendErrorProd = (err, res) => {
    const { message, status } = err;

    //Operational, trusted error: send message to client
    if (err.isOperational) {
        res.status(err.statusCode).json({
            status,
            message,
        });

        //Programming or other unknown error: don't leak error details
    } else {
        console.error('ERROR 💙', err);

        res.status(500).json({
            status: 'error',
            message: 'Something went wrong',
        });
    }
};

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    if (process.env.NODE_ENV === 'DEVELOPMENT') {
        sendErrorDev(err, res);
    } else if (process.env.NODE_ENV === 'PRODUCTION') {
        sendErrorProd(err, res);
    }
};
