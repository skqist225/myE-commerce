const { addShopVoucher, addAdminVoucher } = require('../controllers/voucherController');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');
const router = require('express').Router();
const upload = require('../middlewares/multer');

router.post(
    '/shop/voucher/add',
    [isAuthenticatedUser, authorizeRoles('shop')],
    upload.single('voucherImage'),
    addShopVoucher
);

router.post(
    '/admin/voucher/add',
    [isAuthenticatedUser, authorizeRoles('admin')],
    upload.single('voucherImage'),
    addAdminVoucher
);

module.exports = router;
