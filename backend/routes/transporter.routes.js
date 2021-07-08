const router = require('express').Router();
const {
    addTransporter,
    getAllTransporters,
    getProductTransporters,
    updateTransporter,
} = require('../controllers/transporterController');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

const upload = require('../middlewares/multer');

router.post(
    '/admin/transporter/add',
    [isAuthenticatedUser, authorizeRoles('admin')],
    upload.single('transporterLogo'),
    addTransporter
);

router.put(
    '/admin/transporter/:transporterId',
    [isAuthenticatedUser, authorizeRoles('admin')],
    upload.single('transporterLogo'),
    updateTransporter
);

router.get('/transporters', getAllTransporters);

router.get('/product/transporters/:productId', getProductTransporters);

module.exports = router;
