import React, { Fragment } from 'react';
import { createImage } from '../../helper';
import PropTypes from 'prop-types';
import './productCard.css';

function ProductCard({ product }) {
    return (
        <Fragment>
            <div className="productCard">
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
                <div>
                    <div>{product.productName}</div>
                </div>
                <div>
                    <div>
                        <span>originial Price</span>
                        <div>
                            <span>price</span>
                            <img src="" alt="freeShipImage" />
                        </div>
                    </div>
                    <div>
                        <span>heart icon</span>
                        <div>
                            <span className="fa fa-star checked"></span>
                            <span className="fa fa-star checked"></span>
                            <span className="fa fa-star checked"></span>
                            <span className="fa fa-star checked"></span>
                            <span className="fa fa-star checked"></span>
                        </div>
                        <span>Đã bán 2K</span>
                    </div>
                    <div>TP.Hồ Chí Minh</div>
                </div>
            </div>
        </Fragment>
    );
}

ProductCard.propTypes = {
    product: PropTypes.object.isRequired,
};

export default ProductCard;
