import styled from 'styled-components';
import { Flex, Anchor, Button } from '../../globalStyle';

export const FreeshipNotification = styled(Flex).attrs(() => ({
    width: '100%',
    height: '5.3rem',
    padding: '1.5rem 2rem',
}))`
    margin-bottom: 1.25rem;
    background-color: #fff;
    border: rgba(224, 168, 0, 0.4) 1px solid;
`;

export const Text = styled.span`
    color: #222;
    margin-left: 0.5rem;
    font-size: 1.8rem;
    font-weight: 500;
`;

export const InfoBar = styled(FreeshipNotification).attrs(() => ({
    // justifyContent: 'space-between',
}))``;

export const FreeshipImage = styled.div`
    background-image: url('${props => props.src}');
    background-repeat: no-repeat;
    background-size: contain;
    height: 2.25rem;
    width: 100%;
`;

export const RightTitle = styled(Flex)`
    & div {
        width: 20.43557%;
        text-align: center;
        color: #888;
        font-size: 1.4rem;
        text-transform: capitalize;
    }
`;

export const CartProducts = styled(Flex)`
    background-color: #fff;
`;

export const Line = styled.div`
    flex: 1;
    height: 1px;
    color: #f5f5f5;
`;

export const ShopName = styled(Flex).attrs(props => ({
    width: '100%',
}))`
    height: 7.5rem;

    & span {
        color: rgba(0, 0, 0, 0.8);
        font-weight: 500;
        font-size: 1.8rem;
        display: inline-block;
        margin-left: 1rem;
        margin-right: 1rem;
    }
`;

export const Product = styled.div`
    width: 100%;
    padding: 0 2rem;
`;

export const ProductRight = styled(Flex)`
    flex: 1;
    height: 100%;
    max-width: 54%;
    // justify-content: space-between;
    justify-content: flex-end;
`;

export const ProductLeft = styled(Flex)`
    flex: 1;
    height: 100%;
    max-width: 46%;
`;

export const ProductImg = styled.img`
    width: 8rem;
    height: 8rem;
    object-fit: contain;
`;

export const ProductName = styled(Anchor)`
    color: rgba(0, 0, 0, 0.8);
    display: block;
    margin-bottom: 5px;
    line-height: 16px;
    max-height: 32px;
    text-overflow: ellipsis;
    overflow: hidden;
    word-break: break-word;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    font-size: 1.4rem;
`;

export const DeleteButton = styled(Button)`
    background-color: transparent;
    display: block;
    font-size: ${props => props.fontSize || '1.8rem'};
    color: #000;
    margin: 0 0.8rem;
    padding: 1px 6px;
`;

export const FunctionText = styled.div`
    color: #ee4d2d;
    font-weight: 500;
    font-size: 1.8rem;
    text-align: center;
    width: 100%;
    height: 100%;
`;

export const FunctionTextWrapper = styled(Flex)`
    flex-direction: column;
    align-items: center;
    max-width: 14rem;
    width: 100%;
    justify-self: flex-end;
`;

export const FinalPrice = styled(Flex)`
    margin-right: 2rem;

    justify-content: flex-end;

    & span {
        display: inline-block;

        font-size: 1.75rem;
        color: #ee4d2d;
    }
`;

export const BuyProductBar = styled.div`
    width: 100%;
    height: 18.1rem;
    // position: fixed;
    bottom: 0;
    left: 0;
    background-color: #f5f5f5;
    margin-top: 2rem;
`;

export const ChooseVoucher = styled.div`
    text-transform: capitalize;
    color: #05a;
    font-size: 1.875rem;
    white-space: nowrap;
    cursor: pointer;
`;

export const SelectAll = styled(Button)`
    background-color: transparent;
    color: #000
    text-transform: capitalize;
    cursor: pointer;
    font-size: 2rem;
`;

export const SaveFavorite = styled(SelectAll)`
    background-color: transparent;
    color: #ee4d2d;
    margin: 0 8px;
    max-width: 16.8rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    justify-content: flex-start;
`;

export const TotalPay = styled.div`
    font-size: ${props => props.fontSize || '1.6rem'};
    color: #222222;
    line-height: 1.9rem;
    text-align: right;

    &.first {
        display: flex;
        justify-content: flex-end;
    }

    &.first span {
        display: inline-block;
    }

    & span.hightlightText {
        width: 16.5rem;
        font-size: 2.4rem;
        line-height: 2.8rem;
        margin-left: 5px;
        color: #ee4d2d;
        position: relative;
    }

    & span.hightlightText:before {
        content: 'đ';
        font-size: 1.4rem;
        // position: absolute;
        bottom: 1.5rem;
        // margin-right: 0.1rem;
        // display: block;
        text-decoration: underline;
    }

    & span.savedPrice {
        font-size: 1.4rem;
        // line-height: 2.8rem;
        margin-left: 5px;
        color: #ee4d2d;
    }
`;

export const BuyButton = styled(Button)`
    padding: 13px 36px;
    margin: 0 22px 0 15px;
    text-transform: capitalize;
    font-weight: 300;
    height: 5rem;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    font-size: 1.75rem;
    border-radius: 2px;
    width: 26.25rem;
    color: #fff;
    background-color: #ee4d2d;
`;
