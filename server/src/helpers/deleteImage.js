const fs = require('fs');
const path = require('path');
const folderPath = path.dirname(__dirname);

const deleteImage = imagePath => {
    fs.unlink(path.join(folderPath, imagePath), (err, done) => {
        if (err) throw err;
        if (done) {
            console.log(`${imagePath} was deleted`);
        }
    });
};

module.exports = deleteImage;
