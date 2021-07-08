import React from 'react';
import { Link } from 'react-router-dom';
import {
    MainContainer,
    SubContainer,
    IconWrapper,
    IconContainer,
    Wrapper,
    SubWrapper,
    HeaderTitle,
    UserImage,
    UserInfo,
    Username,
    CustomShopName,
} from './TopBarComponent';
import { QuickMenuIcon, NotifyIcon, ShopeeLogo } from './icon';
import { useDispatch, useSelector } from 'react-redux';
import { createImage } from '../../helper';
import { ArrowRight } from '../../components/shopList/svgIcon';

const TopBar = () => {
    const dispatch = useDispatch();

    const { user } = useSelector(state => state.auth);

    // React.useEffect(() =>{
    //     dispatch(fetchUser());
    // },[])

    const styles = {
        icon: {},
    };

    return (
        <MainContainer>
            <SubContainer>
                <Wrapper>
                    <IconWrapper width="26px" height="29px">
                        <ShopeeLogo fillColor="#ee4d2d" />
                    </IconWrapper>
                </Wrapper>
                <Wrapper>
                    <SubWrapper>
                        <HeaderTitle to="/shop/manage">Trang chủ </HeaderTitle>{' '}
                        <IconWrapper width="6px" height="10.5px">
                            <ArrowRight className="fill" />
                        </IconWrapper>
                    </SubWrapper>
                    <UserInfo>
                        <UserImage src={createImage(user.avatar, false)} alt={user.avatar} />
                        <Username name={user.username} />
                    </UserInfo>
                </Wrapper>
                <Wrapper className="thirdWrapper">
                    <IconContainer>
                        <IconWrapper>
                            <QuickMenuIcon />
                        </IconWrapper>
                        <IconWrapper>
                            <NotifyIcon />
                        </IconWrapper>
                    </IconContainer>
                    <Link to="/help" style={{ display: 'inline-block' }}>
                        <CustomShopName>SHOPEE {user.firstName}</CustomShopName>
                    </Link>
                </Wrapper>
            </SubContainer>
        </MainContainer>
    );
};

export default TopBar;
