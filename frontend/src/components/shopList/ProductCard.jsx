import React, { Fragment, memo } from 'react';
import { createImage } from '../../helpers';
import PropTypes from 'prop-types';

import { HeartIcon } from './svgIcon';
import { ProductCardContainer, CardLocation, CardName } from './ShopProductsComponent';
import './productCard.css';

function ProductCard({ product }) {
    let dotNum = 0;
    const countDotNum = number => {
        const r = number / 1000;

        if (r >= 1) {
            dotNum++;
            const _number = number / 1000;
            countDotNum(_number);
        } else {
            return;
        }
    };

    const seperateNumber = number => {
        countDotNum(number);
        let finalString = [];

        let numString = String(number);

        for (let i = 0; i < dotNum; i++) {
            const subString = '.' + numString.substr(-3);
            numString = numString.substring(0, numString.length - 3);
            finalString.unshift(subString);
        }

        return numString + finalString.join('');
    };

    const handleProductPrice = () => {
        const { typePrice } = product.productTypes[0];

        return product.discountPercent !== 0
            ? seperateNumber(typePrice - Math.round((product.discountPercent * typePrice) / 100))
            : seperateNumber(typePrice);
    };

    return (
        <Fragment>
            <ProductCardContainer>
                <div className="productCardImageSection">
                    <div
                        style={{
                            backgroundImage: `url(${createImage(
                                product.productTypes[0].typeImage,
                                false
                            )})`,
                        }}
                        className="productCardProductImage"
                    ></div>
                    <div className="productCardXLDHWrapper">
                        <div
                            style={{ backgroundColor: 'rgb(208,1,27)' }}
                            className="productCardXLDHMask"
                        >
                            <div
                                style={{
                                    backgroundImage: `url(${createImage('XLDH.png')})`,
                                    backgroundRepeat: 'no-repeat',
                                    width: '100%',
                                    height: '100%',
                                    backgroundSize: 'contain',
                                }}
                            ></div>
                        </div>
                    </div>
                    <div className="productCardCoverImage77">
                        <img
                            src={createImage('77.png')}
                            alt=""
                            className="productCardSubImage 77png"
                        />
                    </div>
                </div>
                <div className="productCardProductDetailsSection">
                    <CardName>{product.productName}</CardName>
                    <div style={{ marginTop: '6.25px' }}>
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyConten: 'space-between',
                            }}
                        >
                            {product.discountPercent && (
                                <div className="productCardOrginalPrice">
                                    <span className="productCardOrginalPriceCur">đ</span>
                                    {seperateNumber(product.productTypes[0].typePrice)}
                                </div>
                            )}
                            <div className="productCardDiscountPriceWrapper">
                                <span className="productCardOrginalPriceOrDiscountPrice">
                                    {handleProductPrice()}
                                </span>
                                <div>
                                    <img
                                        src={createImage('freeship.png')}
                                        alt="freeShipImage"
                                        style={{ width: '20px', height: '12px' }}
                                    />
                                </div>
                            </div>
                        </div>
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                width: '100%',
                                marginTop: '6.25px',
                            }}
                        >
                            <div style={{ marginRight: '10px' }}>
                                <HeartIcon />
                            </div>
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    // justifyContent: 'space-between',
                                    flex: '1',
                                }}
                            >
                                {Array.from({ length: 5 }).map((_, index) => (
                                    <span
                                        key={index}
                                        className="fa fa-star checked"
                                        style={{
                                            fontSize: '12px',
                                            marginRight: '3px',
                                            color: '#ffce3d',
                                        }}
                                    ></span>
                                ))}
                            </div>
                            <div
                                className="productCardSoldNumber"
                                style={{ width: '40%', justifySelf: 'flex-end' }}
                            >
                                Đã bán 2K
                            </div>
                        </div>
                        <CardLocation className="productCardSellLocation">
                            TP.Hồ Chí Minh
                        </CardLocation>
                    </div>
                </div>
            </ProductCardContainer>
        </Fragment>
    );
}

ProductCard.propTypes = {
    product: PropTypes.object.isRequired,
};

export default memo(ProductCard);
