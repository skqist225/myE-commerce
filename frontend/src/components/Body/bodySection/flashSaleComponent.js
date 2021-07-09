import styled from 'styled-components';
import { Title, CategorySection } from './categoriesComponent';
import { createImage } from '../../../helpers';

export const FlashSale = styled(CategorySection)``;

export const TitleWrapper = styled(Title)``;

export const FSTitle = styled.div`
    background: url('${props => createImage(props.src)}');
    background-repeat: no-repeat;
    background-size: contain;
    width: 13rem;
    height: 3rem;
    line-height: 3rem;
`;
