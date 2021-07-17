const router = require('express').Router();
const {
    addAddress,
    deleteAddress,
    updateAddress,
    getUserAddresses,
    deleteAllUserAddresses,
} = require('../controllers/addressController');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

router.post('/user/address/add', [isAuthenticatedUser, authorizeRoles('user')], addAddress);

router
    .route('/user/address/:addressId')
    .delete([isAuthenticatedUser, authorizeRoles('user')], deleteAddress)
    .put([isAuthenticatedUser, authorizeRoles('user')], updateAddress);

router.get('/user/addresses', [isAuthenticatedUser, authorizeRoles('user')], getUserAddresses);
router.delete(
    '/user/delete-all-addresses',
    [isAuthenticatedUser, authorizeRoles('user')],
    deleteAllUserAddresses
);

module.exports = router;
