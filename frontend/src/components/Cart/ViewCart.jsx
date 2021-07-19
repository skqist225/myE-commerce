import React, { useEffect, useState, useMemo } from 'react';
import ReactDOM from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, ContentContainer, Flex, WhiteBgWrapper } from '../../globalStyle';
import { createImage, separateNumberWithDot } from '../../helpers';
import { OriginalPrice } from '../products/ViewProductComponent';
import { CheckboxInput, Label } from '../shopList/ShopProductsComponent';
import { FreeshipIcon, ChatIcon2, ProductIcon, DropDownIcon, Voucher } from '../shopList/svgIcon';
import { deleteProductInCart } from '../../features/cart';

import {
    FreeshipNotification,
    Text,
    InfoBar,
    RightTitle,
    CartProducts,
    Product,
    ShopName,
    Line,
    ProductImg,
    ProductName,
    DeleteButton,
    FreeshipImage,
    FunctionText,
    FunctionTextWrapper,
    ProductRight,
    ProductLeft,
    FinalPrice,
    BuyProductBar,
    ChooseVoucher,
    SelectAll,
    SaveFavorite,
    BuyButton,
    TotalPay,
    OpacityBackground,
    Modal,
    YesButton,
    CancelButton,
    ModalContainer,
    OKButton,
} from './ViewCartComponent';
import OutsideClickHandler from './OutsideClickHandler';
import { useHistory } from 'react-router-dom';

