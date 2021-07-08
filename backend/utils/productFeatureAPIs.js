class ProductFeatures {
    constructor(modal, queryString) {
        this.modal = modal;
        this.query = null;
        this.queryString = queryString;
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
            // { $unwind: '$productTypes' },
            {
                $addFields: {
                    avgPrice: { $avg: '$productTypes.typePrice' },
                    avgStock: { $trunc: { $avg: '$productTypes.typeStock' } },
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
        ]);

        if (this.queryString.category) {
            this.query.match({ category: mongoose.Types.ObjectId('60d58d7e0168b3277df08b2a') });
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
