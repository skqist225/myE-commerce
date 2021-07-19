import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Flex, GridLayout, StandardSelfFlex } from '../../globalStyle';
import { createImage } from '../../helpers';
import {
    MarkLocationIcon,
    ProductIcon,
    ChatIcon2,
    Voucher,
    AddIcon,
    ShopeeCoin,
} from '../shopList/svgIcon.js';
import {
    ShippingAddress,
    UserInfo,
    Span,
    DefaultText,
    DecorationLine,
    ProductInfo,
    InfoTitle,
    ShopName,
    ProductImage,
    ProductName,
    AfterDiscountPrice,
    Quantity,
    FinalPrice,
    VoucherContainer,
    TransporterContainer,
    ChangeButton,
    GridItem,
    AddAddressButton,
    SettingAddressButton,
    SelectAddress,
    Coin,
    SelectPayment,
    GI,
} from './ViewCheckoutComponent';
import { separateNumberWithDot } from '../../helpers';
import { Link, useHistory } from 'react-router-dom';
import { addOrder, clearSuccessMessage } from '../../features/orders';
import slugify from 'slugify';
import { deleteUserCart } from '../../features/cart';

function ViewCheckout({ userAddresses }) {
    const selectedProductInCart = localStorage.getItem('cart')
        ? JSON.parse(localStorage.getItem('cart'))
        : [];
    const dispatch = useDispatch();
    const defaultAddress = userAddresses.find(address => address.isDefault);
    const {
        user: { coin },
    } = useSelector(state => state.auth);
    const { userInfo, successMessage } = useSelector(state => state.userAddresses);
    const [selectedAddress, setSelectedAddress] = useState(defaultAddress);
    const [selectAddress, setSelectAddress] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0);
    const { addOrderSuccess } = useSelector(state => state.orders);
    const history = useHistory();

    const handleAddress = address => {
        let computedAddress = '';
        let nameAndPhone = '';

        if (address) {
            const { street, ward, county, city, province, contactNumber } = address;

            computedAddress = `${street}${ward ? `, Phường ${ward}` : ','}${
                county ? `, Quận ${county}` : ''
            }${city ? `, Thành phố ${city}` : ','}${province ? `, ${province}` : ''}`;

            if (computedAddress.indexOf('phường')) {
                computedAddress = computedAddress.replace('phường', ' ');
            }

            nameAndPhone = `${userInfo.lastName} ${userInfo.firstName} (+84) ${contactNumber}`;
        }

        return [nameAndPhone, computedAddress];
    };

    const numberOfProducts = selectedProductInCart.reduce(
        (acc, [shopName, products]) => acc + products.length,
        0
    );

    const calculateTotalPrice = () => {
        const prices = document.getElementsByClassName('finalPrice');
        let totalPrice = 0;
        for (let price of prices) {
            totalPrice += price.textContent.replace('đ', '').replace(/\./g, '') * 1;
        }

        setTotalPrice(totalPrice);
    };

    const handleDescTotalPrice = () => {
        setTotalPrice(totalPrice - coin);
    };

    useEffect(() => {
        calculateTotalPrice();
    }, []);

    const handleRadioChange = e => {
        const addressId = e.target.value;

        const allRadioButton = document.getElementsByClassName('radioButton');

        for (let radioBtn of allRadioButton) {
            radioBtn.checked = false;

            if (radioBtn.value === addressId) {
                radioBtn.checked = true;
            }
        }
    };

    const changeAddress = () => {
        const allRadioButton = document.getElementsByClassName('radioButton');

        for (let radioBtn of allRadioButton) {
            if (radioBtn.checked) {
                setSelectedAddress(JSON.parse(radioBtn.dataset.address));
                setSelectAddress(false);
            }
        }
    };

    const processToOrder = () => {
        const ordersArray = [];
        selectedProductInCart.forEach(([shopInfo, products], index) => {
            const paymentType = 'cod';
            const transporter = '60d425b983c4499a2e571c64';

            const _products = products.map(product => ({
                productId: product._id,
                productTypeId: product.productTypes._id,
                quantity: product._quantity,
            }));

            ordersArray.push({
                shop: shopInfo.split(',')[1],
                products: _products,
                modeOfPayment: paymentType,
                transporter,
                deliveryAddress: selectedAddress._id,
            });
        });

        if (ordersArray.length > 0) {
            console.log(ordersArray);

            dispatch(addOrder(ordersArray));
        }
    };

    useEffect(() => {
        if (addOrderSuccess) {
            history.push('/order');
            localStorage.removeItem('cart');

            dispatch(clearSuccessMessage());
            dispatch(deleteUserCart());
        }
    }, [addOrderSuccess]);

    return (
        <>
            <DecorationLine />
            {!selectAddress && userAddresses ? (
                <ShippingAddress>
                    <Flex width="100%" style={{ marginBottom: '2.5rem' }}>
                        <div style={{ marginRight: '1rem' }}>
                            <MarkLocationIcon width="12px" height="16px" fill=" #ee4d2d" />
                        </div>
                        <Span>Địa Chỉ Nhận Hàng</Span>
                    </Flex>
                    <Flex alignItems="flex-start">
                        <UserInfo>{handleAddress(selectedAddress)[0]}</UserInfo>
                        <div style={{ fontSize: '2rem', lineHeight: '2rem' }}>
                            {handleAddress(selectedAddress)[1]}
                        </div>
                        <DefaultText>Mặc định</DefaultText>
                        <Button
                            backgroundColor="transparent"
                            color="#0055aa"
                            width="11rem"
                            fontSize="1.75rem"
                            style={{ marginLeft: '4rem', display: 'inline-block' }}
                            onClick={() => setSelectAddress(true)}
                        >
                            Thay Đổi
                        </Button>
                    </Flex>
                </ShippingAddress>
            ) : (
                <SelectAddress>
                    <Flex
                        width="100%"
                        style={{ marginBottom: '2.5rem' }}
                        justifyContent="space-between"
                        alignItems="flex-start"
                    >
                        <Flex style={{ flex: '1', maxWidth: '50%' }}>
                            {' '}
                            <Flex style={{ marginRight: '1rem' }} justifyContent="center">
                                <MarkLocationIcon width="12px" height="16px" fill=" #ee4d2d" />
                            </Flex>
                            <Span>Địa Chỉ Nhận Hàng</Span>
                        </Flex>
                        <Flex style={{ flex: '1', maxWidth: '50%' }} justifyContent="flex-end">
                            <AddAddressButton>
                                <AddIcon
                                    width="12px"
                                    height="14px"
                                    style={{ marginRight: '1rem' }}
                                />
                                Thêm Địa Chỉ Mới
                            </AddAddressButton>
                            <SettingAddressButton>Thiết Lập Địa Chỉ</SettingAddressButton>
                        </Flex>
                    </Flex>
                    <Flex flexDirection="column">
                        {userAddresses.map(address => (
                            <Flex
                                key={address._id}
                                padding=".9rem 2.4rem"
                                justifyContent="flex-start"
                                width="100%"
                                key={address._id}
                                alignItems="flex-start"
                            >
                                <input
                                    type="radio"
                                    value={address._id}
                                    onChange={handleRadioChange}
                                    className="radioButton"
                                    data-address={JSON.stringify(address)}
                                />
                                <UserInfo>{handleAddress(address)[0]}</UserInfo>
                                <Flex
                                    alignItems="flex-start"
                                    style={
                                        address.isDefault
                                            ? { display: 'flex' }
                                            : { display: 'block', width: '86%' }
                                    }
                                >
                                    <div style={{ fontSize: '2rem', lineHeight: '2rem' }}>
                                        {handleAddress(address)[1]}
                                    </div>
                                    {address.isDefault && <DefaultText>Mặc định</DefaultText>}
                                </Flex>
                            </Flex>
                        ))}
                    </Flex>
                    <Flex width="100%" padding="2rem 6.5rem">
                        <Button
                            padding="1rem 2.4rem"
                            fontSize="1.4rem"
                            backgroundColor="#ee4d2d"
                            color="#fff"
                            borderRadius="2px"
                            style={{ marginRight: '2rem' }}
                            onClick={changeAddress}
                        >
                            Hoàn Thành
                        </Button>
                        <Button
                            onClick={() => setSelectAddress(false)}
                            padding="1rem 2.4rem"
                            fontSize="1.4rem"
                            backgroundColor="#fff"
                            color="#222"
                            borderRadius="2px"
                            border="1px solid #dbdbdb"
                        >
                            Trở Lại
                        </Button>
                    </Flex>
                </SelectAddress>
            )}

            <ProductInfo>
                <Flex
                    justifyContent="space-between"
                    height="calc(7.4rem - 3.4rem)"
                    alignItems="center"
                >
                    <StandardSelfFlex
                        style={{
                            flex: '1',
                            maxWidth: '55%',
                            color: '#222',
                            fontSize: '1.8rem',
                            justifyContent: 'flex-start',
                        }}
                    >
                        Sản phẩm
                    </StandardSelfFlex>
                    <Flex style={{ flex: '1', maxWidth: '45%' }}>
                        <InfoTitle>Đơn giá</InfoTitle>
                        <InfoTitle>Số lượng</InfoTitle>
                        <div style={{ flex: '1' }}></div>
                        <InfoTitle>Thành tiền</InfoTitle>
                    </Flex>
                </Flex>

                {selectedProductInCart.map(([shopInfo, products]) => (
                    <React.Fragment key={shopInfo.split(',')[1]}>
                        <Flex height="5rem">
                            <ProductIcon width="1.7rem" height="1.6rem" />{' '}
                            <Link
                                to={`/shop/${slugify(shopInfo.split(',')[0], {
                                    replacement: '_',
                                    lower: true,
                                })}`}
                            >
                                {' '}
                                <ShopName>{shopInfo.split(',')[0]}</ShopName>
                            </Link>
                            <Flex>
                                <ChatIcon2 width="2.75rem" height="2rem" fill="#00bfa5" />
                                <span
                                    style={{
                                        color: '#00bfa5',
                                        display: 'inline-block',
                                        marginLeft: '1rem',
                                        fontSize: '1.75rem',
                                    }}
                                >
                                    {' '}
                                    Chat ngay
                                </span>
                            </Flex>
                        </Flex>
                        {products.map(product => (
                            <Flex key={product._id} height="5.5rem">
                                <Flex style={{ flex: '1', maxWidth: '55%' }}>
                                    <ProductImage
                                        src={createImage(product.productTypes.typeImage, false)}
                                    />

                                    <ProductName> {product.productName}</ProductName>
                                    <div style={{ flex: '1' }}></div>
                                    <InfoTitle>Loại: {product.productTypes.typeName}</InfoTitle>
                                </Flex>
                                <Flex style={{ flex: '1', maxWidth: '45%' }}>
                                    <AfterDiscountPrice>
                                        đ {separateNumberWithDot(product.afterDiscountPrice)}
                                    </AfterDiscountPrice>
                                    <Quantity>{product._quantity}</Quantity>
                                    <div style={{ flex: '1', width: '25%' }}></div>
                                    <FinalPrice className="finalPrice">
                                        đ
                                        {separateNumberWithDot(
                                            product.afterDiscountPrice * product._quantity
                                        )}
                                    </FinalPrice>
                                </Flex>
                            </Flex>
                        ))}
                    </React.Fragment>
                ))}
            </ProductInfo>
            <VoucherContainer>
                <Flex style={{ flex: '1' }}></Flex>
                <Flex style={{ flex: '1', fontSize: '1.4rem' }}>
                    <Voucher width="2.625rem" height="2.5rem" fill="#ee4d2d" />
                    <div>Voucher của Shop</div>
                    <div style={{ flex: '1' }}></div>
                    <div style={{ color: '#0055aa', cursor: 'pointer' }}>Chọn voucher</div>
                </Flex>
            </VoucherContainer>
            <TransporterContainer>
                <Flex style={{ flex: '1', maxWidth: '40%' }} padding="1.6rem 3rem">
                    {' '}
                    <div style={{ lineHeight: '4rem', fontSize: '1.8rem', width: '25%' }}>
                        Lời nhắn:
                    </div>
                    <div style={{ flex: '1' }}>
                        <input
                            type="text"
                            placeholder="Lưu ý cho người bán"
                            style={{
                                padding: '.4rem 1.2rem',
                                width: '100%',
                                height: '4rem',
                                color: '#222',
                                fontSize: '1.75rem',
                                border: 'none',
                                outline: 'none',
                                border: '1px solid #dbdbdb',
                            }}
                        />
                    </div>
                </Flex>
                <GridLayout
                    style={{
                        flex: '1',
                        maxWidth: '60%',
                        gridTemplateRows: '1fr 1fr',
                        gridColumnGap: '1rem',
                        height: '100%',
                    }}
                    padding="1.6rem 0"
                    templateColumns="1.5fr 1.5fr 1fr 1fr"
                >
                    <GridItem>Đơn vị vận chuyển:</GridItem>
                    <GridItem>Nhanh</GridItem>
                    <GridItem className="changeButton">
                        <ChangeButton>THAY ĐỔI</ChangeButton>
                    </GridItem>
                    <GridItem className="lineTwo"> Nhận hàng vào 20 Th07 - 1 Th08</GridItem>

                    <GridItem>đ {separateNumberWithDot(30000)}</GridItem>
                </GridLayout>
            </TransporterContainer>
            <Flex height="7.3rem" style={{ backgroundColor: '#fff', padding: '0 3rem' }}>
                <div style={{ flex: '1' }}></div>
                <div>
                    <div style={{ fontSize: '1.4rem', color: '#929292' }}>
                        Tổng số tiền ({numberOfProducts} sản phẩm):{' '}
                        <span
                            style={{
                                marginLeft: '20px',
                                fontSize: '2rem',
                                color: '#ee4d2d',
                            }}
                        >
                            đ {separateNumberWithDot(totalPrice)}
                        </span>
                    </div>
                </div>
            </Flex>
            <Flex
                height="16rem"
                style={{ backgroundColor: '#fff' }}
                flexDirection="column"
                alignItems="flex-start"
            >
                <Flex padding="2.8rem 3rem" width="100%">
                    <Flex>
                        <Voucher width="2.625rem" height="2.5rem" fill="#ee4d2d" />
                        <span style={{ fontSize: '1.8rem' }}>Shopee Voucher</span>
                    </Flex>
                    <div style={{ flex: '1' }}></div>
                    <div style={{ color: '#0055aa', cursor: 'pointer', fontSize: '1.4rem' }}>
                        Chọn voucher
                    </div>
                </Flex>
                <Flex padding="2.8rem 3rem" width="100%">
                    <Flex width="100%">
                        <ShopeeCoin width="2.4rem" height="1.8rem" fill="#ee4d2d" />
                        <span style={{ fontSize: '1.8rem', margin: '0 .8rem' }}>Shopee Xu</span>
                        <Coin>Dùng {coin} Shopee Xu</Coin>
                        <div style={{ flex: '1' }}></div>
                        <Flex>
                            <div
                                style={{
                                    paddingRight: '12px',
                                    fontWeight: 500,
                                    color: '#d0d0d0',
                                    fontSize: '1.75rem',
                                }}
                            >
                                [-₫{separateNumberWithDot(coin)}]
                            </div>{' '}
                            <input type="checkbox" onClick={handleDescTotalPrice} />
                        </Flex>
                    </Flex>
                </Flex>
                <SelectPayment flexDirection="column">
                    <Flex width="100%" height="9rem" padding="0 3rem">
                        <div style={{ fontSize: '1.8rem', flex: '1' }}>Phương thức thanh toán</div>
                        <Flex>
                            <div style={{ fontSize: '1.4rem', color: '#222' }}>
                                Thanh toán khi nhận hàng
                            </div>
                            <Button
                                backgroundColor="transparent"
                                color="#0055aa"
                                width="11rem"
                                fontSize="1.75rem"
                                style={{ marginLeft: '4rem', display: 'inline-block' }}
                            >
                                Thay Đổi
                            </Button>
                        </Flex>
                    </Flex>
                    <Flex width="100%" height="16rem">
                        <div style={{ flex: '1' }}></div>
                        <GridLayout
                            templateColumns="1fr 1fr"
                            style={{
                                gridTemplateRows: '1fr 1fr 1fr',
                                width: '25%',
                                gridColumnGap: '1rem',
                                height: '100%',
                            }}
                        >
                            <GI>Tổng tiền hàng</GI>
                            <GI>{separateNumberWithDot(totalPrice)}</GI>
                            <GI>Phí vận chuyển</GI>
                            <GI>{separateNumberWithDot(30000)}</GI>
                            <GI>Tổng thanh toán</GI>
                            <GI>{separateNumberWithDot(totalPrice + 30000)}</GI>
                        </GridLayout>
                    </Flex>
                    <Flex
                        width="100%"
                        height="9.6rem"
                        style={{
                            padding: '0 3rem',
                            borderTop: '1px dashed rgba(0,0,0,.09)',
                            marginTop: '1rem',
                            backgroundColor: '#fff',
                        }}
                    >
                        <div style={{ padding: '1.2rem 1.4rem', fontSize: '1.4rem' }}>
                            Nhấn "Đặt hàng" đồng nghĩa với việc bạn đồng ý tuân theo{' '}
                            <Link to="/">Điều khoản Shopee</Link>
                        </div>
                        <div style={{ flex: '1' }}></div>
                        <div>
                            <Button
                                height="4rem"
                                width="24rem"
                                backgroundColor="#ee4d2d"
                                color="#fff"
                                fontSize="1.6rem"
                                onClick={processToOrder}
                            >
                                Đặt Hàng
                            </Button>
                        </div>
                    </Flex>
                </SelectPayment>
            </Flex>
        </>
    );
}

export default ViewCheckout;
