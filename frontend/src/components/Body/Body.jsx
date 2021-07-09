import React from 'react';
import {
    ServiceSection,
    NewShopGoodDealSection,
    CategoriesSection,
    FlashSaleSection,
    VoucherSection,
} from './bodySection';
import styled from 'styled-components';
import './body.css';
const BackgroundWrapper = styled.div`
    background-color: #f5f5f5;
    padding-top: 2.5rem;
    height: 500rem;
`;

function Body() {
    return (
        <div className="body">
            <ServiceSection />
            <BackgroundWrapper>
                <NewShopGoodDealSection />
                <CategoriesSection />
                <FlashSaleSection />
                <VoucherSection />
            </BackgroundWrapper>
        </div>
    );
}

export default Body;
