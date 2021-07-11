import React from 'react';
import { ContentContainer, PageBodyContainer } from '../../globalStyle';
import { Slider } from '../../components';
import { CMContainer, SliderWrapper } from './CategoryMallComponent';
import {
    MallShopSection,
    ProductFromTopBrandSection,
    BestSellProductSection,
} from './categoryMallBody';

function CategoryMallBody() {
    const dataSlider = Array.from({ length: 10 }).map((val, index) => {
        if (index === 0 || index === 1 || index === 3 || index === 8) {
            return `cat/phoneAndAccessories/${index + 1}.png`;
        } else {
            return `cat/phoneAndAccessories/${index + 1}.jpeg`;
        }
    });

    return (
        <PageBodyContainer>
            <ContentContainer>
                <SliderWrapper>
                    <Slider dataSlider={dataSlider} height="35rem" />
                </SliderWrapper>

                <MallShopSection />
                <ProductFromTopBrandSection />
                <BestSellProductSection />
            </ContentContainer>
        </PageBodyContainer>
    );
}

export default CategoryMallBody;
