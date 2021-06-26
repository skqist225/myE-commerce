const catchAsyncError = require('../middlewares/catchAsyncError');
const Category = require('../models/category');
const ErrorHandler = require('../utils/errorHandler');
const httpStatusCode = require('../utils/constansts');
const processImagePath = require('../helpers/processImageSavePath');
const catchUniqueError = require('../helpers/catchUniqueError');
const mongoose = require('mongoose');
const Product = require('../models/product');
const deleteImage = require('../helpers/deleteImage');

function createCategories(categories, parentId = null) {
    const categoryList = [];

    let _categories;
    if (parentId === null) {
        //highest category
        _categories = categories.filter(cat => cat.parentId == undefined);
    } else {
        _categories = categories.filter(cat => cat.parentId == parentId);
    }

    for (let cat of _categories) {
        categoryList.push({
            _id: cat._id,
            categoryName: cat.categoryName,
            categoryImage: cat.categoryImage,
            parentId: cat.parentId,
            children: createCategories(categories, cat._id),
        });
    }

    return categoryList;
}

exports.addCategory = (req, res, next) => {
    const { categoryName } = req.body;
    let categoryImage;
    if (req.file) {
        categoryImage = processImagePath(req.file.path);
    }

    if (!categoryName)
        return next(
            new ErrorHandler(
                'Please enter a category name',
                httpStatusCode.BAD_REQUEST
            )
        );

    Category.findOne({ categoryName }).exec((err, category) => {
        if (category) {
            return next(
                new ErrorHandler(
                    'Category already existed ',
                    httpStatusCode.BAD_REQUEST
                )
            );
        }
    });

    const categoryObj = {
        categoryName,
        categoryImage,
    };

    if (req.body.parentId) {
        categoryObj.parentId = req.body.parentId;
    }
    const category = new Category(categoryObj);

    category.save((err, category) => {
        if (err) return next(new ErrorHandler(err, httpStatusCode.BAD_REQUEST));
        if (category)
            return res.status(httpStatusCode.CREATED).json({
                success: true,
                successMessage: 'Category created successfully',
                category,
            });
    });
};

exports.getCategories = (req, res, next) => {
    Category.find({}).exec((err, _categories) => {
        if (err)
            return res.status(httpStatusCode.BAD_REQUEST).json({ error: err });
        if (_categories) {
            // const categories = createCategories(_categories);
            return res.status(httpStatusCode.OK).json({
                success: true,
                successMessage: 'Categories fetched successfully',
                categories: _categories,
            });
        }
    });
};

exports.updateCategory = catchAsyncError(async (req, res, next) => {
    const { categoryName } = req.body;
    let newCategory;

    newCategory = {
        categoryName,
    };

    if (req.file) {
        newCategory.categoryImage = processImagePath(req.file.path);
    }

    if (req.body.parentId) {
        if (mongoose.isValidObjectId(req.body.parentId)) {
            newCategory.parentId = req.body.parentId;
        } else {
            return next(
                new ErrorHandler(
                    'Parent ID is invalid',
                    httpStatusCode.BAD_REQUEST
                )
            );
        }
    }

    const updatedCategory = await Category.findByIdAndUpdate(
        req.params.categoryId,
        newCategory,
        { runValidators: true, new: true }
    );

    return res.status(httpStatusCode.CREATED).json({
        success: true,
        message: `Category updated successfully`,
        updatedCategory,
    });
});

exports.deleteCategory = (req, res, next) => {
    const { categoryId } = req.params;

    if (mongoose.isValidObjectId(categoryId)) {
        Product.findOne({ category: categoryId }, (err, product) => {
            if (product)
                return res.status(httpStatusCode.BAD_REQUEST).json({
                    success: false,
                    message:
                        'Can not delete this category because there is product using it',
                });
        });

        Category.findByIdAndDelete(categoryId, (err, category) => {
            if (err)
                return res
                    .status(httpStatusCode.BAD_REQUEST)
                    .json({ errorMessage: err });

            if (category) {
                if (category.categoryImage) {
                    deleteImage(category.categoryImage);
                }

                return res.status(httpStatusCode.OK).json({
                    success: true,
                    successMessage: 'Category was deleted successfully',
                });
            }
        });
    }
};
