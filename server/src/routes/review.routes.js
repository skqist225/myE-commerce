const router = require('express').Router();
const {
    createProductReview,
    getProductReviews,
    deleteReview,
    getUserReviews,
    getAllReviews,
    likeReview,
} = require('../controllers/reviewController');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');
const upload = require('../middlewares/multer');

router.post(
    '/user/review/:productId',
    [isAuthenticatedUser, authorizeRoles('user')],
    upload.array('pictures', 3),
    createProductReview
);

router.put('/review/:reviewId', [isAuthenticatedUser], likeReview);

router.get('/user/reviews', [isAuthenticatedUser, authorizeRoles('user')], getUserReviews);
router.get('/product/reviews/:productId', [isAuthenticatedUser], getProductReviews);
router.get('/reviews', getAllReviews);

router.delete(
    '/user/review/delete/:reviewId',
    [isAuthenticatedUser, authorizeRoles('user')],
    deleteReview
);

module.exports = router;
