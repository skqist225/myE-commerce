import React, { useCallback, useEffect, useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { MetaData } from '../../components';
import { fetchCategoryPath, fetchProductById } from '../../features/product';
import './viewProduct.css';
import { categoriesSelectors, fetchCategories } from '../../features/categories';
import ProductSlider from '../Slider/ProductSlider';
import { createImage } from '../../helper';

function ViewProduct({ match }) {
    const { productId } = match.params;

    const dispatch = useDispatch();
    const {
        productEntity: product,
        loading,
        errorMessage,
        successMessage,
    } = useSelector(state => state.product);
    const categories = useSelector(categoriesSelectors.selectAll);

    const [productTypeStock, setProductTypeStock] = useState(1000);
    const [selectedImage, setSelectedImage] = useState('');
    const [allProductImages, setAllProductImages] = useState([]);
    const [categoryPath, setCategoryPath] = useState([]);

    const getAllImages = product => {
        const productTypesImages = product.productTypes.map((productType, index) => ({
            id: productType._id,
            imgUrl: productType.typeImage,
        }));
        const productImages = product.images.map((image, index) => ({
            id: image.substring(image.lastIndexOf('/') + 1, image.indexOf('.')),
            imgUrl: image,
        }));
        return productImages.concat(productTypesImages);
    };

    let categoryList = [];
    const renderCategoryPath = (categories, parentId) => {
        const parent = categories.find(category => category._id === parentId);

        if (parent) {
            categoryList.push(parent);
            if (parent.parentId) {
                renderCategoryPath(categories, parent.parentId);
            }
        }

        return categoryList;
    };

    const calculatePrice = ({ productTypes }) => {
        if (productTypes.length > 1) {
            const minPriceOfProductTypePrice = productTypes.reduce(
                (min, productType) => (productType.typePrice < min ? productType.typePrice : min),
                productTypes[0].typePrice
            );

            const maxPriceOfProductTypePrice = productTypes.reduce(
                (max, productType) => (productType.typePrice > max ? productType.typePrice : max),
                productTypes[0].typePrice
            );
            return [minPriceOfProductTypePrice, maxPriceOfProductTypePrice];
        }

        return productTypes[0].typePrice;
    };

    useEffect(() => {
        dispatch(fetchCategories());
        dispatch(fetchProductById({ productId }));
        if (successMessage) {
            setCategoryPath(renderCategoryPath(categories, product.category.parentId));
            setSelectedImage(product.images[0]);
            setAllProductImages(getAllImages(product));
        }
    }, [dispatch, productId, successMessage]);

    const handleSelectedImage = useCallback(e => {
        setSelectedImage(e.target.name);
    }, []);

    console.log('Parent rendering...');

    const handleSelectedType = e => {
        setSelectedImage(e.target.name);
        const productType = JSON.parse(e.target.dataset.productType);
        setProductTypeStock(productType.typeStock);
    };

    return (
        <>
            <MetaData title="Product's detail" />
            {!loading && successMessage && (
                <div className="viewProduct">
                    <div
                        style={{ display: 'flex', alignItems: 'center' }}
                        className="viewProductCategoryPathContainer"
                    >
                        {categoryPath.length > 0 &&
                            categoryPath.map(category => (
                                <Fragment key={category._id}>
                                    <p className="viewProductCategory">{category.categoryName}</p>
                                    <div className="viewProductIconWrapper">
                                        <svg
                                            enableBackground="new 0 0 11 11"
                                            viewBox="0 0 11 11"
                                            x="0"
                                            y="0"
                                            className="viewProductArrowRightIcon"
                                        >
                                            <path d="m2.5 11c .1 0 .2 0 .3-.1l6-5c .1-.1.2-.3.2-.4s-.1-.3-.2-.4l-6-5c-.2-.2-.5-.1-.7.1s-.1.5.1.7l5.5 4.6-5.5 4.6c-.2.2-.2.5-.1.7.1.1.3.2.4.2z"></path>
                                        </svg>
                                    </div>
                                </Fragment>
                            ))}
                        <p className="viewProductCategory">{`${product.category.categoryName}`}</p>
                        <div className="viewProductIconWrapper">
                            <svg
                                enableBackground="new 0 0 11 11"
                                viewBox="0 0 11 11"
                                x="0"
                                y="0"
                                className="viewProductArrowRightIcon"
                            >
                                <path d="m2.5 11c .1 0 .2 0 .3-.1l6-5c .1-.1.2-.3.2-.4s-.1-.3-.2-.4l-6-5c-.2-.2-.5-.1-.7.1s-.1.5.1.7l5.5 4.6-5.5 4.6c-.2.2-.2.5-.1.7.1.1.3.2.4.2z"></path>
                            </svg>
                        </div>
                        <p className="viewProductCategory productName">{product.productName}</p>
                    </div>

                    <div className="viewProductContainer">
                        <div className="viewProductLeft">
                            <img
                                src={createImage(selectedImage, false)}
                                alt="Image not exists"
                                className="viewProductProductImageBig"
                            />
                            <div className="viewProductSmallImageContainer">
                                <ProductSlider
                                    dataSlider={allProductImages}
                                    handleSelectedImage={handleSelectedImage}
                                />
                            </div>
                        </div>

                        <div className="viewProductRight">
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                }}
                            >
                                <h2 className="viewProductProductName">
                                    <span className="viewProductFavorite">Yêu thích</span>
                                    {product.productName}
                                </h2>
                            </div>

                            <div className="viewProductRatingWrapper">
                                <span className="viewProductRating inline-block">
                                    4.8{' '}
                                    {Array.apply(undefined, { length: 5 }).map((val, index) => (
                                        <span
                                            className="fa fa-star checked inline-block"
                                            key={index}
                                        ></span>
                                    ))}
                                </span>
                                <div className="seperator"></div>
                                <span className="viewProductNumberOfRating inline-block">
                                    <span className="undelineText">500</span>
                                    Đánh giá
                                </span>
                                <div className="seperator"></div>
                                <span className="viewProductSoldNumber inline-block">
                                    <span className="undelineText">1,3k</span> Đã Bán
                                </span>
                            </div>
                            <div className="viewProductTypePriceWrapper">
                                <div className="viewProductTypePriceWrapperFirstLine">
                                    <span className="viewProductTypePriceOriginal inline-block">
                                        {product.productTypes.length === 1
                                            ? product.productTypes[0].typePrice
                                            : 170000}
                                    </span>
                                    <p className="viewProductTypePriceRange">
                                        {Array.isArray(calculatePrice(product)) ? (
                                            <>
                                                <span>₫</span>
                                                {calculatePrice(product)[0]} -<span>₫</span>
                                                {calculatePrice(product)[1]} -
                                            </>
                                        ) : (
                                            <>
                                                <span>₫</span>
                                                {calculatePrice(product)}
                                            </>
                                        )}
                                    </p>
                                    <span className="viewProductTypePriceDiscount inline-block">
                                        {product.discountPercent} % OFF
                                    </span>
                                </div>
                                <div className="viewProductTypePriceWrapperSecondLine">
                                    <img src="" alt="" />
                                    <div>
                                        <p style={{ fontSize: '18px' }}>Gì Cũng Rẻ</p>
                                        <p style={{ fontSize: '15px' }}>
                                            Giá tốt nhất so với các sẩn phẩm cùng loại trên Shopee!
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div
                                style={{
                                    display: 'flex',
                                    paddingBottom: '25px',
                                }}
                            >
                                <p
                                    style={{
                                        marginRight: '10px',
                                        color: '#757575',
                                        width: '105px',
                                        fontSize: '18px',
                                    }}
                                >
                                    Combo Khuyến Mãi
                                </p>
                                <p
                                    className="viewProductVoucher"
                                    style={{ alignSelf: 'flex-start' }}
                                >
                                    Mua 3 & giảm 5000
                                </p>
                            </div>
                            <div className="viewProductTransporter">
                                <div className="viewProductTransporterFreeShip">
                                    <p
                                        style={{
                                            color: '#757575',
                                            flex: '1',
                                            alignSelf: 'flex-start',
                                        }}
                                    >
                                        Vận chuyển
                                    </p>
                                    <div style={{ flex: '3' }}>
                                        <img
                                            src={createImage('freeship.png')}
                                            style={{ width: '25px', height: '15px' }}
                                        />
                                        <span style={{ color: '#222222', fontSize: '18px' }}>
                                            {product.isFreeship && 'Miễn Phí Vận Chuyển'}
                                        </span>
                                        <div>
                                            <div>
                                                <img />
                                                <span className="viewProductTransportInfoTitle">
                                                    Vận Chuyển Tới
                                                </span>
                                                <span className="viewProductTransportTo">
                                                    Hà Nội
                                                </span>
                                            </div>
                                            <div>
                                                <span className="viewProductTransportInfoTitle">
                                                    Phí Vận Chuyển
                                                </span>
                                                <span className="viewProductTransportTo">0đ</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {product.productTypes.length > 1 && (
                                <div className="viewProductProductTypesContainer">
                                    <p className="viewProductProductTypesTitle">Màu</p>
                                    <div className="viewProductProductType">
                                        {product.productTypes.map(productType => (
                                            <button
                                                key={productType._id}
                                                className="viewProductProductTypeButton"
                                                name={productType.typeImage}
                                                onClick={handleSelectedType}
                                                data-product-type={JSON.stringify(productType)}
                                            >
                                                {productType.typeName}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="viewProductTypeStockContainer">
                                <p className="viewProductProductTypeStockTitle">Số Lượng</p>
                                <div
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                    }}
                                >
                                    <button className="viewProductChangeStockBtn">-</button>
                                    <p className="viewProductQuantity">1</p>
                                    <button className="viewProductChangeStockBtn">+</button>
                                </div>

                                <p className="viewProductProductTypeStock">
                                    {product.productTypes.length > 1
                                        ? productTypeStock
                                        : product.productTypes[0].typeStock}{' '}
                                    sản phẩm có sẵn
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default ViewProduct;
