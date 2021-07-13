import React, { Fragment, useState } from 'react';
import { useSelector } from 'react-redux';
import { categoriesSelectors } from '../../features/categories';
import { ContentContainer, Flex, WhiteBgWrapper } from '../../globalStyle';
import { CategoryPath, ProductCategory } from '../products/ViewProductComponent';
import { InfoTitle } from '../ShopInfo/ShopInfoComponent';
import { ArrowRight } from '../shopList/svgIcon';
import {
    Information,
    ProductDescriptionSection,
    Description,
    SectionTitle,
    PaddingLayout,
} from './ProductDescriptionComp';

function ProductDescription({ ...props }) {
    const { productEntity: product, loading, categoryPath } = useSelector(state => state.product);
    const [productDescription, setProductDescription] = useState('');
    const categories = useSelector(categoriesSelectors.selectAll);
    const { description, number_of_stocks, category, shop } = product;

    React.useEffect(() => {
        if (product && !loading) {
            setProductDescription(description.replace(/•/g, '\n\n•'));
        }
    }, [product, loading]);

    return (
        <ProductDescriptionSection>
            {!loading && product && (
                <PaddingLayout>
                    <SectionTitle>CHI TIẾT SẢN PHẨM</SectionTitle>
                    <Flex
                        flexDirection="column"
                        alignItems="flex-start"
                        justifyContent="space-between"
                        height="10.8rem"
                        style={{ margin: '3.75rem 1.875rem 1.875rem' }}
                    >
                        <Flex alignItems="flex-start" width="100%">
                            <InfoTitle mr="5rem" style={{ width: '16.5rem', display: 'block' }}>
                                Danh mục
                            </InfoTitle>
                            <CategoryPath style={{ flexWrap: 'wrap', lineHeight: '2rem' }}>
                                {categoryPath.length > 0 &&
                                    categoryPath.map(category => (
                                        <Fragment key={category._id}>
                                            <div style={{ fontSize: '1.8rem' }}>
                                                {category.categoryName}
                                            </div>
                                            <ArrowRight
                                                style={{
                                                    margin: '0 1rem',
                                                    width: '1.5rem',
                                                    height: '1.5rem',
                                                }}
                                            />
                                        </Fragment>
                                    ))}
                                <ProductCategory>{`${product.category.categoryName}`}</ProductCategory>
                            </CategoryPath>
                        </Flex>
                        <Flex>
                            <InfoTitle mr="5rem" style={{ width: '12.5rem', display: 'block' }}>
                                Kho hàng
                            </InfoTitle>
                            <Information>{number_of_stocks}</Information>
                        </Flex>
                        <Flex>
                            <InfoTitle mr="5rem" style={{ width: '12.5rem', display: 'block' }}>
                                Gửi từ
                            </InfoTitle>
                            <Information>{shop.shopLocation}</Information>
                        </Flex>
                    </Flex>
                    <SectionTitle>MÔ TẢ SẢN PHẨM</SectionTitle>
                    <Description>{productDescription}</Description>
                </PaddingLayout>
            )}
        </ProductDescriptionSection>
    );
}

export default ProductDescription;
