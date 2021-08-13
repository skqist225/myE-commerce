module.exports = folderName => {
    return (req, res, next) => {
        if (!req.query || (req.query.dest && req.query.dest !== folderName)) {
            res.status(400).json({
                errorMessage: 'Please secify folder to save image',
            });
        }

        next();
    };
};
