const sendToken = (user, statusCode, res) => {
    const token = user.getJwtToken();

    const options = {
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
        secure: process.env.NODE_ENV === 'DEVELOPMENT' ? false : true,
    };

    res.cookie('token', token, options);

    res.status(statusCode).json({
        user,
        token,
    });
};

module.exports = sendToken;
