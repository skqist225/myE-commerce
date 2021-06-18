const isProductNameExist = (productName, req) => {
    let prdName = req.body.productName;

    if (prdName.includes('-')) {
        let prdNameSubName1 = prdName.split('-');

        if (productName.includes('-')) {
            if (productName.split('-').length === prdNameSubName1.length) {
            }

            const prdNameSubName2 = productName.split('-');

            let trueAcc = 0;

            for (let i = 0; i < prdNameSubName1.length; i++) {
                if (prdNameSubName1[i] === prdNameSubName2[i]) {
                    trueAcc++;
                }
            }

            if (trueAcc === prdNameSubName1.length) {
                return true;
            }
        }
    }

    return productName === prdName;
};

module.exports = isProductNameExist;
