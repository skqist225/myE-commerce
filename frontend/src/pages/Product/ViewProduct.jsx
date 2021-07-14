import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import {
    Header,
    ShopInfoSection,
    ProductDescriptionSection,
    ProductRatingSection,
} from '../../components';
import ViewProduct from '../../components/products/ViewProduct';
import { categoriesSelectors, fetchCategories } from '../../features/categories';
import { fetchProductById } from '../../features/product';
import { ContentContainer, Flex, PageBodyContainer, WhiteBgWrapper } from '../../globalStyle';
import { _setCategoryPath, clearCategoryPath } from '../../features/product';
import { fetchProductReviews } from '../../features/reviews';

const PageContainer = styled.div`
    height: 500rem;
`;

const CoverGrayBackground = styled.div`
    width: 100%;
    height: 100%;
    background-color: #f5f5f5;
`;

function VP({ match }) {
    const { productId } = match.params;
    const dispatch = useDispatch();
    const { successMessage, productEntity: product } = useSelector(state => state.product);
    const categories = useSelector(categoriesSelectors.selectAll);

    function handleCategoryPath(categories, parentId) {
        const categoryList = [];
        const renderCategoryPath = (categories, parentId) => {
            const parent = categories.find(category => category._id === parentId);
            if (parent) {
                categoryList.push(parent);
                if (parent.parentId) {
                    renderCategoryPath(categories, parent.parentId);
                }
            } else {
                return;
            }
        };
        renderCategoryPath(categories, parentId);
        return categoryList;
    }

    useEffect(() => {
        dispatch(fetchProductById({ productId }));
    }, [dispatch, productId]);

    useEffect(() => {
        dispatch(fetchCategories());
        dispatch(clearCategoryPath());
    }, []);

    useEffect(() => {
        if (successMessage) {
            const categoryPath = handleCategoryPath(categories, product.category.parentId);
            dispatch(_setCategoryPath(categoryPath));
        }
    }, [successMessage]);

    return (
        <PageContainer>
            <Header bgColor="#d0011b" noBelowSeachForm={true} secondLogo={true} />
            <CoverGrayBackground>
                <PageBodyContainer pt="0">
                    <ViewProduct bgColor="#d0011b" match={match} />
                    <ShopInfoSection bgColor="#d0011b" />
                    <ContentContainer padding="2rem 0 0 0">
                        <Flex width="100%" alignItems="flex-start">
                            <div style={{ flex: '3' }}>
                                <WhiteBgWrapper padding="1.25rem">
                                    <ProductDescriptionSection />
                                </WhiteBgWrapper>
                                <WhiteBgWrapper mt="2rem">
                                    <ProductRatingSection bgColor="#d0011b" match={match} />
                                </WhiteBgWrapper>
                            </div>
                            <div style={{ flex: '1', height: '300rem', marginLeft: '2rem' }}>
                                <WhiteBgWrapper padding="1.25rem">
                                    <p>//DEVNOTIFY later</p>
                                </WhiteBgWrapper>
                            </div>
                        </Flex>
                    </ContentContainer>
                </PageBodyContainer>
            </CoverGrayBackground>
        </PageContainer>
    );
}

export default VP;
