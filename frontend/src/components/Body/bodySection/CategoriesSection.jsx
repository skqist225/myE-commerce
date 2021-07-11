import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../../../features/categories';

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
    const dispatch = useDispatch();
    const categories = useSelector(categoriesSelectors.selectAll);

    let parentCategories = categories.filter(({ parentId }) => parentId === 'undefined');
    parentCategories = parentCategories.map(category => ({
        ...category,
        path: `${category.categoryName.replace(/ /g, '-').replace(/-&-/g, '-')}-cat.${
            category._id
        }`,
    }));

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    return (
        <CategorySection>
            <ContentContainer>
                <WhiteBgWrapper>
                    <Title>DANH MỤC</Title>
                    <CategoryContainer>
                        {parentCategories.map(category => (
                            <Anchor key={category._id} to={category.path}>
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
