import React, { Fragment, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { BackIcon } from './svgIcon';
import { createImage } from '../../helpers';
import { fetchShopById, setSelectedTab, getProductsByFilter } from '../../features/shop/shopSlice';
import slugify from 'slugify';
import {
    ArrowLeft,
    ArrowRight,
    DropDownIcon,
    SelectedDropDownIcon,
    StarEmptyBodyIcon,
} from './svgIcon';
import ProductCard from './ProductCard';
import { fetchTransporters, transportersSelector } from '../../features/transporters';
import { PageBodyContainer, ContentContainer, Anchor, Flex } from '../../globalStyle';
import {
    BackToHomeContainer,
    FilterButton,
    ShopProductsFilter,
    ShopName,
    ShopLogo,
    ShopeeMallLogo,
    ListItem,
    FilterTitle,
    FlexWithPadding,
    InputWrapper,
    CheckboxInput,
    LabelWrapper,
    Label,
    TextField,
    TFWrapper,
    GridLayoutExtend,
    FilterLabel,
    SortByPrice,
    SortByPriceModal,
    SortTitle,
    ModalTitle,
} from './ShopProductsComponent';
import './shopProducts.css';

function ShopProducts({ match }) {
    const { shopId } = match.params;
    const dispatch = useDispatch();
    const [transportersFilter, setTransportersFilter] = useState(new Set());
    const [categoriesFilter, setCategoriesFilter] = useState(new Set());
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');

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

    let itemList = [
        {
            title: 'Sản phẩm',
            value: '',
        },
        { title: 'Sản phẩm bán chạy', value: '' },
        ,
        {
            title: 'Sản phẩm mới',
            value: '',
        },
        { title: 'iPhone', value: '' },
        { title: 'iPad', value: '' },
        { title: 'Apple Watch', value: '' },
        { title: 'Macbook', value: '' },
        { title: 'Phụ kiện Apple', value: '' },
    ];

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

    function setFilter(value, key, initialState) {
        let prevStateSet = initialState;
        let newStateSet;

        if (prevStateSet.has(value)) {
            prevStateSet.delete(value);
            newStateSet = new Set([...prevStateSet]);
        } else if (value !== true && !prevStateSet.has(value)) {
            newStateSet = new Set([...prevStateSet, value]);
        }

        switch (key) {
            case 'transportersFilter': {
                console.log(key, value, initialState);

                setTransportersFilter(newStateSet);
            }
            case 'categoriesFilter': {
                setCategoriesFilter(newStateSet);
            }
        }
    }

    const handleCheckedTransporters = e => {
        setFilter(e.target.value, 'transportersFilter', transportersFilter);
    };

    const handleCheckedCategories = e => {
        setFilter(e.target.value, 'categoriesFilter', categoriesFilter);
    };

    const handlePriceFilter = e => {
        e.preventDefault();

        dispatch(
            getProductsByFilter({
                shopId,
                transportersFilter,
                categoriesFilter,
                minPrice,
                maxPrice,
            })
        );
    };

    useEffect(() => {
        dispatch(fetchShopById(shopId));
    }, [dispatch, shopId]);

    useEffect(() => {
        dispatch(getProductsByFilter({ shopId, transportersFilter, categoriesFilter }));
    }, [shopId, transportersFilter, categoriesFilter]);

    useEffect(() => {
        dispatch(fetchTransporters());
    }, []);

    useEffect(() => {
        if (!loading && shop) {
            handleSelectedOption();
            handleSelectedTab();
        }
    }, [loading, shop]);

    return (
        <>
            {!loading && shop && (
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

                                        <ShopLogo
                                            src={createImage(shop.shopLogo, false)}
                                            alt="ShopLoo"
                                        />
                                        <ShopeeMallLogo
                                            src={createImage('SM.png')}
                                            alt="ShopeeMall logo"
                                        />
                                        <ShopName>{shop.shopName}</ShopName>
                                        <span className="shopProductsActiveTime">Active time</span>
                                    </div>
                                    <div className="shopProductsMenuFilterBar">
                                        <div className="shopProductsShopCategories">
                                            <FilterTitle>DANH MỤC SHOP</FilterTitle>
                                            <ul style={{ listStyle: 'none' }}>
                                                {itemList.map((item, index) => (
                                                    <ListItem
                                                        data-index={index + 1}
                                                        key={item.title}
                                                    >
                                                        {item.title}
                                                    </ListItem>
                                                ))}
                                            </ul>
                                        </div>
                                        <div>
                                            <FilterTitle className="shopProductsFilterTitle">
                                                THEO DANH MỤC
                                            </FilterTitle>
                                            <Flex flexDirection="column" alignItems="flex-start">
                                                {shopProducts.map(({ category }) => (
                                                    <FlexWithPadding
                                                        key={category._id}
                                                        alignItems="flex-start"
                                                    >
                                                        <InputWrapper>
                                                            <CheckboxInput
                                                                value={category._id}
                                                                onChange={handleCheckedCategories}
                                                            />
                                                        </InputWrapper>
                                                        <LabelWrapper>
                                                            <Label>{category.categoryName}</Label>
                                                        </LabelWrapper>
                                                    </FlexWithPadding>
                                                ))}
                                            </Flex>
                                        </div>
                                        <div>
                                            <FilterTitle className="shopProductsFilterTitle">
                                                NƠI BÁN
                                            </FilterTitle>
                                            <div>
                                                <FlexWithPadding className="shopProductsCategoryItem">
                                                    <InputWrapper className="shopProductsInputWrapper">
                                                        <CheckboxInput

                                                        // value={service}
                                                        />
                                                    </InputWrapper>
                                                    <LabelWrapper className="shopProductsLabelWrapper">
                                                        <Label>TP.Hồ Chí Minh</Label>
                                                    </LabelWrapper>
                                                </FlexWithPadding>
                                                <FlexWithPadding className="shopProductsCategoryItem">
                                                    <InputWrapper>
                                                        <CheckboxInput

                                                        // value={service}
                                                        />
                                                    </InputWrapper>
                                                    <LabelWrapper className="shopProductsLabelWrapper">
                                                        <Label>Hà Nội</Label>
                                                    </LabelWrapper>
                                                </FlexWithPadding>
                                            </div>
                                        </div>
                                        <div className="shopProductsShopCategories">
                                            <FilterTitle className="shopProductsFilterTitle">
                                                ĐƠN VỊ VẬN CHUYỂN
                                            </FilterTitle>
                                            {transporters.map(transporter => (
                                                <FlexWithPadding
                                                    key={transporter._id}
                                                    className="shopProductsCategoryItem"
                                                >
                                                    <InputWrapper>
                                                        <CheckboxInput
                                                            name="transporters"
                                                            onChange={handleCheckedTransporters}
                                                            value={transporter._id}
                                                        />
                                                    </InputWrapper>
                                                    <LabelWrapper>
                                                        <Label>{transporter.transporterName}</Label>
                                                    </LabelWrapper>
                                                </FlexWithPadding>
                                            ))}
                                        </div>

                                        <div className="shopProductsShopCategories">
                                            <form action="" onSubmit={handlePriceFilter}>
                                                <FilterTitle className="shopProductsFilterTitle">
                                                    KHOẢNG GIÁ
                                                </FilterTitle>
                                                <Flex justifyContent="space-between">
                                                    <TFWrapper className="shopProductsPriceFilterContainer">
                                                        <TextField
                                                            onChange={e =>
                                                                setMinPrice(e.target.value)
                                                            }
                                                            value={minPrice}
                                                            placeholder="đ TỪ"
                                                        />
                                                    </TFWrapper>
                                                    <div>-</div>
                                                    <TFWrapper className="shopProductsPriceFilterContainer">
                                                        <TextField
                                                            onChange={e =>
                                                                setMaxPrice(e.target.value)
                                                            }
                                                            value={maxPrice}
                                                            placeholder="đ ĐẾN"
                                                        />
                                                    </TFWrapper>
                                                </Flex>
                                                <FilterButton type="submit">ÁP DỤNG</FilterButton>
                                            </form>
                                        </div>
                                        <div className="shopProductsShopCategories">
                                            <FilterTitle className="shopProductsFilterTitle">
                                                TÌNH TRẠNG
                                            </FilterTitle>
                                            <div>
                                                {[
                                                    {
                                                        title: 'Mới',
                                                        value: '',
                                                    },
                                                    {
                                                        title: 'Đã sử dụng',
                                                        value: '',
                                                    },
                                                ].map((item, index) => (
                                                    <FlexWithPadding key={item + index}>
                                                        <InputWrapper>
                                                            <CheckboxInput value={item.value} />
                                                        </InputWrapper>
                                                        <LabelWrapper>
                                                            <Label>{item.title}</Label>
                                                        </LabelWrapper>
                                                    </FlexWithPadding>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="shopProductsShopCategories">
                                            <FilterTitle className="shopProductsFilterTitle">
                                                LỰA CHỌN THANH TOÁN
                                            </FilterTitle>
                                            <div>
                                                <FlexWithPadding>
                                                    <InputWrapper>
                                                        <CheckboxInput

                                                        // value={service}
                                                        />
                                                    </InputWrapper>
                                                    <LabelWrapper>
                                                        <Label>0% TRẢ GÓP</Label>
                                                    </LabelWrapper>
                                                </FlexWithPadding>
                                            </div>
                                        </div>
                                        <div className="shopProductsShopCategories">
                                            <FilterTitle className="shopProductsFilterTitle">
                                                ĐÁNH GIÁ
                                            </FilterTitle>
                                            <div>
                                                {[5, 4, 3, 2, 1].map(value => {
                                                    return (
                                                        <Flex
                                                            style={{ margin: '1.25rem 0 ' }}
                                                            data-value={`ratingFilter=${value}`}
                                                            key={`ratingFilter=${value}`}
                                                        >
                                                            {Array.from({ length: value }).map(
                                                                (_, index) => {
                                                                    return (
                                                                        <span
                                                                            className="fa fa-star checked"
                                                                            key={index}
                                                                            style={{
                                                                                fontSize: '1.8rem',
                                                                                marginRight: '1rem',
                                                                            }}
                                                                        ></span>
                                                                    );
                                                                }
                                                            )}
                                                            {Array.from({
                                                                length: 5 - value,
                                                            }).map((_, index) => {
                                                                return (
                                                                    // <StarEmptyBodyIcon
                                                                    //     className="unchecked"
                                                                    //     key={index + 5}
                                                                    //     style={{
                                                                    //         fontSize: '1.8rem',
                                                                    //         marginRight: '1rem',
                                                                    //     }}
                                                                    // />
                                                                    <span
                                                                        className="fa fa-star"
                                                                        key={index}
                                                                        style={{
                                                                            fontSize: '1.8rem',
                                                                            marginRight: '0.7rem',
                                                                            display: 'inline-flex',
                                                                            justifyContent:
                                                                                'center',
                                                                            alignItems: 'center',
                                                                        }}
                                                                    ></span>
                                                                );
                                                            })}
                                                            {/* trở lên */}
                                                        </Flex>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                        <div className="shopProductsShopCategories">
                                            <FilterTitle className="shopProductsFilterTitle">
                                                DỊCH VỤ & KHUYẾN MÃI
                                            </FilterTitle>
                                            <Flex flexDirection="column" alignItems="flex-start">
                                                {serviceAndPromotion.map((service, index) => (
                                                    <FlexWithPadding key={index + `${service}`}>
                                                        <InputWrapper>
                                                            <CheckboxInput value={service} />
                                                        </InputWrapper>
                                                        <LabelWrapper>
                                                            <Label>{service}</Label>
                                                        </LabelWrapper>
                                                    </FlexWithPadding>
                                                ))}
                                            </Flex>
                                        </div>
                                        <div>
                                            <FilterButton>Xóa Tất Cả</FilterButton>
                                        </div>
                                    </div>
                                </div>
                                <div className="shopProductsRight">
                                    <div className="shopProductsFilterBar">
                                        <FilterLabel
                                            className="shopProductsOptionTitle "
                                            style={{ width: '11rem' }}
                                        >
                                            Sắp xếp theo
                                        </FilterLabel>
                                        <Flex justifyContent="space-between" width="89%">
                                            <Flex>
                                                <ShopProductsFilter>Phổ biến</ShopProductsFilter>
                                                <ShopProductsFilter>Mới nhất</ShopProductsFilter>
                                                <ShopProductsFilter>Bán chạy</ShopProductsFilter>
                                                <SortByPrice className="shopProductsDropDownOption">
                                                    <SortTitle id="shopProductsDisplaySelectedPriceFilterOption">
                                                        Giá
                                                    </SortTitle>
                                                    <span>
                                                        <DropDownIcon className="shopProductsDropDowniCcon" />
                                                    </span>
                                                    <SortByPriceModal>
                                                        <div className="shopProductsFilterOptionDropDown">
                                                            <ModalTitle data-value="order=asc&sortBy=price">
                                                                Giá: Thấp đến Cao
                                                            </ModalTitle>
                                                            <span>
                                                                <SelectedDropDownIcon className="shopProductsDropDownIcon" />
                                                            </span>
                                                        </div>
                                                        <div className="shopProductsFilterOptionDropDown">
                                                            <ModalTitle data-value="order=desc&sortBy=price">
                                                                Giá: Cao đến Thấp
                                                            </ModalTitle>
                                                            <span>
                                                                <SelectedDropDownIcon className="shopProductsDropDownIcon" />
                                                            </span>
                                                        </div>
                                                    </SortByPriceModal>
                                                </SortByPrice>
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
                                    <GridLayoutExtend
                                        templateColumns="repeat(4, 1fr)"
                                        padding="1rem 0"
                                    >
                                        {selectedTab === 1 &&
                                            shopProducts.map(product => (
                                                <Link
                                                    key={product._id}
                                                    to={`/product/${product._id}`}
                                                >
                                                    <ProductCard product={product} />
                                                </Link>
                                            ))}
                                    </GridLayoutExtend>
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
