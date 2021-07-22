const router = require('express').Router();
const {
    addTransporter,
    getAllTransporters,
    getProductTransporters,
    updateTransporter,
} = require('../controllers/transporterController');
const { default: isSaveFolderExist } = require('../helpers/isSaveFolderExist');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

const upload = require('../middlewares/multer');

router.post(
    '/admin/transporter/add',
    [isAuthenticatedUser, authorizeRoles('admin')],
    upload.single('transporterLogo'),
    isSaveFolderExist('transporter'),
    addTransporter
);

router.put(
    '/admin/transporter/:transporterId',
    [isAuthenticatedUser, authorizeRoles('admin')],
    upload.single('transporterLogo'),
    isSaveFolderExist('transporter'),
    updateTransporter
);

router.get('/transporters', getAllTransporters);

router.get('/product/transporters/:productId', getProductTransporters);

module.exports = router;
