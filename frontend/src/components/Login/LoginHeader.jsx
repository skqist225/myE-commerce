import React from 'react';
import {
    HeaderContainer,
    ContentContainer,
    HeaderLeft,
    HeaderTitle,
    HeaderRight,
    AnchorExtend,
} from './LoginComponent';
import { LogoWrapper } from '../Header/HeaderComponent';

import { ShopeeLogo } from '../Header/headerIcon';

function LoginHeader() {
    return (
        <HeaderContainer>
            <ContentContainer>
                <HeaderLeft>
                    <LogoWrapper render={<ShopeeLogo fillColor="#ee4d2d" />} />

                    <HeaderTitle>Đăng nhập </HeaderTitle>
                </HeaderLeft>
                <HeaderRight>
                    <AnchorExtend>Cần trợ giúp ?</AnchorExtend>
                </HeaderRight>
            </ContentContainer>
        </HeaderContainer>
    );
}

export default LoginHeader;
