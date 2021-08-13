const path = require('path');
const folderPath = path.dirname(__dirname);

function processImageSavePath(imagePath) {
    return imagePath.replace(folderPath, '');
}

module.exports = processImageSavePath;
