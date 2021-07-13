const mongoose = require('mongoose');

class ProductFeatures {
    constructor(modal, queryString, shopId) {
        this.modal = modal;
        this.query = null;
        this.queryString = queryString;
        this.shopId = shopId;
    }

    filter() {
        const queryObj = { ...this.queryString };
        const excludedFields = [
            'page',
            'sort',
            'limit',
            'fields',
            'minPrice',
            'maxPrice',
            'transporters',
            'productName',
        ];
        excludedFields.forEach(el => delete queryObj[el]);

        this.query = this.modal.aggregate([
            { $match: { shop: mongoose.Types.ObjectId(this.shopId) } },
            {
                $addFields: {
                    avgPrice: { $avg: '$productTypes.typePrice' },
                    avgStock: { $round: { $avg: '$productTypes.typeStock' } },
                },
            },
            {
                $match: {
                    avgPrice: {
                        $gte: Math.abs(this.queryString.minPrice) || 0,
                        $lte: Math.abs(this.queryString.maxPrice) || 9999999999,
                    },
                },
            },
            {
                $lookup: {
                    from: 'categories',
                    localField: 'category',
                    foreignField: '_id',
                    as: 'category',
                },
            },
            {
                $unwind: '$category',
            },
            {
                $project: {
                    description: 0,
                    supplier: 0,
                    shop: 0,
                    images: 0,
                    'category.parentId': 0,
                    'category.categoryImage': 0,
                    'category.__v': 0,
                    'category.createdAt': 0,
                    'category.updatedAt': 0,
                },
            },
        ]);

        if (this.queryString.categories) {
            this.query.match({
                'category._id': {
                    $in: this.queryString.categories
                        .split(',')
                        .map(cat => new mongoose.Types.ObjectId(cat)),
                },
            });
        }

        if (this.queryString.transporters) {
            this.query.match({
                transporters: {
                    $in: this.queryString.transporters
                        .split(',')
                        .map(transporter => new mongoose.Types.ObjectId(transporter)),
                },
            });
        }

        if (this.queryString.productName) {
            this.query.match({
                productName: { $regex: new RegExp(this.queryString.productName, 'i') },
            });
        }
        //DEVNOTIFY for boolean and number query
        if (this.queryString.isFreeship || this.queryString.discountPercent) {
            Object.keys(queryObj).forEach(key => {
                if (typeof queryObj[key] === 'string')
                    queryObj[key] === 'true' ? (queryObj[key] = true) : (queryObj[key] *= 1);
            });
            this.query.match(queryObj);
        }

        return this;
    }

    sort() {
        if (this.queryString.sortBy) {
            const sortBy = req.query.sortBy.split(',').join(' ');
            this.query.sort(sortBy);
        } else {
            this.query.sort('createdAt');
        }
        return this;
    }

    paginate() {
        const page = this.queryString.page * 1 || 0;
        const resPerPage = this.queryString.limit * 1 || 30;
        const skip = page * resPerPage;
        this.query.skip(skip).limit(resPerPage);
        return this;
    }
}

module.exports = ProductFeatures;
