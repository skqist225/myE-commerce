const multer = require('multer');
const path = require('path');
const imageFolder = path.join(__dirname, '../uploads/images');
const fileFilter = require('../helpers/imageFilter');

const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        const path = `${imageFolder}/${req.query}`;

        cb(null, path);
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({
    storage: fileStorageEngine,
    fileFilter,
});

module.exports = upload;
