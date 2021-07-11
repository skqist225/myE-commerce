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
import { ViewShopButton, ViewShopLogo, ViewShopMallLogo } from './ShopProductsComponent';
import { PageBodyContainer, ContentContainer, MenuList, MenuItem, Image } from '../../globalStyle';

function ViewShop({ match }) {
    const { shopName } = match.params;
    const dispatch = useDispatch();
    const { shop, shopProducts, loading, errorMessage, successMessage } = useSelector(
        state => state.shop
    );

    React.useEffect(() => {
        dispatch(fetchSingleShop(shopName));
    }, [dispatch, shopName]);

    let itemList = [
        {
            path: `${match.url}`,
            title: 'Dạo',
        },
        { path: `/shop/${shop._id}/search`, title: 'Tất cả sản phẩm' },
        {
            path: `/shop/${shop._id}/search?shopCollection=ipad`,
            title: 'Sản phẩm bán chạy',
        },
        {
            path: `/shop/${shop._id}/search?shopCollection=ipad`,
            title: 'Sản phẩm mới',
        },
        { path: `/shop/${shop._id}/search?shopCollection=ipad`, title: 'iPhone' },
        { path: `/shop/${shop._id}/search?shopCollection=ipad`, title: 'iPad' },
        { path: `/shop/${shop._id}/search??shopCollection=ipad`, title: 'Thêm' },
    ];

    function initalizeLogicForComponent() {
        const menuTabLi = document.getElementsByClassName('viewShopMenuItem');
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

    console.log('View Shop rendering...');

    React.useEffect(() => {
        if (!loading && shop) {
            initalizeLogicForComponent();
        }
    }, [loading]);

    return (
        <>
            {loading && <p>Loading</p>}
            {!loading && shop && (
                <PageBodyContainer pt="5rem">
                    <ContentContainer>
                        <div className="viewShopHeaderContainer">
                            <div className="viewShopHeaderLeft">
                                <div className="viewShopLogoAndNameWrapper">
                                    <ViewShopLogo src={createImage(shop.shopLogo, false)} alt="" />
                                    <ViewShopMallLogo
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
                                        <ViewShopButton className="viewShopHeaderButton">
                                            <span>
                                                <AddIcon className="viewShopBtnIcon" />
                                            </span>
                                            Theo dõi
                                        </ViewShopButton>
                                    </div>
                                    <div className="viewShopBtnWrapper">
                                        <ViewShopButton className="viewShopHeaderButton">
                                            <span>
                                                <ChatIcon2 className="viewShopBtnIcon" />
                                            </span>
                                            Chat
                                        </ViewShopButton>
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
                                <MenuList className="viewShopMenuList">
                                    {itemList.map((item, index) => (
                                        <Link to={item.path} key={item.title}>
                                            <MenuItem
                                                width="calc(1200px /7)"
                                                fontSize="1.9rem"
                                                color="rgba(0, 0, 0, 0.8)"
                                                padding="1.4rem 1rem"
                                                className="viewShopMenuItem"
                                                data-index={index}
                                            >
                                                {item.title}
                                            </MenuItem>
                                        </Link>
                                    ))}
                                </MenuList>
                            </div>
                        </section>
                        <section className="viewShopHomeImages">
                            <div>
                                <div>
                                    <img
                                        src={createImage(shop.homeImages[0], false)}
                                        alt={shop.homeImages[0] || 'no image'}
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
