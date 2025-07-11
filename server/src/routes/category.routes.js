const express = require('express');
const {
    addCategory,
    getAllCategories,
    updateCategory,
    deleteCategory,
} = require('../controllers/catergoryController');
const router = express.Router();
const upload = require('../middlewares/multer');

//DEVNOTIFY get categories
router.get('/categories', getAllCategories);

router.post('/category/add', upload.single('categoryImage'), addCategory);

router
    .route('/category/:categoryId')
    .put(upload.single('categoryImage'), updateCategory)
    .delete(deleteCategory);

module.exports = router;
