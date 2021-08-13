const express = require('express');
const {
    addSupplier,
    getAllSuppliers,
    getSingleSupplier,
    updateSupplier,
    verifySupplier,
    deleteSupplier,
} = require('../controllers/supplierController');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');
const router = express.Router();
const upload = require('../middlewares/multer');

router.post('/admin/supplier/add', upload.single('supplierLogo'), addSupplier);

router.get('/suppliers', getAllSuppliers);

router
    .route('/supplier/:supplierId')
    .get(getSingleSupplier)
    .put(upload.single('supplierLogo'), updateSupplier)
    .delete(deleteSupplier);

router.put(
    '/admin/verify-supplier/:supplierId',
    [isAuthenticatedUser, authorizeRoles('admin')],
    verifySupplier
);

module.exports = router;
