const express = require('express');
const {
    registerUser,
    loginUser,
    logoutUser,
    getAllUsers,
    deleteAllUsers,
    updateUser,
    deleteUser,
    verifyEmail,
    forgotPassword,
    getUserProfile,
    resetPassword,
    followOtherUsers,
    unfollowOtherUsers,
} = require('../controllers/auth.controller');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');
const router = express.Router();
const upload = require('../middlewares/multer');

router.get(
    '/user',
    [isAuthenticatedUser, authorizeRoles('user')],
    getUserProfile
);

router.post('/password/reset/:resetToken', resetPassword);

router.post(
    '/register',
    upload.fields([
        { name: 'avatar', maxCount: 1 },
        { name: 'identityCard[cardImage][]', maxCount: 2 },
    ]),
    registerUser
);
router.post('/login', loginUser);

router.get(
    '/admin/users',
    [isAuthenticatedUser, authorizeRoles('admin')],
    getAllUsers
);

router.put(
    '/user/verify-email',
    [isAuthenticatedUser, authorizeRoles('user')],
    verifyEmail
);

router.route('/user/update').put(
    [isAuthenticatedUser, authorizeRoles('user', 'admin')],
    upload.fields([
        { name: 'avatar', maxCount: 1 },
        { name: 'identityCard[cardImage][]', maxCount: 2 },
    ]),
    updateUser
);

router.get(
    '/logout',
    [isAuthenticatedUser, authorizeRoles('user')],
    logoutUser
);

router.post('/user/forgot-password', forgotPassword);

router.delete(
    '/admin/user/:userId',
    [isAuthenticatedUser, authorizeRoles('admin')],
    deleteUser
);

//Testing
router.delete(
    '/admin/users/delete',
    [isAuthenticatedUser, authorizeRoles('admin')],
    deleteAllUsers
);

router.put('/user/follow/:userId', [
    isAuthenticatedUser,
    authorizeRoles('user'),
    followOtherUsers,
]);

router.put(
    '/user/unfollow/:userId',
    [isAuthenticatedUser, authorizeRoles('user')],
    unfollowOtherUsers
);

module.exports = router;
