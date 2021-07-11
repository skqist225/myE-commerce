import React from 'react';
import createImage from '../../../helpers/createImage.js';
import {
    Section,
    SectionTitle,
    ProductContainer,
    ProductCard,
    ProductImgWrapper,
    ProductImg,
    FromBrand,
    MinPrice,
} from './MallShopComponent.js';

function ProductFromTopBrandSection({ sectionTitle, productData }) {
    return (
        <Section>
            {/* <SectionTitle>{sectionTitle}</SectionTitle>
            <ProductContainer>
                {productData.map(product => (
                    <ProductCard key={product._id}>
                        <ProductImgWrapper>
                            <ProductImg
                                src={createImage(product.productTypes[0].typeImage, false)}
                            />
                        </ProductImgWrapper>
                        <FromBrand>
                            {product.shop.shopName.substring(0, shopName.indexOf(' '))}
                        </FromBrand>
                        <MinPrice>
                            <span>Từ</span>
                            <span>
                                đ{' '}
                                {product.productTypes.reduce((acc, item) => {
                                    if (item < acc) {
                                        return item;
                                    } else {
                                        return acc;
                                    }
                                }, product.productTypes[0])}
                            </span>
                        </MinPrice>
                    </ProductCard>
                ))}
            </ProductContainer> */}
        </Section>
    );
}

export default ProductFromTopBrandSection;
