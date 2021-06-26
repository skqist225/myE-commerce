const sendToken = (user, statusCode, res, message) => {
    const token = user.getJwtToken();

    const options = {
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000
        ),
        httpOnly: false,
    };

    res.cookie('token', token, options);

    res.status(statusCode).json({
        success: true,
        message,
        token,
        user,
    });
};

module.exports = sendToken;
