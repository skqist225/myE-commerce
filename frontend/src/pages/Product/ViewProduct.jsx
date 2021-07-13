import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { Header, ShopInfoSection } from '../../components';
import ViewProduct from '../../components/products/ViewProduct';
import { fetchProductById } from '../../features/product';
import { PageBodyContainer } from '../../globalStyle';

const PageContainer = styled.div`
    height: 500rem;
`;

const CoverGrayBackground = styled.div`
    width: 100%;
    height: 100%;
    background-color: #f5f5f5;
`;

function VP({ match }) {
    return (
        <PageContainer>
            <Header bgColor="#d0011b" noBelowSeachForm={true} secondLogo={true} />
            <CoverGrayBackground>
                <PageBodyContainer pt="0">
                    <ViewProduct bgColor="#d0011b" match={match} />
                    <ShopInfoSection bgColor="#d0011b" />
                </PageBodyContainer>
            </CoverGrayBackground>
        </PageContainer>
    );
}

export default VP;
