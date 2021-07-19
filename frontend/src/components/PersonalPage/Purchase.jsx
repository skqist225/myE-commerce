import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
    fetchUserOrders,
    getOrdersByOrderStatus,
    ordersSelector,
} from '../../features/orders/ordersSlice';
import {
    PurchaseContainer,
    OrderTypeSelection,
    OrderBox,
    OrderHeader,
    ViewShop,
    ChatWithShop,
    OrderFooter,
    OrderFooterButton,
} from './PurchaseComponent';
import { MenuList, MenuItem, Flex, Button } from '../../globalStyle';
import {
    AskIcon,
    ChatIcon2,
    FavoriteShop,
    FreeshipIcon,
    ProductIcon,
    DragonIcon,
} from '../shopList/svgIcon';
import OrderDetail from '../OrderDetails/OrderDetail';
import { separateNumberWithDot } from '../../helpers';
import slugify from 'slugify';

function Purchase({ url, match }) {
    const dispatch = useDispatch();
    const orders = useSelector(ordersSelector.selectAll);

    let itemList = [
        {
            path: `${url}?type=6`,
            title: 'Tất cả',
        },
        { path: `${url}?type=9`, title: 'Chờ xác nhận' },
        {
            path: `${url}?type=7`,
            title: 'Chờ lấy hàng',
        },
        {
            path: `${url}?type=8`,
            title: 'Đang giao',
        },
        { path: `${url}?type=3`, title: 'Đã giao' },
        { path: `${url}?type=4`, title: 'Đã hủy' },
        { path: `${url}??type=2`, title: 'Hoàn tiền' },
    ];

    const handleOrderFilterChange = () => {
        const orderTypes = document.getElementsByClassName('orderTypeSelection')[0];

        for (const orderType of orderTypes.childNodes) {
            orderType.addEventListener('click', function (e) {
                e.preventDefault();

                for (const orderType of orderTypes.childNodes) {
                    orderType.childNodes[0].classList.remove('active');
                }

                this.childNodes[0].classList.add('active');

                let { path } = this.dataset;
                const typeNumber = path.split('=')[1];

                dispatch(fetchUserOrders(typeNumber));
            });
        }
    };

    function alternateName(orderStatus) {
        switch (orderStatus) {
            case 'confirming':
                return 'Chờ xác nhận';
            case 'packing':
                return 'Chờ lấy hàng';
            case 'shipping':
                return 'Đang giao hàng';
            case 'delivered':
                return 'Đã giao';
            case 'cancelled':
                return 'Đã hủy';
            case 'refund':
                return 'Đã hoàn tiền';
        }
    }

    useEffect(() => {
        handleOrderFilterChange();
    }, []);

    useEffect(() => {
        dispatch(fetchUserOrders());
    }, [dispatch]);

    return (
        <PurchaseContainer>
            <OrderTypeSelection className="orderTypeSelection">
                {itemList.map((item, index) => (
                    <Link
                        to={item.path}
                        key={item.title}
                        style={{ width: 'calc(100% /7)' }}
                        data-path={item.path}
                    >
                        <MenuItem
                            width="100%"
                            fontSize="1.6rem"
                            color="rgba(0, 0, 0, 0.8)"
                            padding="1.6rem 0"
                            data-index={index}
                        >
                            {item.title}
                        </MenuItem>
                    </Link>
                ))}
            </OrderTypeSelection>
            {orders.map(order => (
                <OrderBox width="100%" key={order._id}>
                    <OrderHeader>
                        <Flex style={{ flex: '1', maxWidth: '55%' }}>
                            <FavoriteShop style={{ width: '1.8rem', height: '1.8rem' }} />
                            <div
                                style={{
                                    margin: '0 1rem',
                                    fontSize: '1.4rem',
                                    fontWeight: '600',
                                    maxWidth: '20rem',
                                }}
                            >
                                {order.shop.shopName}
                            </div>
                            <ChatWithShop>
                                <ChatIcon2 width="1.5rem" height="1.5rem" fill="#fff" />
                                Chat
                            </ChatWithShop>
                            <Link
                                to={`/shop/${slugify(order.shop.shopName, {
                                    replacement: '_',
                                    lower: true,
                                })}`}
                            >
                                {' '}
                                <ViewShop>
                                    <ProductIcon style={{ width: '1.8rem', height: '1.8rem' }} />
                                    Xem Shop
                                </ViewShop>
                            </Link>
                        </Flex>
                        <Flex style={{ flex: '1', maxWidth: '45%' }} justifyContent="flex-end">
                            {order.orderInfo.orderStatus === 'delivered' && (
                                <Flex>
                                    <FreeshipIcon style={{ width: '2rem', height: '2rem' }} />
                                    <span
                                        style={{
                                            textDecoration: 'none',
                                            color: ' #26aa99',
                                            verticalAlign: 'middle',
                                            fontSize: '1.75rem',
                                        }}
                                    >
                                        Giao hàng thành công
                                    </span>
                                </Flex>
                            )}
                            <AskIcon style={{ width: '1.8rem', height: '1.8rem' }} stroke="#222" />
                            <div
                                style={{
                                    margin: '0 1rem',
                                    width: '1px',
                                    height: '2.2rem',
                                    backgroundColor: 'rgba(0,0,0,.2)',
                                }}
                            ></div>
                            <div
                                style={{
                                    textDecoration: 'none',
                                    color: ' #ee4d2d',
                                    verticalAlign: 'middle',
                                    fontSize: '1.75rem',
                                    textTransform: 'uppercase',
                                }}
                            >
                                {alternateName(order.orderInfo.orderStatus)}
                            </div>
                        </Flex>
                    </OrderHeader>
                    <OrderDetail order={order} />
                    <OrderFooter>
                        <Flex width="100%" padding="2.4rem 0 1.2rem">
                            <div style={{ flex: '1' }}></div>
                            <div>
                                <Flex className="totalPriceTitle">
                                    <DragonIcon />{' '}
                                    <span style={{ margin: '0 1rem' }}>Tổng số tiền:</span>{' '}
                                    <span className="totalPrice">
                                        {separateNumberWithDot(
                                            order.products.reduce((acc, { product, quantity }) => {
                                                if (product.discountPercent > 0) {
                                                    return (
                                                        acc +
                                                        (product.productTypes.typePrice -
                                                            (product.productTypes.typePrice *
                                                                product.discountPercent) /
                                                                100) *
                                                            quantity
                                                    );
                                                } else {
                                                    return (
                                                        acc +
                                                        product.productTypes.typePrice * quantity
                                                    );
                                                }
                                            }, 0)
                                        )}
                                    </span>
                                </Flex>
                            </div>
                        </Flex>
                        <Flex width="100%">
                            <Flex
                                flexDirection="column"
                                style={{ flex: '1', maxWidth: '50%' }}
                                alignItems="flex-start"
                            >
                                <span
                                    style={{
                                        display: 'block',
                                        fontSize: '1.2rem',
                                        color: 'rgba(0,0,0,.54)',
                                    }}
                                >
                                    Đánh giá sản phẩm trước{' '}
                                </span>
                                <span
                                    style={{
                                        display: 'block',
                                        fontSize: '1.2rem',
                                        color: '#ee4d2d',
                                    }}
                                >
                                    Đánh giá ngay và nhận 200 Xu
                                </span>
                            </Flex>
                            <Flex padding="1.2rem 0 0 0">
                                <OrderFooterButton className="diffBg">Đánh giá</OrderFooterButton>
                                <OrderFooterButton>Liên hệ người bán</OrderFooterButton>
                                <OrderFooterButton>Mua lần nữa</OrderFooterButton>
                            </Flex>
                        </Flex>
                    </OrderFooter>
                </OrderBox>
            ))}
        </PurchaseContainer>
    );
}

export default Purchase;
