const router = require('express').Router();
const {
    addAddress,
    deleteAddress,
    updateAddress,
    getUserAddresses,
} = require('../controllers/address.controller');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

router.post(
    '/user/address/add',
    [isAuthenticatedUser, authorizeRoles('user')],
    addAddress
);

router
    .route('/user/address/:addressId')
    .delete([isAuthenticatedUser, authorizeRoles('user')], deleteAddress)
    .put([isAuthenticatedUser, authorizeRoles('user')], updateAddress);

router.get(
    '/user/addresses',
    [isAuthenticatedUser, authorizeRoles('user')],
    getUserAddresses
);

module.exports = router;
