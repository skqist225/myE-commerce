const express = require('express');
const {
    addCategory,
    getCategories,
    updateCategory,
    deleteCategory,
} = require('../controllers/category.controller');
const router = express.Router();
const upload = require('../middlewares/multer');

router.get('/categories', getCategories);
router.post('/category/add', upload.single('categoryImage'), addCategory);

router
    .route('/category/:categoryId')
    .put(upload.single('categoryImage'), updateCategory)
    .delete(deleteCategory);

module.exports = router;