function ViewCart() {
    const dispatch = useDispatch();
    const history = useHistory();
    const { cart, loading, successMessage, deleteSuccessMessage } = useSelector(
        state => state.cart
    );
    const [quantity, setQuantity] = useState(new Map());
    const [showModal, setShowModal] = useState({ anchor: null });
    const [showNotifyModal, setShowNotifyModal] = useState({ anchor: null });
    const [allCartProducts, setAllCartProducts] = useState(false);
    const [allShopProducts, setAllShopProducts] = useState(false);
    const [finalPrice, setFinalPrice] = useState(0);
    const [savedPrice, setSavedPrice] = useState(0);
    const [productName, setProductName] = useState('');
    const [productId, setProductId] = useState('');
    const [numberOfSelectedProducts, setNumberOfSelectedProducts] = useState(0);

    const handleQuantityChangeAndAllProductsSeleted = () => {
        const _finalPrice = document.getElementsByClassName('finalPrice');
        const originalPrice = document.getElementsByClassName('originalPrice');
        const totalPrice = Array.from(_finalPrice).reduce(
            (acc, item) => acc + item.textContent.replace(/\./g, '') * 1,
            0
        );

        const savedPrice = Array.from(originalPrice).reduce((acc, item, index) => {
            if (item.textContent !== '') {
                return (
                    acc +
                    Math.abs(item.textContent.replace('đ', '').replace(/\./g, '')) *
                        quantity.get(item.dataset.productId) -
                    _finalPrice[index].textContent.replace(/\./g, '') * 1
                );
            }

            return acc;
        }, 0);
        setSavedPrice(savedPrice);
        setFinalPrice(totalPrice);
    };

    const DeleteProductInCartModal = ({ children }) => {
        const parent = document.getElementById('root');
        return ReactDOM.createPortal(children, parent);
    };

    const NotifySelectProductInCart = ({ children }) => {
        const parent = document.getElementById('root');
        return ReactDOM.createPortal(children, parent);
    };

    const Child = () => {
        const handleDeleteProduct = () => {
            dispatch(deleteProductInCart(productId));
        };

        const handleCloseModal = e => {
            setShowModal({ anchor: null });
        };

        console.log('Child rendering...');

        return (
            <ModalContainer>
                <OpacityBackground>
                    <OutsideClickHandler onClickOutside={handleCloseModal}>
                        <Modal className="insideModal">
                            <div className="modalHeader">
                                Bạn chắc chắn muốn xóa bỏ sản phẩm này ?{' '}
                            </div>

                            <div style={{ flex: '1' }}>{productName}</div>
                            <Flex width="100%" justifyContent="space-between">
                                <YesButton children="Có" onClick={handleDeleteProduct} />
                                <CancelButton children="Không" onClick={handleCloseModal} />
                            </Flex>
                        </Modal>
                    </OutsideClickHandler>
                </OpacityBackground>
            </ModalContainer>
        );
    };

    const SelectProductNotification = () => {
        const handleCloseModal = e => {
            setShowNotifyModal({ anchor: null });
        };

        return (
            <ModalContainer>
                <OpacityBackground>
                    <OutsideClickHandler onClickOutside={handleCloseModal}>
                        <Modal className="insideModal">
                            <div className="modalHeader">
                                Bạn vẫn chưa chọn sản phẩm nào để mua.
                            </div>
                            <div style={{ flex: '1' }}></div>
                            <Flex width="100%" justifyContent="space-between">
                                <OKButton children="OK" onClick={handleCloseModal} />
                            </Flex>
                        </Modal>
                    </OutsideClickHandler>
                </OpacityBackground>
            </ModalContainer>
        );
    };

    const deleteModal = useMemo(() => {
        return showModal.anchor ? (
            <DeleteProductInCartModal>
                <Child />
            </DeleteProductInCartModal>
        ) : null;
    }, [showModal.anchor]);

    const notifyModal = useMemo(() => {
        return showNotifyModal.anchor ? (
            <NotifySelectProductInCart>
                <SelectProductNotification />
            </NotifySelectProductInCart>
        ) : null;
    }, [showNotifyModal.anchor]);

    const handleDescStock = e => {
        const { productId } = e.target.dataset;
        let product;

        if (quantity.get(productId) - 1 === 0) {
            cart.forEach(
                ({ products }) =>
                    (product = products.find(
                        ({ product }) => product._id.toString() === productId.toString()
                    ))
            );
            const {
                product: { productName },
            } = product;

            setProductName(productName);
            setProductId(productId);
            setShowModal(prevState => {
                if (prevState.anchor) {
                    return { anchor: null };
                }
                return { anchor: e.target };
            });
        }

        (() => {
            setQuantity(prevState =>
                prevState.get(productId) - 1 === 0
                    ? new Map(prevState)
                    : new Map(prevState.set(productId, prevState.get(productId) - 1))
            );

            if (allCartProducts) {
                handleQuantityChangeAndAllProductsSeleted();
            } else {
                return;
            }
        })();
    };

    const handleIncStock = e => {
        const { productId, typeStock } = e.target.dataset;

        setQuantity(prevState =>
            prevState.get(productId) === Math.abs(typeStock)
                ? new Map(prevState)
                : new Map(prevState.set(productId, prevState.get(productId) + 1))
        );

        if (allCartProducts) {
            handleQuantityChangeAndAllProductsSeleted();
        } else {
            return;
        }
    };

    const handleSelectAllProductsInShop = e => {
        const allCb = document.getElementsByClassName('cbProductSelected');
        setAllShopProducts(prevState => !prevState);

        if (e.target.checked) {
            for (let cb of allCb) {
                if (cb.dataset.shopId === e.target.value) {
                    cb.checked = true;
                }
            }
            setNumberOfSelectedProducts(allCb.length);
            handleQuantityChangeAndAllProductsSeleted();
        } else {
            for (let cb of allCb) {
                if (cb.dataset.shopId === e.target.value) {
                    cb.checked = false;
                }
            }
            setNumberOfSelectedProducts(0);
            setFinalPrice(0);
        }
    };

    const handleSelectAllProductsInCart = e => {
        setAllCartProducts(prevState => !prevState);
        const allCb = document.getElementsByClassName('cbProductSelected');
        const cbSelectALl = document.getElementsByClassName('cbSelectAll')[0];

        if (e.target.checked) {
            for (let cb of allCb) {
                cb.checked = true;
            }
            setAllShopProducts(() => true);
            cbSelectALl.checked = true;
            setNumberOfSelectedProducts(allCb.length);

            handleQuantityChangeAndAllProductsSeleted();
        } else {
            for (let cb of allCb) {
                cb.checked = false;
            }
            setAllShopProducts(() => false);
            cbSelectALl.checked = false;
            setNumberOfSelectedProducts(0);
            setFinalPrice(0);
        }
    };

    const handleDeleteProductFromCart = e => {
        const { productId } = e.target.dataset;
        dispatch(deleteProductInCart(productId));
    };

    const handleProcessToOrder = e => {
        const allCb = document.getElementsByClassName('cbProductSelected');
        const selectedProductInfo = new Map();
        for (let cb of allCb) {
            if (cb.checked) {
                cart.forEach(({ products, shop: { shopName, _id: shopId } }) => {
                    products.forEach(({ product }) => {
                        const shopObj = `${shopName},${shopId}`;

                        if (product._id === cb.value) {
                            const productObj = {
                                ...product,
                                afterDiscountPrice: product.discountPercent
                                    ? product.productTypes.typePrice -
                                      product.productTypes.typePrice *
                                          (product.discountPercent / 100)
                                    : product.productTypes.typePrice,
                                _quantity: quantity.get(product._id),
                            };

                            selectedProductInfo.has(shopObj)
                                ? selectedProductInfo.set(
                                      shopObj,
                                      selectedProductInfo.get(shopObj).concat(productObj)
                                  )
                                : selectedProductInfo.set(shopObj, [productObj]);
                        }
                    });
                });
            }
        }

        if (selectedProductInfo.size < 1) {
            setShowNotifyModal(prevState => {
                if (prevState.anchor) {
                    return { anchor: null };
                } else {
                    return { anchor: e.target };
                }
            });

            return;
        }

        const [[shopInfo, products]] = selectedProductInfo;

        console.log(shopInfo, products);
        const cartLocalStore = localStorage.getItem('cart');

        if (cartLocalStore) {
            localStorage.removeItem('cart');
        }

        localStorage.setItem('cart', JSON.stringify(Array.from(selectedProductInfo.entries())));
        history.push('/checkout');
    };

    console.log('view cart rendering...');

    useEffect(() => {
        if (deleteSuccessMessage) {
            setShowModal(false);
        }
    }, [deleteSuccessMessage]);

    useEffect(() => {
        if (cart.length > 0) {
            const productAndStock = new Map();
            cart.forEach($cart => {
                $cart.products.forEach(product =>
                    productAndStock.set(product.product._id, product.quantity)
                );
            });
            setQuantity(productAndStock);
        }
    }, [cart]);

    return (
        <>
            {loading !== 'pending' && cart.length > 0 ? (
                <div id="viewCartParent">
                    {deleteModal}
                    {notifyModal}
                    <FreeshipNotification>
                        <FreeshipIcon width="3rem" height="1.8rem" />
                        <Text>
                            Nhấn vào mục Mã giảm giá ở cuối trang để hưởng miễn phí vận chuyển bạn
                            nhé!
                        </Text>
                    </FreeshipNotification>
                    <InfoBar>
                        <Flex width="50%">
                            <CheckboxInput
                                value={allCartProducts}
                                onChange={handleSelectAllProductsInCart}
                                checked={allCartProducts}
                            />
                            <Label
                                style={{
                                    color: ' rgba(0,0,0,0.8)',
                                    width: '46.27949%',
                                    fontSize: '1.4rem',
                                    marginLeft: '.625rem',
                                }}
                            >
                                Sản phẩm
                            </Label>
                        </Flex>
                        <RightTitle width="50%" justifyContent="space-between">
                            <div>đơn giá</div>
                            <div>số lượng</div>
                            <div>số tiền</div>
                            <div>thao tác</div>
                        </RightTitle>
                    </InfoBar>
                    <CartProducts width="100%">
                        {cart.map($cart => (
                            <Product key={$cart._id}>
                                <ShopName>
                                    <CheckboxInput
                                        width="1.8rem"
                                        height="1.8rem"
                                        style={{ marginRight: '1.8rem' }}
                                        className="cbShopSelected"
                                        onChange={handleSelectAllProductsInShop}
                                        checked={allShopProducts}
                                        value={$cart.shop._id}
                                    />
                                    <ProductIcon width="1.7rem" height="1.6rem" />
                                    <span>{$cart._id}</span>
                                    <ChatIcon2 width="2.75rem" height="2rem" fill="#ee4d2d" />
                                </ShopName>
                                <Line />
                                {$cart.products.map(({ product }) => (
                                    <Flex key={product._id} height="13rem" width="100%">
                                        <ProductLeft style={{ flex: '1' }}>
                                            <CheckboxInput
                                                width="1.8rem"
                                                height="1.8rem"
                                                style={{ marginRight: '1.8rem' }}
                                                className="cbProductSelected"
                                                value={product._id}
                                                data-shop-id={$cart.shop._id}
                                            />
                                            <ProductImg
                                                src={createImage(
                                                    product.productTypes.typeImage,
                                                    false
                                                )}
                                            />
                                            <Flex
                                                style={{ flexWrap: 'wrap' }}
                                                flexDirection="column"
                                                padding=".5rem 2rem 0 1rem"
                                                alignItems="flex-start"
                                                width="22.5rem"
                                            >
                                                <ProductName to={`/product/${product._id}`}>
                                                    {product.productName}
                                                </ProductName>
                                                {product.isFreeship && (
                                                    <FreeshipImage src={createImage('FShip.png')} />
                                                )}
                                            </Flex>
                                            <Flex
                                                flexDirection="column"
                                                alignItems="flex-start"
                                                width="17.5rem"
                                            >
                                                <Flex
                                                    style={{
                                                        fontSize: '1.8rem',
                                                        color: 'rgba(0,0,0,0.54)',
                                                    }}
                                                >
                                                    <span>Phân loại hàng:</span>
                                                    <Button backgroundColor="transparent">
                                                        <DropDownIcon
                                                            width="1rem"
                                                            height="1rem"
                                                            fill="#222"
                                                        />
                                                    </Button>
                                                </Flex>
                                                <div
                                                    style={{
                                                        fontSize: '1.8rem',
                                                        color: 'rgba(0,0,0,0.54)',
                                                    }}
                                                >
                                                    {product.productTypes.typeName}
                                                </div>
                                            </Flex>
                                        </ProductLeft>
                                        <ProductRight>
                                            <Flex>
                                                <OriginalPrice
                                                    fontSize="1.75rem"
                                                    className="originalPrice"
                                                    data-product-id={product._id}
                                                >
                                                    {product.discountPercent > 0 && (
                                                        <>
                                                            <span>đ</span>
                                                            {separateNumberWithDot(
                                                                product.productTypes.typePrice
                                                            )}
                                                        </>
                                                    )}
                                                </OriginalPrice>

                                                <span
                                                    style={{
                                                        fontSize: '1.75rem',
                                                        color: '#000',
                                                        fontWeight: '400',
                                                    }}
                                                >
                                                    {product.discountPercent > 0
                                                        ? separateNumberWithDot(
                                                              product.productTypes.typePrice -
                                                                  product.productTypes.typePrice *
                                                                      (product.discountPercent /
                                                                          100)
                                                          )
                                                        : separateNumberWithDot(
                                                              product.productTypes.typePrice
                                                          )}
                                                </span>
                                            </Flex>
                                            <Flex style={{ marginRight: '3rem' }}>
                                                <button
                                                    className="viewProductChangeStockBtn"
                                                    onClick={handleDescStock}
                                                    data-product-id={product._id}
                                                    data-product-name={product.productName}
                                                >
                                                    -
                                                </button>
                                                <p className="viewProductQuantity">
                                                    {quantity.get(product._id)}
                                                </p>
                                                <button
                                                    className="viewProductChangeStockBtn"
                                                    onClick={handleIncStock}
                                                    data-type-stock={product.productTypes.typeStock}
                                                    data-product-id={product._id}
                                                >
                                                    +
                                                </button>
                                            </Flex>
                                            <FinalPrice>
                                                <span>đ</span>
                                                <span className="finalPrice">
                                                    {product.discountPercent > 0
                                                        ? separateNumberWithDot(
                                                              (product.productTypes.typePrice -
                                                                  product.productTypes.typePrice *
                                                                      (product.discountPercent /
                                                                          100)) *
                                                                  quantity.get(product._id)
                                                          )
                                                        : separateNumberWithDot(
                                                              product.productTypes.typePrice *
                                                                  quantity.get(product._id)
                                                          )}
                                                </span>
                                            </FinalPrice>
                                            <FunctionTextWrapper>
                                                <DeleteButton
                                                    onClick={handleDeleteProductFromCart}
                                                    data-product-id={product._id}
                                                >
                                                    Xóa
                                                </DeleteButton>
                                                <FunctionText>
                                                    Tìm sản phẩm tuơng tự{' '}
                                                    <DropDownIcon
                                                        width="1rem"
                                                        height="1rem"
                                                        fill="#ee4d2d"
                                                    />
                                                </FunctionText>
                                            </FunctionTextWrapper>
                                        </ProductRight>
                                    </Flex>
                                ))}
                            </Product>
                        ))}
                    </CartProducts>

                    <BuyProductBar>
                        <ContentContainer>
                            <WhiteBgWrapper>
                                <Flex padding="1.5rem 1.5rem 1.5rem">
                                    <div style={{ flex: '1', maxWidth: '50%' }}></div>
                                    <Flex
                                        style={{ flex: '1', maxWidth: '50%' }}
                                        justifyContent="space-between"
                                    >
                                        <Flex>
                                            <Voucher
                                                width="2.625rem"
                                                height="2.5rem"
                                                fill="#ee4d2d"
                                            />
                                            <span
                                                style={{
                                                    margin: '0 .625rem',
                                                    fontWeight: '500',
                                                    fontSize: '2rem',
                                                }}
                                            >
                                                Shopee Voucher
                                            </span>
                                        </Flex>
                                        <ChooseVoucher>Chọn Hoặc Nhập Mã</ChooseVoucher>
                                    </Flex>
                                </Flex>
                                <Flex padding="1.5rem 1.5rem 0">
                                    <div style={{ flex: '1', maxWidth: '50%' }}></div>
                                    <Flex
                                        style={{ flex: '1', maxWidth: '50%' }}
                                        justifyContent="space-between"
                                    >
                                        <Flex>
                                            <Voucher
                                                width="2.625rem"
                                                height="2.5rem"
                                                fill="#ee4d2d"
                                            />
                                            <span
                                                style={{
                                                    margin: '0 .625rem',
                                                    fontWeight: '500',
                                                    fontSize: '2rem',
                                                }}
                                            >
                                                Shopee Voucher
                                            </span>
                                        </Flex>
                                        <ChooseVoucher>Chọn Hoặc Nhập Mã</ChooseVoucher>
                                    </Flex>
                                </Flex>
                                <Flex width="100%">
                                    <Flex style={{ flex: '1', maxWidth: '45%' }}>
                                        {' '}
                                        <CheckboxInput
                                            width="1.75rem"
                                            height="1.75rem"
                                            style={{ marginRight: '2rem' }}
                                            className="cbSelectAll"
                                        />
                                        <SelectAll>
                                            Chọn Tất Cả ({' '}
                                            {cart.reduce((acc, item) => acc + item.count, 0)})
                                        </SelectAll>
                                        <DeleteButton fontSize="2rem">Xóa</DeleteButton>
                                        <SaveFavorite>Lưu vào mục ưu thích</SaveFavorite>
                                    </Flex>
                                    <Flex
                                        style={{ flex: '1', maxWidth: '55%' }}
                                        justifyContent="flex-end"
                                    >
                                        <Flex flexDirection="column" alignItems="flex-end">
                                            <TotalPay className="first">
                                                <span>
                                                    Tổng thanh toán ({numberOfSelectedProducts} sản
                                                    phẩm):
                                                </span>
                                                <span className="hightlightText">
                                                    {separateNumberWithDot(finalPrice)}
                                                </span>
                                            </TotalPay>
                                            <TotalPay fontSize="1.4rem">
                                                Tiết kiệm:
                                                <span className="savedPrice">
                                                    <span>đ</span>
                                                    {separateNumberWithDot(savedPrice)}
                                                </span>
                                            </TotalPay>
                                        </Flex>

                                        <BuyButton onClick={handleProcessToOrder}>
                                            Mua Hàng
                                        </BuyButton>
                                    </Flex>
                                </Flex>
                            </WhiteBgWrapper>
                        </ContentContainer>
                    </BuyProductBar>
                </div>
            ) : (
                <h1>Không có sản phẩm</h1>
            )}
        </>
    );
}

export default ViewCart;
