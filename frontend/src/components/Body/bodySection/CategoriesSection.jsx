import React from 'react';
import { useSelector } from 'react-redux';
import { ContentContainer } from '../../../globalStyle';
import {
    CategorySection,
    Title,
    CategoryContainer,
    CategoryBox,
    CategoryName,
    CategoryImage,
    WhiteBgWrapper,
} from './categoriesComponent';
import { Anchor } from './serviceSectionComponent';
import { createImage } from '../../../helpers';
import { categoriesSelectors } from '../../../features/categories';

function CategoriesSection() {
    const categories = useSelector(categoriesSelectors.selectAll);

    const parentCategories = categories.filter(({ parentId }) => parentId === 'undefined');

    console.log(categories);

    return (
        <CategorySection>
            <ContentContainer>
                <WhiteBgWrapper>
                    <Title>DANH MỤC</Title>
                    <CategoryContainer>
                        {parentCategories.map(category => (
                            <Anchor key={category._id} to="/">
                                <CategoryBox>
                                    <CategoryImage
                                        src={createImage(category.categoryImage, false)}
                                    />
                                    <CategoryName>{category.categoryName}</CategoryName>
                                </CategoryBox>
                            </Anchor>
                        ))}
                    </CategoryContainer>
                </WhiteBgWrapper>
            </ContentContainer>
        </CategorySection>
    );
}

export default CategoriesSection;
