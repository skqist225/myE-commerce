import serverPath from '../utils/constants';

const createImage = (imageName, withoutSubPath = true) => {
    return withoutSubPath
        ? `${serverPath}/uploads/images/${imageName}`
        : `${serverPath}${imageName}`;
};

export default createImage;
