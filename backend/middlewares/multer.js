const multer = require('multer');
const fs = require('fs');
const path = require('path');
const imageFolder = path.join(__dirname, '../uploads/images');
const fileFilter = require('../helpers/imageFilter');

const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        let { dest } = req.query;

        let path = `${imageFolder}/${dest}`;

        fs.access(path, err => {
            if (err) {
                fs.mkdir(path, err => {
                    if (err) {
                        return console.error(err);
                    }
                    console.log('Directory created successfully!');
                });
            }
        });

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
