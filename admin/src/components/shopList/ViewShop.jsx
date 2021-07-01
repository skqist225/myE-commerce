import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSingleShop } from '../../features/shop/shopSlice';
import { createImage } from '../../helper';
import {
    ProductIcon,
    FollowerIcon,
    FollowingIcon,
    JoinIcon,
    StarIcon,
    ChatIcon,
    AddIcon,
    ChatIcon2,
} from './svgIcon';
import './viewShop.css';

function ViewShop({ match }) {
    const dispatch = useDispatch();
    const { shopName } = match.params;
    const { shop, shopProducts, loading, errorMessage, successMessage } = useSelector(
        state => state.shop
    );

    React.useEffect(() => {
        dispatch(fetchSingleShop(shopName));
    }, [dispatch]);

    return (
        <>
            {loading === true ? (
                <p>Loading</p>
            ) : (
                <div className="viewShop">
                    <div className="viewShopHeaderContainer">
                        <div className="viewShopHeaderLeft">
                            <div className="viewShopLogoAndNameWrapper">
                                <img
                                    src={createImage(shop.shopLogo, false)}
                                    alt=""
                                    className="viewShopLogo"
                                />

                                <div className="viewShopNameWrapper">
                                    <p className="viewShopName">{shop.shopName}</p>
                                    <span style={{ display: 'block', margin: '7px 0' }}>
                                        Last active time: 4 giờ trước
                                    </span>
                                </div>
                            </div>
                            <div className="viewShopButtonContainer">
                                <div className="viewShopBtnWrapper">
                                    <button className="viewShopHeaderButton">
                                        <span>
                                            <AddIcon className="viewShopBtnIcon" />
                                        </span>
                                        Theo dõi
                                    </button>
                                </div>
                                <div className="viewShopBtnWrapper">
                                    <button className="viewShopHeaderButton">
                                        <span>
                                            <ChatIcon2 className="viewShopBtnIcon" />
                                        </span>
                                        Chat
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="viewShopHeaderRight">
                            <div className="viewShopInfoContainer">
                                <div className="viewShopInfo">
                                    <div className="viewShopIconWrapper">
                                        <ProductIcon className="viewShopIcon" />
                                    </div>
                                    <div>
                                        Sản Phẩm:{' '}
                                        <span className="viewShopSpan">{shopProducts.length}</span>
                                    </div>
                                </div>
                                <div className="viewShopInfo">
                                    <div className="viewShopIconWrapper">
                                        <FollowingIcon className="viewShopIcon" />
                                    </div>
                                    <div>
                                        Đang Theo:{' '}
                                        <span className="viewShopSpan">{shopProducts.length}</span>
                                    </div>
                                </div>
                                <div className="viewShopInfo">
                                    <div className="viewShopIconWrapper">
                                        <ChatIcon className="viewShopIcon" />
                                    </div>
                                    <div>
                                        Tỉ Lệ Phản Hồi Chat:{' '}
                                        <span className="viewShopSpan">100% (Trong Vài Giờ)</span>
                                    </div>
                                </div>
                            </div>
                            <div className="viewShopInfoContainer">
                                <div className="viewShopInfo">
                                    <div className="viewShopIconWrapper">
                                        <FollowerIcon className="viewShopIcon" />
                                    </div>
                                    <div>
                                        Người Theo Dõi:{' '}
                                        <span className="viewShopSpan">{shopProducts.length}</span>
                                    </div>
                                </div>
                                <div className="viewShopInfo">
                                    <div className="viewShopIconWrapper">
                                        <StarIcon className="viewShopIcon" />
                                    </div>
                                    <div>
                                        Đánh Giá: <span className="viewShopSpan">4.9</span>
                                    </div>
                                </div>
                                <div className="viewShopInfo">
                                    <div className="viewShopIconWrapper">
                                        <JoinIcon className="viewShopIcon" />
                                    </div>
                                    <div>
                                        Tham Gia:{' '}
                                        <span className="viewShopSpan">100% (Trong Vài Giờ)</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default ViewShop;
