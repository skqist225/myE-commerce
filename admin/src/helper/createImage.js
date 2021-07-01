import imageLink from '../components/constants';

function createImage(imageName, withoutSubPath = true) {
    return withoutSubPath ? `${imageLink}/uploads/images/${imageName}` : `${imageLink}${imageName}`;
}

export default createImage;
