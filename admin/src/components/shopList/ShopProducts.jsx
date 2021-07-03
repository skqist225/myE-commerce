import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { BackIcon } from './svgIcon';
import { createImage } from '../../helper';
import { fetchShopById } from '../../features/shop/shopSlice';
import slugify from 'slugify';
import { ArrowLeft, ArrowRight, DropDownIcon, SelectedDropDownIcon } from './svgIcon';
import ProductCard from './ProductCard';
import './shopProducts.css';

function ShopProducts({ match }) {
    const { shopId } = match.params;
    const dispatch = useDispatch();
    const { shop, successMessage, errorMessage, shopProducts, loading } = useSelector(
        state => state.shop
    );

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
                console.log(this.childNodes[0]);

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

    console.log('rendering');

    React.useEffect(() => {
        dispatch(fetchShopById(shopId));
    }, [dispatch]);

    React.useEffect(() => {
        if (!loading) {
            handleSelectedOption();
        }
    }, [loading]);

    return (
        <>
            {!loading && successMessage && (
                <div className="shopProducts">
                    <div className="shopProductsContainer ">
                        <div className="shopProductsBackToHomeContainer">
                            <Link
                                to={`/shop/${slugify(shop.shopName, {
                                    replacement: '_',
                                    lower: true,
                                })}`}
                            >
                                <div className="shopProductsBackToHome">
                                    <BackIcon className="shopProductsIcon" />
                                    Trở lại trang của shop{' '}
                                </div>
                            </Link>
                        </div>

                        <div style={{ display: 'flex' }}>
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
                                        <div>DANH MỤC SHOP</div>
                                        <ul className="shopProductsListFilter">
                                            <li className="shopProductsItemFilter">Sản phẩm</li>
                                            <li className="shopProductsItemFilter">
                                                Sản phẩm bán chạy
                                            </li>
                                            <li className="shopProductsItemFilter">
                                                Sản phẩm mới{' '}
                                            </li>
                                            <li className="shopProductsItemFilter">iPhone</li>
                                            <li className="shopProductsItemFilter">iPad</li>
                                            <li className="shopProductsItemFilter">Apple Watch</li>
                                            <li className="shopProductsItemFilter">MacBook</li>
                                            <li className="shopProductsItemFilter">
                                                Phụ kiện Apple
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="shopProductsShopCategories">
                                        <div>THEO DANH MỤC</div>
                                        <ul className="shopProductsListFilter">
                                            {shopProducts.map(({ category }) => (
                                                <li key={category}>{category.categoryName}</li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="shopProductsShopCategories">
                                        <div>NƠI BÁN</div>
                                        <ul className="shopProductsListFilter">
                                            {' '}
                                            //HIGHLIGHTRENDER NOI BAN
                                        </ul>
                                    </div>
                                    <div className="shopProductsShopCategories">
                                        //HIGHLIGHT <div>ĐƠN VỊ VẬN CHUYỂN</div>
                                        <ul className="shopProductsListFilter">
                                            RENDTRANSPORTER LIST
                                        </ul>
                                    </div>
                                    <div className="shopProductsShopCategories">
                                        <div>ĐƠN VỊ VẬN CHUYỂN</div>
                                        <ul className="shopProductsListFilter">
                                            RENDTRANSPORTER LIST
                                        </ul>
                                    </div>
                                    <div className="shopProductsShopCategories">
                                        <div>KHOẢNG GIÁ</div>
                                        <div>
                                            <input type="text" />
                                            <input type="text" />
                                        </div>
                                        <div>
                                            <button>ÁP DỤNG</button>
                                        </div>
                                    </div>
                                    <div className="shopProductsShopCategories">
                                        <div>TÌNH TRẠNG</div>
                                        <div>
                                            <input type="checkbox" />
                                            <label htmlFor="">Mới</label>
                                            <input type="checkbox" />
                                            <label htmlFor="">Đã sử dụng</label>
                                        </div>
                                    </div>
                                    <div className="shopProductsShopCategories">
                                        <div>LỰA CHỌN THANH TOÁN</div>
                                        <div>
                                            <input type="checkbox" />
                                            <label htmlFor="">0% TRẢ GÓP</label>
                                        </div>
                                    </div>
                                    <div className="shopProductsShopCategories">
                                        <div>ĐÁNH GIÁ</div>
                                        <div>
                                            {[5, 4, 3, 2, 1].map(value => {
                                                return (
                                                    <div
                                                        data-value={`ratingFilter=${value}`}
                                                        key={`ratingFilter=${value}`}
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
                                                        {Array.from({ length: 5 - value }).map(
                                                            (_, index) => {
                                                                return (
                                                                    <span
                                                                        className="fa fa-star"
                                                                        key={5 + index}
                                                                    ></span>
                                                                );
                                                            }
                                                        )}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                    <div className="shopProductsShopCategories">
                                        <div>DỊCH VỤ & KHUYẾN MÃI</div>
                                        <div>
                                            <input type="checkbox" />
                                            <label htmlFor="">0% TRẢ GÓP</label>
                                            <input type="checkbox" />
                                            <label htmlFor="">0% TRẢ GÓP</label>
                                            <input type="checkbox" />
                                            <label htmlFor="">0% TRẢ GÓP</label>
                                            <input type="checkbox" />
                                            <label htmlFor="">0% TRẢ GÓP</label>
                                            <select name="" id="">
                                                <option value=""></option>
                                            </select>
                                        </div>
                                    </div>
                                    <div>
                                        <button>Xóa Tất Cả</button>
                                    </div>
                                </div>
                            </div>
                            <div className="shopProductsRight">
                                <div className="shopProductsFilterBar">
                                    <div className="shopProductsOptionTitle ">Sắp xếp theo</div>
                                    <div
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            width: '89%',
                                        }}
                                    >
                                        <div
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                            }}
                                        >
                                            <div className="shopProductsSortOption">Phổ biến</div>
                                            <div className="shopProductsSortOption">Mới nhất</div>
                                            <div className="shopProductsSortOption">Bán chạy</div>
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
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <div className="shopProductsPageDisplay">
                                                <span>1</span>/1
                                            </div>
                                            <div className="shopProductsPaging">
                                                <ArrowLeft className="shopProductsSvgIcon" />
                                            </div>
                                            <div className="shopProductsPaging">
                                                <ArrowRight className="shopProductsSvgIcon" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="shopProductsProductContainer">
                                    {shopProducts.map(product => (
                                        <ProductCard product={product} key={product._id} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default ShopProducts;
