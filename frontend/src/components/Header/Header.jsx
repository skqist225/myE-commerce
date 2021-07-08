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
                <HeaderLine>
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
                            <ItemLink needPaddingLeft="5px">Thông Báo</ItemLink>
                        </ListItem>
                        <ListItem>
                            <HelpIcon className="headerIcon" />
                            <ItemLink needPaddingLeft="5px">Hỗ trợ</ItemLink>
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
                            <ItemLink fontSize="1.5rem" fontWeight="300">
                                abc
                            </ItemLink>
                            <ItemLink fontSize="1.5rem" mL fontWeight="300">
                                asd
                            </ItemLink>
                            <ItemLink fontSize="1.5rem" mL fontWeight="300">
                                asdasd
                            </ItemLink>
                            <ItemLink fontSize="1.5rem" mL fontWeight="300">
                                asdfsafdsafd
                            </ItemLink>
                            <ItemLink fontSize="1.5rem" mL fontWeight="300">
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
