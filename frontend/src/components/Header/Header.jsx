import React from 'react';
import { ContentContainer } from '../../globalStyle';
import {
    ParentContainer,
    HeaderLine,
    HeaderList,
    ListItem,
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
} from './HeaderComponent';
import { NotifyIcon, HelpIcon, ShopeeLogo, SearchIcon, CartIcon } from './headerIcon.js';
import { createImage } from '../../helpers';
import './header.css';

function Header() {
    return (
        <ParentContainer>
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
                        <ListItem>
                            <Avatar />
                            <span style={{ display: 'inline-block', marginLeft: '0.625rem' }}>
                                sulanheartme1
                            </span>
                        </ListItem>
                    </HeaderList>
                </HeaderLine>
                <HeaderLine>
                    <LogoWrapper render={<ShopeeLogo />} />
                    <HeaderSearchWrapper>
                        <HeaderForm>
                            <HeaderSearchInput />
                            <HeaderSearchButton children={<SearchIcon />} />
                        </HeaderForm>

                        <HeaderBelowSearchProductName>
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
                        </HeaderBelowSearchProductName>
                    </HeaderSearchWrapper>
                    <CartWrapper render={<CartIcon />} />
                </HeaderLine>
            </ContentContainer>
        </ParentContainer>
    );
}

export default Header;
