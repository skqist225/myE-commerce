import React, { useCallback, useEffect, useState, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { MetaData } from '../../components';

import ProductSlider from '../Slider/ProductSlider';
import { createImage, separateNumberWithDot } from '../../helpers';
import { ContentContainer, Flex } from '../../globalStyle';
import { _setCategoryPath, clearCategoryPath } from '../../features/product';
import {
    MallIcon,
    StarIcon,
    GiCungRe,
    AskIcon,
    VCT,
    ArrowRight,
    PlusCart,
} from '../shopList/svgIcon';
import {
    ProductName,
    OriginalPrice,
    DiscountPercent,
    PriceRange,
    VPRight,
    Rating,
    NoteLine,
    TransportTitle,
    TransportContent,
    FirstLine,
    FreeshipImg,
    SecondLine,
    VPLeft,
    CategoryPath,
    ProductCategory,
    PrdName,
    AddToCartBtn,
    BuyProductBtn,
    First,
    PolicyText,
    Second,
    Third,
} from './ViewProductComponent';
import './viewProduct.css';
import { addToCart } from '../../features/cart';

function ViewProduct({ match, bgColor }) {
    const dispatch = useDispatch();
    const {
        productEntity: product,
        loading,
        errorMessage,
        successMessage,
        categoryPath,
    } = useSelector(state => state.product);

    const [productTypeStock, setProductTypeStock] = useState(1000);
    const [selectedImage, setSelectedImage] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [allProductImages, setAllProductImages] = useState([]);

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

    const isMallShop = true;

    const handleSelectedImage = useCallback(e => {
        setSelectedImage(e.target.name);
    }, []);

    console.log('Parent rendering...');

    const handleSelectedType = e => {
        setSelectedImage(e.target.name);
        const productType = JSON.parse(e.target.dataset.productType);
        setProductTypeStock(productType.typeStock);
    };

    const handleAddToCart = e => {
        const cartInfo = {
            cartProduct: {
                productId: match.params.productId,
                productTypeId: product.productTypes[0]._id,
                quantity,
            },
        };

        dispatch(addToCart(cartInfo));
    };

    const handleDescStock = () => {
        setQuantity(prevState => (prevState === 1 ? 1 : prevState - 1));
    };

    const handleIncStock = useCallback(() => {
        const typeStock = document
            .getElementsByClassName('viewProductProductTypeStock')[0]
            .textContent.replace(' sản phẩm có sẵn', '');

        setQuantity(prevState => (prevState === Math.abs(typeStock) ? prevState : prevState + 1));
    }, [successMessage]);

    useEffect(() => {
        if (successMessage) {
            handleIncStock();
            setSelectedImage(product.images[0]);
            setAllProductImages(getAllImages(product));
        }
    }, [successMessage]);

    return (
        <>
            {/* <MetaData title="Product's detail" /> */}
            {!loading && product && (
                <ContentContainer>
                    <div style={{ margin: '2.5rem 0' }}>
                        <CategoryPath>
                            {categoryPath.length > 0 &&
                                categoryPath.map(category => (
                                    <Fragment key={category._id}>
                                        <div style={{ fontSize: '1.8rem', lineHeight: '2rem' }}>
                                            {category.categoryName}
                                        </div>
                                        <ArrowRight
                                            style={{
                                                margin: '0 1rem',
                                                width: '1.5rem',
                                                height: '1.5rem',
                                            }}
                                        />
                                    </Fragment>
                                ))}
                            <ProductCategory>{`${product.category.categoryName}`}</ProductCategory>

                            <ArrowRight
                                style={{ margin: '0 1rem', width: '1.5rem', height: '1.5rem' }}
                            />

                            <PrdName>{product.productName}</PrdName>
                        </CategoryPath>
                    </div>

                    <Flex
                        className="viewProductContainer"
                        width="100%"
                        alignItems="flex-start"
                        style={{ backgroundColor: '#fff' }}
                    >
                        <VPLeft className="viewProductLeft">
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
                        </VPLeft>

                        <VPRight className="viewProductRight">
                            <Flex>
                                {!isMallShop ? (
                                    <span className="viewProductFavorite">Yêu thích</span>
                                ) : (
                                    <MallIcon />
                                )}
                                <ProductName>{product.productName}</ProductName>
                            </Flex>

                            <Flex
                                justifyContent="flex-start"
                                style={{ marginTop: '1.5rem', cursor: 'pointer' }}
                            >
                                <Flex>
                                    <Rating>4.8</Rating>
                                    <Flex style={{ height: 'fit-content' }} justifyContent="center">
                                        {Array.apply(undefined, { length: 5 }).map((val, index) => (
                                            <StarIcon
                                                key={index}
                                                fillColor="#d0011b"
                                                style={{ display: 'block' }}
                                                width="1.8rem"
                                                height="1.8rem"
                                                stroke="#d0011b"
                                            />
                                        ))}
                                    </Flex>
                                </Flex>

                                <div className="seperator"></div>
                                <span className="viewProductNumberOfRating inline-block">
                                    <span className="undelineText">500</span>
                                    Đánh giá
                                </span>
                                <div className="seperator"></div>
                                <span className="viewProductSoldNumber inline-block">
                                    <span className="undelineText">1,3k</span> Đã Bán
                                </span>
                            </Flex>

                            <Flex
                                flexDirection="column"
                                padding="1.5rem 2rem"
                                width="100%"
                                style={{ backgroundColor: '#fafafa' }}
                            >
                                <Flex width="100%" height="4.5rem" justifyContent="flex-start">
                                    <OriginalPrice>
                                        <span>đ</span>
                                        {product.productTypes.length === 1
                                            ? separateNumberWithDot(
                                                  product.productTypes[0].typePrice
                                              )
                                            : separateNumberWithDot(170000)}
                                    </OriginalPrice>
                                    <PriceRange className="viewProductTypePriceRange">
                                        {Array.isArray(calculatePrice(product)) ? (
                                            <>
                                                <span>₫</span>
                                                {separateNumberWithDot(
                                                    calculatePrice(product)[0]
                                                )}{' '}
                                                -<span>₫</span>
                                                {separateNumberWithDot(calculatePrice(product)[1])}
                                            </>
                                        ) : (
                                            <>
                                                <span>₫</span>
                                                {separateNumberWithDot(calculatePrice(product))}
                                            </>
                                        )}
                                    </PriceRange>
                                    {product.discountPercent > 0 && (
                                        <DiscountPercent bgColor={bgColor}>
                                            {product.discountPercent} % GIẢM
                                        </DiscountPercent>
                                    )}
                                </Flex>
                                <Flex width="100%" height="4.5rem" justifyContent="flex-start">
                                    <Flex
                                        height="100%"
                                        justifyContent="flex-start"
                                        style={{ marginRight: '1rem' }}
                                    >
                                        <GiCungRe />
                                    </Flex>
                                    <Flex
                                        flexDirection="column"
                                        alignItems="flex-start"
                                        width="100%"
                                    >
                                        <Flex>
                                            <span
                                                style={{
                                                    display: 'inline-block',
                                                    fontSize: '1.8rem',
                                                    color: `${bgColor}`,
                                                }}
                                            >
                                                Gì Cũng Rẻ
                                            </span>
                                            <AskIcon
                                                width="2rem"
                                                height="2rem"
                                                stroke="#222"
                                                fillColor="#222"
                                            />
                                        </Flex>
                                        <NoteLine>
                                            Giá tốt nhất so với các sẩn phẩm cùng loại trên Shopee!
                                        </NoteLine>
                                    </Flex>
                                </Flex>
                            </Flex>

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
                                <Flex
                                    width="100%"
                                    alignItems="flex-start
                                    "
                                >
                                    <TransportTitle>Vận chuyển</TransportTitle>
                                    <TransportContent>
                                        <Flex>
                                            <FreeshipImg src={createImage('freeship.png')} />
                                            <span style={{ color: '#222222', fontSize: '18px' }}>
                                                {product.isFreeship && 'Miễn Phí Vận Chuyển'}
                                            </span>
                                        </Flex>

                                        <Flex flexDirection="column" alignItems="flex-start">
                                            <Flex>
                                                <VCT
                                                    style={{
                                                        fontSize: '2.25rem',
                                                        marginLeft: '.3125rem',
                                                        marginRight: '.3125rem',
                                                        stroke: '#000',
                                                    }}
                                                    width="2rem"
                                                    height="2rem"
                                                />
                                                <div className="viewProductTransportInfoTitle">
                                                    Vận Chuyển Tới
                                                </div>
                                                <div className="viewProductTransportTo">Hà Nội</div>
                                            </Flex>
                                            <Flex>
                                                <span className="viewProductTransportInfoTitle">
                                                    Phí Vận Chuyển
                                                </span>
                                                <span className="viewProductTransportTo">0đ</span>
                                            </Flex>
                                        </Flex>
                                    </TransportContent>
                                </Flex>
                            </div>
                            {product.productTypes.length > 1 && (
                                <div className="viewProductProductTypesContainer">
                                    <TransportTitle>Màu</TransportTitle>
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
                                <TransportTitle>Số Lượng</TransportTitle>
                                <Flex>
                                    <button
                                        className="viewProductChangeStockBtn"
                                        onClick={handleDescStock}
                                    >
                                        -
                                    </button>
                                    <p className="viewProductQuantity">{quantity}</p>
                                    <button
                                        className="viewProductChangeStockBtn"
                                        onClick={handleIncStock}
                                    >
                                        +
                                    </button>
                                </Flex>

                                <p className="viewProductProductTypeStock">
                                    {product.productTypes.length > 1
                                        ? productTypeStock
                                        : product.productTypes[0].typeStock}{' '}
                                    sản phẩm có sẵn
                                </p>
                            </div>
                            <Flex style={{ marginBottom: '3rem' }}>
                                <AddToCartBtn
                                    bgColor={bgColor}
                                    children={
                                        <>
                                            <PlusCart
                                                width="2.5rem"
                                                height="2.5rem"
                                                fill={bgColor}
                                            />
                                            <span>Thêm vào giỏ hàng</span>
                                        </>
                                    }
                                    onClick={handleAddToCart}
                                />
                                <BuyProductBtn bgColor={bgColor} />
                            </Flex>
                            <Flex
                                width="100%"
                                padding="3.125rem"
                                style={{ borderTop: '1px solid #f5f5f5' }}
                            >
                                <Flex width="33.3%">
                                    <First />
                                    <PolicyText>7 ngày miễn phí trả hàng</PolicyText>
                                </Flex>
                                <Flex width="33.3%">
                                    <Second />
                                    <PolicyText>Hàng chính hãng 100%</PolicyText>
                                </Flex>
                                <Flex width="33.3%">
                                    <Third />
                                    <PolicyText>Miễn phí vận chuyển</PolicyText>
                                </Flex>
                            </Flex>
                        </VPRight>
                    </Flex>
                </ContentContainer>
            )}
        </>
    );
}

export default ViewProduct;
