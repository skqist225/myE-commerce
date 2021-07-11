import React, { useState, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchSingleShop } from '../../features/shop/shopSlice';
import { createImage } from '../../helpers';
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
import { Slider } from '../../components';
import './viewShop.css';
import { PageBodyContainer, ContentContainer } from '../../globalStyle';

function ViewShop({ match }) {
    const dispatch = useDispatch();
    const { shopName } = match.params;
    const { shop, shopProducts, loading, errorMessage, successMessage } = useSelector(
        state => state.shop
    );

    React.useEffect(() => {
        dispatch(fetchSingleShop(shopName));
    }, [dispatch, shopName]);

    const menuTabLi = document.getElementsByClassName('viewShopMenuItem');

    function handleSelectedTabChange() {
        menuTabLi[0].classList.add('active');

        for (let li of menuTabLi) {
            li.addEventListener('click', function () {
                for (let li of menuTabLi) {
                    li.classList.remove('active');
                }

                this.classList.add('active');
            });
        }
    }

    console.log('View Shop rendering');

    React.useEffect(() => {
        if (!loading) {
            handleSelectedTabChange();
        }
    }, [dispatch, loading, handleSelectedTabChange]);

    return (
        <>
            {loading === true ? (
                <p>Loading</p>
            ) : (
                <PageBodyContainer pt="5rem">
                    <ContentContainer>
                        <div className="viewShopHeaderContainer">
                            <div className="viewShopHeaderLeft">
                                <div className="viewShopLogoAndNameWrapper">
                                    <img
                                        src={createImage(shop.shopLogo, false)}
                                        alt=""
                                        className="viewShopLogo"
                                    />
                                    <img
                                        src={createImage('SM.png')}
                                        alt=""
                                        className="viewShopSM"
                                    />

                                    <div className="viewShopNameWrapper">
                                        <p className="viewShopName">{shop.shopName}</p>
                                        <span className="viewShopActiveTime">
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
                                            <span className="viewShopSpan">
                                                {shopProducts.length}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="viewShopInfo">
                                        <div className="viewShopIconWrapper">
                                            <FollowingIcon className="viewShopIcon" />
                                        </div>
                                        <div>
                                            Đang Theo:{' '}
                                            <span className="viewShopSpan">
                                                {shopProducts.length}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="viewShopInfo">
                                        <div className="viewShopIconWrapper">
                                            <ChatIcon className="viewShopIcon" />
                                        </div>
                                        <div>
                                            Tỉ Lệ Phản Hồi Chat:{' '}
                                            <span className="viewShopSpan">
                                                100% (Trong Vài Giờ)
                                            </span>
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
                                            <span className="viewShopSpan">
                                                {shopProducts.length}
                                            </span>
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
                                            <span className="viewShopSpan">
                                                100% (Trong Vài Giờ)
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <section className="viewShopMenuSection">
                            <div className="viewShopMenuContainer">
                                <ul className="viewShopMenuList">
                                    <Link>
                                        <li className="viewShopMenuItem" data-index={0}>
                                            Dạo
                                        </li>
                                    </Link>
                                    <Link to={`/shop/${shop._id}/search`}>
                                        <li className="viewShopMenuItem" data-index={1}>
                                            TẤT CẢ SẢN PHẨM
                                        </li>
                                    </Link>
                                    <Link>
                                        <li className="viewShopMenuItem" data-index={2}>
                                            Sản phẩm bán chạy
                                        </li>
                                    </Link>
                                    <Link>
                                        <li className="viewShopMenuItem" data-index={3}>
                                            Sản phẩm mới
                                        </li>
                                    </Link>
                                    <Link>
                                        <li className="viewShopMenuItem" data-index={4}>
                                            iPhone
                                        </li>
                                    </Link>
                                    <Link>
                                        <li className="viewShopMenuItem" data-index={5}>
                                            iPad
                                        </li>
                                    </Link>
                                    <li>Thêm</li>
                                </ul>
                            </div>
                        </section>
                        <section className="viewShopHomeImages">
                            <div>
                                <div>
                                    <img
                                        src={createImage(shop.homeImages[0], false)}
                                        alt=""
                                        className="viewShopImage"
                                    />
                                    <p></p>
                                </div>
                                <div>
                                    <Slider dataSlider={shop.homeImages} withoutSubPath={false} />
                                </div>
                                <div>
                                    <img src="" alt="" />
                                </div>
                            </div>
                        </section>
                    </ContentContainer>
                </PageBodyContainer>
            )}
        </>
    );
}

export default memo(ViewShop);
