import styled from 'styled-components';
import { Flex, Image, Button } from '../../globalStyle';
import { createImage } from '../../helpers';

export const ProductName = styled.span`
    display: -webkit-box;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    font-weight: 500;
    margin-left: 1rem;
    vertical-align: sub;
    max-height: 6rem;
    line-height: 3rem;
    overflow: hidden;
    max-width: 83rem;
    font-size: 2.5rem;
    word-wrap: break-word;
`;

export const PolicyIcon = styled.div.attrs(props => ({
    src: createImage('1ce96743fb9e3d51ca703e17eb491283.png'),
}))`
    background-image: url('${props => props.src}');
    flex-shrink: 0;
    width: 2.25rem;
    height: 2.25rem;
    margin-right: 0.5rem;
`;

export const First = styled(PolicyIcon)`
    background-size: 284.72222222222223% 241.0958904109589%;
    background-position: 7.518796992481203% 9.70873786407767%;
`;

export const Second = styled(PolicyIcon)`
    background-size: 280.82191780821915% 241.0958904109589%;
    background-position: 84.84848484848484% 9.70873786407767%;
`;

export const Third = styled(PolicyIcon)`
    background-size: 284.72222222222223% 241.0958904109589%;
    background-position: 7.518796992481203% 100%;
`;

export const PolicyText = styled.div`
    overflow: hidden;
    display: -webkit-box;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;

    width: 78%;
    line-height: 2.5rem;
    font-size: 2rem;
    color: #4a4a4a;
    cursor: help;
`;

export const OriginalPrice = styled.div`
    font-size: 2rem;
    margin-right: 1rem;
    text-decoration: line-through;
    color: #929292;
    position: relative;

    & span {
        font-size: 1.4rem;
        position: absolute;
        bottom: 2px;
        left: -8px;
        text-decoration: underline;
    }
`;

export const DiscountPercent = styled.div`
    width: 8.2rem;
    height: 1.9rem;
    color: #fff;
    background-color: ${props => props.bgColor || '#ee4d2d'};
    font-weight: 700;
    padding: 3px;
    font-size: 1.4rem;
`;

export const PriceRange = styled.div`
    font-size: 3.8rem;
    font-weight: 500;
    color: #ee4d2d;
    position: relative;

    & span:first-child {
        position: absolute;
        bottom: 1rem;
        left: -0.8rem;
        font-size: 1.5rem;
    }

    & span:last-child {
        position: absolute;
        bottom: 1rem;
        left: 22.5rem;
        font-size: 1.5rem;
    }
`;

export const CategoryPath = styled(Flex)`
    width: 100%;
    height: fit-content;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
`;

export const ProductCategory = styled.div`
    font-size: 1.8rem;
    font-weight: normal;
    color: #222;
`;

export const PrdName = styled(ProductCategory)`
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;

    height: 2rem;
`;

export const VPLeft = styled.div`
    max-width: 41.6%;
    flex: 1;
    padding-left: 1.5rem;
`;

export const VPRight = styled.div`
    flex: 2;
    padding: 2.5rem 4.375rem 0 2.5rem;
    max-width: 58.3%;
`;

export const Rating = styled.div`
    color: ${props => props.bgColor || '#ee4d2d'};
    font-size: 1.6rem;
    font-weight: 500;
    text-decoration: underline;
`;

export const NoteLine = styled.div`
    color: #999;
    font-size: 1.5rem;
    font-weight: 400;
`;

export const TransportTitle = styled.div`
    color: #757575;
    flex: 1;
    width: 11rem;
    font-size: 1.8rem;
    text-transform: capitalize;
    flex-shrink: 0;
    align-items: center;
`;

export const TransportContent = styled.div`
    flex: 3;
`;

export const FreeshipImg = styled(Image).attrs(() => ({
    width: ' 2.5rem',
    height: '1.5rem',
}))``;

export const AddToCartBtn = styled(Button).attrs(props => ({
    width: '22.5rem',
    height: '4.8rem',
    padding: '0 1.5rem',
    color: `${props.bgColor}`,
    backgroundColor: `#fcebed`,
    border: `1px solid ${props.bgColor}`,
    fontSsize: '1.5rem',
}))`
    margin-right: 1.5rem;

    & span {
        display: inline-block;
        margin-left: 1rem;
    }
`;

export const BuyProductBtn = styled(AddToCartBtn).attrs(props => ({
    children: 'Mua Ngay',
    color: '#fff',
    backgroundColor: `${props.bgColor}`,
}))``;
