import styled from 'styled-components';
import { Anchor } from '../../../globalStyle';

export const MallShopContainer = styled.section`
    background-color: #fff;
    height: 36rem;
`;

export const MSTitle = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 8.5rem;
    padding: 0.5rem 0 1rem;
`;

export const MSBrandLogo = styled.div`
    height: 27.5rem;
    display: grid;
    grid-template-columns: repeat(6, 1fr);
`;

export const ShopLogo = styled.img`
    width: 20rem;
    height: 11rem;
    object-fit: contain;
`;

export const AnchorExtend = styled(Anchor)`
    display: block;
    text-transform: uppercase;
    line-height: ${props => props.fontsize};

    &.flex {
        display: inline-flex;
        align-items: center;
    }
`;

export const Section = styled.section`
    width: 100%;
    height: 36.5rem;
`;

export const SectionTitle = styled.div``;
export const ProductContainer = styled.div``;
export const ProductCard = styled.div``;
export const ProductImgWrapper = styled.div``;

export const ProductImg = styled.img``;
export const FromBrand = styled.div``;
export const MinPrice = styled.div``;
