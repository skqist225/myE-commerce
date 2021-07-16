import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ContentContainer, StandardSelfFlex } from '../../globalStyle';
import {
    ParentContainer,
    HeaderLine,
    HeaderList,
    ListItem,
    UserMenuModal,
    SeconLogoContainer,
    MenuList,
    MenuItem,
    MenuLink,
    ItemLink,
    LogoWrapper,
    HeaderSearchWrapper,
    HeaderForm,
    HeaderSearchInput,
    HeaderSearchButton,
    HeaderBelowSearchProductName,
    CartWrapper,
    FacebookIcon,
    InstagramIcon,
    Avatar,
    Bridge,
    Seperator,
    ShopeeCartWrapper,
    Badge,
} from './HeaderComponent';
import {
    NotifyIcon,
    HelpIcon,
    ShopeeLogo,
    SearchIcon,
    CartIcon,
    ShopeeCart,
    ShopeeMall,
} from './headerIcon.js';
import { createImage } from '../../helpers';
import './header.css';
import { useDispatch, useSelector } from 'react-redux';
import { userLogout } from '../../features/auth';
import { fetchUserCart } from '../../features/cart';

function Header({ bgColor, noBelowSeachForm, secondLogo, getBgInCartPage }) {
    const dispatch = useDispatch();
    const { user, isAuthenticated } = useSelector(state => state.auth);
    const { cart, successMessage } = useSelector(state => state.cart);

    const handleLogoutRequest = () => {
        dispatch(userLogout());
    };

    useEffect(() => {
        if (isAuthenticated) {
            dispatch(fetchUserCart());
        }
    }, [dispatch, isAuthenticated]);

    return (
        <ParentContainer bgColor={bgColor}>
            <ContentContainer>
                <HeaderLine className="headerLineOne" bgColor={bgColor}>
                    <HeaderList className="headerListLeft">
                        <ListItem>
                            <ItemLink to="/">Kênh người bán</ItemLink>
                        </ListItem>
                        <ListItem>
                            <ItemLink to="/"> Tải ứng dụng</ItemLink>
                        </ListItem>
                        <ListItem>
                            <span style={{ display: 'inline-block', marginRight: '5px' }}>
                                {' '}
                                Kết Nối
                            </span>
                            <ItemLink to="/">
                                <FacebookIcon src={createImage('LOGOBIGTECH.png')} />{' '}
                            </ItemLink>
                            <ItemLink to="/">
                                <InstagramIcon src={createImage('LOGOBIGTECH.png')} />
                            </ItemLink>
                        </ListItem>
                    </HeaderList>
                    <HeaderList className="headerListRight">
                        <ListItem>
                            <NotifyIcon className="headerIcon" />
                            <ItemLink needpaddingleft="5px" to="/">
                                Thông Báo
                            </ItemLink>
                        </ListItem>
                        <ListItem>
                            <HelpIcon className="headerIcon" />
                            <ItemLink needpaddingleft="5px" to="/">
                                Hỗ trợ
                            </ItemLink>
                        </ListItem>
                        <ListItem className="userItem">
                            <Avatar src={createImage(user.avatar, false)} />
                            <span
                                style={{
                                    display: 'inline-block',
                                    marginLeft: '0.625rem',
                                    color: '#fff',
                                    fontSize: '1.8rem',
                                }}
                            >
                                {user.username}
                            </span>
                            <Bridge></Bridge>
                            <UserMenuModal
                                render={
                                    <MenuList>
                                        <MenuItem>
                                            <MenuLink to="/">tài khoản của tôi</MenuLink>
                                        </MenuItem>
                                        <MenuItem>
                                            <MenuLink to="/">đơn mua </MenuLink>
                                        </MenuItem>
                                        <MenuItem to="/buyer/login" onClick={handleLogoutRequest}>
                                            <MenuLink>đăng xuất</MenuLink>
                                        </MenuItem>
                                    </MenuList>
                                }
                            />
                        </ListItem>
                    </HeaderList>
                </HeaderLine>
                <HeaderLine getBgInCartPage={getBgInCartPage}>
                    {secondLogo ? (
                        <SeconLogoContainer>
                            <ShopeeCartWrapper style={{ position: 'relative' }}>
                                <div style={{ position: 'absolute', bottom: '-2rem' }}>
                                    {' '}
                                    <ShopeeCart fillColor="#fff" width="5rem" height="5.6rem" />
                                </div>
                                <Seperator></Seperator>
                            </ShopeeCartWrapper>

                            <StandardSelfFlex
                                width="22.5rem"
                                height="6.1rem"
                                justifyContent="flex-start"
                            >
                                <ShopeeMall fillColor="#fff" width="16.5rem" height="5.6rem" />
                            </StandardSelfFlex>
                        </SeconLogoContainer>
                    ) : (
                        <LogoWrapper
                            render={
                                <Link to="/">
                                    <ShopeeLogo fillColor="#fff" />
                                </Link>
                            }
                        />
                    )}

                    {secondLogo && <div style={{ flex: '1' }}></div>}
                    <HeaderSearchWrapper secondLogo={secondLogo}>
                        <HeaderForm>
                            <HeaderSearchInput secondLogo={secondLogo} />
                            <HeaderSearchButton children={<SearchIcon />} bgColor={bgColor} />
                        </HeaderForm>

                        <HeaderBelowSearchProductName>
                            {!noBelowSeachForm && (
                                <>
                                    {' '}
                                    <ItemLink fontSize="1.5rem" fontWeight="300" to="/">
                                        abc
                                    </ItemLink>
                                    <ItemLink fontSize="1.5rem" ml="true" fontWeight="300" to="/">
                                        asd
                                    </ItemLink>
                                    <ItemLink fontSize="1.5rem" ml="true" fontWeight="300" to="/">
                                        asdasd
                                    </ItemLink>
                                    <ItemLink fontSize="1.5rem" ml="true" fontWeight="300" to="/">
                                        asdfsafdsafd
                                    </ItemLink>
                                    <ItemLink fontSize="1.5rem" ml="true" fontWeight="300" to="/">
                                        sadfsadf
                                    </ItemLink>
                                </>
                            )}
                        </HeaderBelowSearchProductName>
                    </HeaderSearchWrapper>

                    <CartWrapper
                        render={
                            <>
                                <Link to="/cart">
                                    <CartIcon />
                                    <Badge
                                        innertext={
                                            cart.length > 0
                                                ? cart.reduce((acc, item) => acc + item.count, 0)
                                                : 0
                                        }
                                        color={bgColor}
                                    />
                                </Link>
                            </>
                        }
                    />
                </HeaderLine>
            </ContentContainer>
        </ParentContainer>
    );
}

export default Header;
