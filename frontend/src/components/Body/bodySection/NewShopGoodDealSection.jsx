import React from 'react';
import { ContentContainer } from '../../../globalStyle';
import { MainContainer, MainDiv, Banner, WhiteBgWrapper } from './NSGDComponent';
import { createImage } from '../../../helpers';

function NewShopGoodDealSection() {
    return (
        <MainContainer>
            <ContentContainer>
                <WhiteBgWrapper>
                    <Banner src={createImage('SMDX.png')} />
                    <MainDiv></MainDiv>
                </WhiteBgWrapper>
            </ContentContainer>
        </MainContainer>
    );
}

export default NewShopGoodDealSection;
