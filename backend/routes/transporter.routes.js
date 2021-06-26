const router = require('express').Router();
const {
    addTransporter,
    getAllTransporters,
    getProductTransporters,
} = require('../controllers/transporter.controller');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

const upload = require('../middlewares/multer');

router.post(
    '/admin/transporter/add',
    [isAuthenticatedUser, authorizeRoles('admin')],
    upload.single('transporterLogo'),
    addTransporter
);

router.get('/transporters', getAllTransporters);

router.get('/product/transporters/:productId', getProductTransporters);

module.exports = router;
