import React from 'react';
import { ContentContainer } from '../../../globalStyle';
import { FlashSale, FSTitle, TitleWrapper } from './flashSaleComponent';
import { WhiteBgWrapper } from './categoriesComponent';

function FlashSaleSection() {
    return (
        <FlashSale>
            <ContentContainer>
                <WhiteBgWrapper>
                    <TitleWrapper>
                        <FSTitle src="FS.png" />
                    </TitleWrapper>
                </WhiteBgWrapper>
            </ContentContainer>
        </FlashSale>
    );
}

export default FlashSaleSection;
