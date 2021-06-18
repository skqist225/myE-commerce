const router = require('express').Router();
const {
    createProductReview,
    getProductReviews,
    deleteReview,
    getUserReviews,
} = require('../controllers/review.controller');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');
const upload = require('../middlewares/multer');

router.post(
    '/user/review/:productId',
    [isAuthenticatedUser, authorizeRoles('user')],
    upload.array('pictures', 3),
    createProductReview
);

router.get(
    '/user/reviews',
    [isAuthenticatedUser, authorizeRoles('user')],
    getUserReviews
);

router.get(
    '/product/reviews/:productId',
    [isAuthenticatedUser],
    getProductReviews
);

router.delete(
    '/user/review/delete/:reviewId',
    [isAuthenticatedUser, authorizeRoles('user')],
    deleteReview
);

module.exports = router;
