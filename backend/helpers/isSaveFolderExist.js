export default folderName => {
    if (!Object.keys(req.query).length || req.query.dest !== folderName) {
        res.status(400).json({
            errorMessage: 'Please secify folder to save image',
        });
    }

    next();
};
