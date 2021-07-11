import React from 'react';
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

function Header({ bgColor, noBelowSeachForm, secondLogo }) {
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.auth);

    const handleLogoutRequest = () => {
        dispatch(userLogout());
    };

    return (
        <ParentContainer bgColor={bgColor}>
            <ContentContainer>
                <HeaderLine className="headerLineOne">
                    <HeaderList className="headerListLeft">
                        <ListItem>
                            <ItemLink>Kênh người bán</ItemLink>
                        </ListItem>
                        <ListItem>
                            <ItemLink> Tải ứng dụng</ItemLink>
                        </ListItem>
                        <ListItem>
                            <span style={{ display: 'inline-block', marginRight: '5px' }}>
                                {' '}
                                Kết Nối
                            </span>
                            <ItemLink to="">
                                <FacebookIcon src={createImage('LOGOBIGTECH.png')} />{' '}
                            </ItemLink>
                            <ItemLink to="">
                                <InstagramIcon src={createImage('LOGOBIGTECH.png')} />
                            </ItemLink>
                        </ListItem>
                    </HeaderList>
                    <HeaderList className="headerListRight">
                        <ListItem>
                            <NotifyIcon className="headerIcon" />
                            <ItemLink needpaddingleft="5px">Thông Báo</ItemLink>
                        </ListItem>
                        <ListItem>
                            <HelpIcon className="headerIcon" />
                            <ItemLink needpaddingleft="5px">Hỗ trợ</ItemLink>
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
                                            <MenuLink>tài khoản của tôi</MenuLink>
                                        </MenuItem>
                                        <MenuItem>
                                            <MenuLink>đơn mua </MenuLink>
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
                <HeaderLine>
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
                    <CartWrapper render={<CartIcon />} />
                </HeaderLine>
            </ContentContainer>
        </ParentContainer>
    );
}

export default Header;
