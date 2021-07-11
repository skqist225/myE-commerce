import React, { Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { BackIcon } from './svgIcon';
import { createImage } from '../../helpers';
import { fetchShopById, setSelectedTab } from '../../features/shop/shopSlice';
import slugify from 'slugify';
import {
    ArrowLeft,
    ArrowRight,
    DropDownIcon,
    SelectedDropDownIcon,
    StarEmptyBodyIcon,
} from './svgIcon';
import ProductCard from './ProductCard';
import { transportersSelector } from '../../features/transporters';
import { PageBodyContainer, ContentContainer, Anchor, GridLayout, Flex } from '../../globalStyle';
import { BackToHomeContainer, FilterButton, ShopProductsFilter } from './ShopProductsComponent';
import './shopProducts.css';

function ShopProducts({ match }) {
    const { shopId } = match.params;
    const dispatch = useDispatch();
    const { shop, successMessage, errorMessage, shopProducts, loading, selectedTab } = useSelector(
        state => state.shop
    );
    const transporters = useSelector(transportersSelector.selectAll);

    const handleSelectedOption = () => {
        const filterOptions = document.getElementsByClassName('shopProductsSortOption');
        const selectedSortByPriceOption = document.getElementsByClassName(
            'shopProductsDropDownIcon'
        );
        const wrapperForDropDownClick = document.getElementsByClassName(
            'shopProductsFilterOptionDropDown'
        );
        const spanDisplay = document.getElementById('shopProductsDisplaySelectedPriceFilterOption');

        filterOptions[0].classList.add('shopProductsSelectedOption');
        for (let option of wrapperForDropDownClick) {
            option.addEventListener('click', function () {
                for (let option of selectedSortByPriceOption) {
                    option.classList.remove('active');
                }
                for (let option of wrapperForDropDownClick) {
                    option.classList.remove('active');
                }
                this.childNodes[1].childNodes[0].classList.add('active');
                spanDisplay.innerText = this.childNodes[0].textContent;
                spanDisplay.style.color = '#d0011b';
            });
        }
        for (let option of filterOptions) {
            option.addEventListener('click', function () {
                for (let option of filterOptions) {
                    option.classList.remove('shopProductsSelectedOption');
                }
                this.classList.add('shopProductsSelectedOption');
            });
        }
    };

    const handleSelectedTab = () => {
        const itemsFilter = document.getElementsByClassName('shopProductsItemFilter');
        itemsFilter[0].classList.add('selectedTab');
        for (let option of itemsFilter) {
            option.addEventListener('click', function () {
                for (let option of itemsFilter) {
                    option.classList.remove('selectedTab');
                }

                this.classList.add('selectedTab');
                dispatch(setSelectedTab(Math.abs(this.dataset.index)));
            });
        }
    };

    const serviceAndPromotion = [
        'Freeship Xtra',
        'Hoàn xu Xtra',
        'Đang giảm giá',
        'Miễn phí vận chuyển',
        'Gì Cũng Rẻ',
        'Hàng có sẵn',
        'Mua giá bán buôn/ bán sỉ',
    ];

    console.log('Shop products rendering...');

    React.useEffect(() => {
        dispatch(fetchShopById(shopId));
    }, [dispatch, shopId]);

    React.useEffect(() => {
        if (!loading) {
            handleSelectedOption();
            handleSelectedTab();
        }
    }, [loading]);

    return (
        <>
            {!loading && successMessage && (
                <PageBodyContainer pt="2.5rem">
                    <ContentContainer>
                        <div className="shopProductsContainer ">
                            <Anchor
                                to={`/shop/${slugify(shop.shopName, {
                                    replacement: '_',
                                    lower: true,
                                })}`}
                            >
                                <BackToHomeContainer>
                                    <BackIcon className="shopProductsIcon" />
                                    Trở lại trang của shop
                                </BackToHomeContainer>
                            </Anchor>

                            <Flex alignItems="flex-start">
                                <div className="shopProductsLeft">
                                    <div className="shopProductsInfoContainer">
                                        <div
                                            className="shopProductsShopLogoBg"
                                            style={{
                                                backgroundImage: `url(${createImage(
                                                    shop.shopLogo,
                                                    false
                                                )})`,
                                            }}
                                        ></div>
                                        <div className="shopProductsMask"></div>

                                        <img
                                            src={createImage(shop.shopLogo, false)}
                                            alt="image"
                                            className="shopProductsShopLogo"
                                        />
                                        <img
                                            src={createImage('SM.png')}
                                            alt=""
                                            className="shopProductsSM"
                                        />
                                        <div className="shopProductsShopName">{shop.shopName}</div>
                                        <span className="shopProductsActiveTime">Active time</span>
                                    </div>
                                    <div className="shopProductsMenuFilterBar">
                                        <div className="shopProductsShopCategories">
                                            <div className="shopProductsFilterTitle">
                                                DANH MỤC SHOP
                                            </div>
                                            <ul className="shopProductsListFilter">
                                                <li
                                                    className="shopProductsItemFilter"
                                                    data-index={1}
                                                >
                                                    Sản phẩm
                                                </li>
                                                <li
                                                    className="shopProductsItemFilter"
                                                    data-index={2}
                                                >
                                                    Sản phẩm bán chạy
                                                </li>
                                                <li
                                                    className="shopProductsItemFilter"
                                                    data-index={3}
                                                >
                                                    Sản phẩm mới{' '}
                                                </li>
                                                <li
                                                    className="shopProductsItemFilter"
                                                    data-index={4}
                                                >
                                                    iPhone
                                                </li>
                                                <li
                                                    className="shopProductsItemFilter"
                                                    data-index={5}
                                                >
                                                    iPad
                                                </li>
                                                <li
                                                    className="shopProductsItemFilter"
                                                    data-index={6}
                                                >
                                                    Apple Watch
                                                </li>
                                                <li
                                                    className="shopProductsItemFilter"
                                                    data-index={7}
                                                >
                                                    MacBook
                                                </li>
                                                <li
                                                    className="shopProductsItemFilter"
                                                    data-index={8}
                                                >
                                                    Phụ kiện Apple
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="shopProductsShopCategories">
                                            <div className="shopProductsFilterTitle">
                                                THEO DANH MỤC
                                            </div>
                                            <div className="shopProductsCategoryFilter">
                                                {shopProducts.map(({ category }) => (
                                                    <div
                                                        key={category._id}
                                                        className="shopProductsCategoryItem"
                                                    >
                                                        <div className="shopProductsInputWrapper">
                                                            <input
                                                                type="checkbox"
                                                                name="category"
                                                                value={category._id}
                                                            />
                                                        </div>
                                                        <div className="shopProductsLabelWrapper">
                                                            <label>{category.categoryName}</label>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="shopProductsShopCategories">
                                            <div className="shopProductsFilterTitle">NƠI BÁN</div>
                                            <div>
                                                <div className="shopProductsCategoryItem">
                                                    <div className="shopProductsInputWrapper">
                                                        <input
                                                            type="checkbox"
                                                            name="transporters"
                                                            // value={service}
                                                        />
                                                    </div>
                                                    <div className="shopProductsLabelWrapper">
                                                        <label>TP.Hồ Chí Minh</label>
                                                    </div>
                                                </div>
                                                <div className="shopProductsCategoryItem">
                                                    <div className="shopProductsInputWrapper">
                                                        <input
                                                            type="checkbox"
                                                            name="transporters"
                                                            // value={service}
                                                        />
                                                    </div>
                                                    <div className="shopProductsLabelWrapper">
                                                        <label>Hà Nội</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="shopProductsShopCategories">
                                            <div className="shopProductsFilterTitle">
                                                ĐƠN VỊ VẬN CHUYỂN
                                            </div>
                                            {transporters.map(transporter => (
                                                <div
                                                    key={transporter._id}
                                                    className="shopProductsCategoryItem"
                                                >
                                                    <div className="shopProductsInputWrapper">
                                                        <input
                                                            type="checkbox"
                                                            name="transporters"
                                                            value={transporter._id}
                                                        />
                                                    </div>
                                                    <div className="shopProductsLabelWrapper">
                                                        <label>{transporter.transporterName}</label>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="shopProductsShopCategories">
                                            <div className="shopProductsFilterTitle">
                                                KHOẢNG GIÁ
                                            </div>
                                            <div className="shopProductsPriceFilterWrapper">
                                                <div className="shopProductsPriceFilterContainer">
                                                    <input
                                                        type="text"
                                                        className="shopProductsPriceRange"
                                                        placeholder="đ TỪ"
                                                    />
                                                </div>
                                                <div>-</div>
                                                <div className="shopProductsPriceFilterContainer">
                                                    <input
                                                        type="text"
                                                        className="shopProductsPriceRange"
                                                        placeholder="đ ĐẾN"
                                                    />
                                                </div>
                                            </div>{' '}
                                            <div>
                                                <FilterButton>ÁP DỤNG</FilterButton>
                                            </div>
                                        </div>
                                        <div className="shopProductsShopCategories">
                                            <div className="shopProductsFilterTitle">
                                                TÌNH TRẠNG
                                            </div>
                                            <div>
                                                <div className="shopProductsCategoryItem">
                                                    <div className="shopProductsInputWrapper">
                                                        <input
                                                            type="checkbox"
                                                            name="transporters"
                                                            // value={service}
                                                        />
                                                    </div>
                                                    <div className="shopProductsLabelWrapper">
                                                        <label>Mới</label>
                                                    </div>
                                                </div>
                                                <div className="shopProductsCategoryItem">
                                                    <div className="shopProductsInputWrapper">
                                                        <input
                                                            type="checkbox"
                                                            name="transporters"
                                                            // value={service}
                                                        />
                                                    </div>
                                                    <div className="shopProductsLabelWrapper">
                                                        <label>Đã sử dụng</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="shopProductsShopCategories">
                                            <div className="shopProductsFilterTitle">
                                                LỰA CHỌN THANH TOÁN
                                            </div>
                                            <div>
                                                <div className="shopProductsCategoryItem">
                                                    <div className="shopProductsInputWrapper">
                                                        <input
                                                            type="checkbox"
                                                            name="transporters"
                                                            // value={service}
                                                        />
                                                    </div>
                                                    <div className="shopProductsLabelWrapper">
                                                        <label>0% TRẢ GÓP</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="shopProductsShopCategories">
                                            <div className="shopProductsFilterTitle">ĐÁNH GIÁ</div>
                                            <div>
                                                {[5, 4, 3, 2, 1].map(value => {
                                                    return (
                                                        <div
                                                            data-value={`ratingFilter=${value}`}
                                                            key={`ratingFilter=${value}`}
                                                            className="shopProductsRatingFilter"
                                                        >
                                                            {Array.from({ length: value }).map(
                                                                (_, index) => {
                                                                    return (
                                                                        <span
                                                                            className="fa fa-star checked"
                                                                            key={index}
                                                                        ></span>
                                                                    );
                                                                }
                                                            )}
                                                            {Array.from({
                                                                length: 5 - value,
                                                            }).map((_, index) => {
                                                                return (
                                                                    <StarEmptyBodyIcon
                                                                        className="unchecked"
                                                                        key={index + 5}
                                                                    />
                                                                );
                                                            })}
                                                            {/* trở lên */}
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                        <div className="shopProductsShopCategories">
                                            <div className="shopProductsFilterTitle">
                                                DỊCH VỤ & KHUYẾN MÃI
                                            </div>
                                            <div>
                                                {serviceAndPromotion.map((service, index) => (
                                                    <div
                                                        key={index + `${service}`}
                                                        className="shopProductsCategoryItem"
                                                    >
                                                        <div className="shopProductsInputWrapper">
                                                            <input
                                                                type="checkbox"
                                                                name="transporters"
                                                                value={service}
                                                            />
                                                        </div>
                                                        <div className="shopProductsLabelWrapper">
                                                            <label>{service}</label>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <div>
                                            <FilterButton>Xóa Tất Cả</FilterButton>
                                        </div>
                                    </div>
                                </div>
                                <div className="shopProductsRight">
                                    <div className="shopProductsFilterBar">
                                        <div
                                            className="shopProductsOptionTitle "
                                            style={{ width: '11rem' }}
                                        >
                                            Sắp xếp theo
                                        </div>
                                        <Flex justifyContent="space-between" width="89%">
                                            <Flex>
                                                <ShopProductsFilter>Phổ biến</ShopProductsFilter>
                                                <ShopProductsFilter>Mới nhất</ShopProductsFilter>
                                                <ShopProductsFilter>Bán chạy</ShopProductsFilter>
                                                <div className="shopProductsDropDownOption">
                                                    <span
                                                        style={{
                                                            fontSize: '18px',
                                                            fontWeight: '400',
                                                            margin: '0 4px',
                                                        }}
                                                        id="shopProductsDisplaySelectedPriceFilterOption"
                                                    >
                                                        Giá
                                                    </span>
                                                    <span>
                                                        <DropDownIcon className="shopProductsDropDowniCcon" />
                                                    </span>
                                                    <div className="shopProductsFilterOptionDropDownModal">
                                                        <div className="shopProductsFilterOptionDropDown">
                                                            <span
                                                                data-value="order=asc&sortBy=price"
                                                                style={{
                                                                    fontSize: '18px',
                                                                    fontWeight: '400',
                                                                }}
                                                            >
                                                                Giá: Thấp đến Cao
                                                            </span>
                                                            <span>
                                                                <SelectedDropDownIcon className="shopProductsDropDownIcon" />
                                                            </span>
                                                        </div>
                                                        <div className="shopProductsFilterOptionDropDown">
                                                            <span
                                                                data-value="order=desc&sortBy=price"
                                                                style={{
                                                                    fontSize: '18px',
                                                                    fontWeight: '400',
                                                                }}
                                                            >
                                                                Giá: Cao đến Thấp
                                                            </span>
                                                            <span>
                                                                <SelectedDropDownIcon className="shopProductsDropDownIcon" />
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Flex>
                                            <Flex>
                                                <div className="shopProductsPageDisplay">
                                                    <span>1</span>/1
                                                </div>
                                                <div className="shopProductsPaging">
                                                    <ArrowLeft className="shopProductsSvgIcon" />
                                                </div>
                                                <div className="shopProductsPaging">
                                                    <ArrowRight className="shopProductsSvgIcon" />
                                                </div>
                                            </Flex>
                                        </Flex>
                                    </div>
                                    <GridLayout templateColumns="repeat(5, 1fr)" padding="1.5rem 0">
                                        {selectedTab === 1 &&
                                            shopProducts.map(product => (
                                                <Link
                                                    key={product._id}
                                                    to={`/product/${product._id}`}
                                                >
                                                    <ProductCard product={product} />
                                                </Link>
                                            ))}
                                    </GridLayout>
                                </div>
                            </Flex>
                        </div>
                    </ContentContainer>
                </PageBodyContainer>
            )}
        </>
    );
}

export default ShopProducts;
