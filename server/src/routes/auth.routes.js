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
} = require('../controllers/auth-controller');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');
const router = express.Router();
const upload = require('../middlewares/multer');
const { body } = require('express-validator');
const validateRequest = require('../middlewares/validateRequest');
const validateParams = require('../middlewares/validateParams');

router.post(
    '/register',
    [
        body('username').trim().not().isEmpty().withMessage('Username is required'),
        body('password')
            .trim()
            .isLength({ min: 8, max: 25 })
            .withMessage(
                'Password must be at least 8 characters and can not exceed 25 characters'
            ),
        body('firstName').not().isEmpty().withMessage('First name is required'),
        body('lastName').not().isEmpty().withMessage('Last name is required'),
        body('email').isEmail().withMessage('Invalid email'),
        body('phoneNumber')
            .isLength({ min: 10, max: 10 })
            .withMessage('Phone number must be 10 characters'),
    ],
    validateRequest,
    registerUser
);

router.get('/user', isAuthenticatedUser, getUserProfile);
router.post(
    '/password/reset/:resetToken',
    body('password')
        .trim()
        .isLength({ min: 8, max: 25 })
        .withMessage(
            'Password must be at least 8 characters and can not exceed 25 characters'
        ),
    validateRequest,
    resetPassword
);

router.post(
    '/login',
    [
        body('username').trim().not().isEmpty().withMessage('Username is required'),
        body('password')
            .trim()
            .isLength({ min: 8, max: 25 })
            .withMessage(
                'Password must be at least 8 characters and can not exceed 25 characters'
            ),
    ],
    validateRequest,
    loginUser
);

router.get('/admin/users', [isAuthenticatedUser, authorizeRoles('admin')], getAllUsers);

router.put(
    '/user/verify-email',
    [isAuthenticatedUser, authorizeRoles('user', 'admin')],
    verifyEmail
);

router.put(
    '/user/update',
    [isAuthenticatedUser, authorizeRoles('user', 'shop')],
    upload.fields([
        { name: 'avatar', maxCount: 1 },
        { name: 'identityCard[cardImage][]', maxCount: 2 },
    ]),
    updateUser
);

router.put(
    '/admin/user/:userId',
    [isAuthenticatedUser, authorizeRoles('admin')],
    validateParams('userId'),
    upload.fields([
        { name: 'avatar', maxCount: 1 },
        { name: 'identityCard[cardImage][]', maxCount: 2 },
    ]),
    updateUser
);

router.get('/logout', [isAuthenticatedUser], logoutUser);

router.post(
    '/user/recover-password',
    body('email').isEmail().withMessage('Invalid email'),
    validateRequest,
    forgotPassword
);

router.delete(
    '/admin/user/:userId',
    [isAuthenticatedUser, authorizeRoles('admin')],
    validateParams('userId'),
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
    validateParams('userId'),
    unfollowOtherUsers
);

module.exports = router;
