import styled from 'styled-components';
import { AddToCartBtn } from '../products/ViewProductComponent';

export const ShopInfoSection = styled.section`
    width: 100%;
    height: 16.25rem;
    margin-top: 2rem;
`;

export const ShopLogo = styled.div`
    width: 100%;
    height: 100%;
    background-image: url('${props => props.src}');
    background-size: contain;
    background-position: center center;
    position: relative;
    boreder-radius: 50%;
    border: 1px solid #f5f5f5;
`;

export const ShopName = styled.div`
    font-weight: 500;
    font-size: 2rem;
    color: rgba(0, 0, 0, 0.87);
    margin: 0;
`;

export const ActiveTime = styled.div`
    font-size: 1.7rem;
    color: rgba(0, 0, 0, 0.54);
    text-transform: capitalize;
`;

export const ChatButton = styled(AddToCartBtn).attrs(() => ({
    width: '11.7rem',
    height: '3.4rem',
}))`
    box-shadow: 0 1px 1px 0 rgb(0 0 0 / 3%);
    padding: 0 0.5rem;
`;

export const ViewShopButton = styled(AddToCartBtn).attrs(() => ({
    width: '11.7rem',
    height: '3.4rem',
    color: '#555',
    backgroundColor: '#fff',
    border: '1px solid rgba(0, 0, 0, 0.09)',
}))`
    box-shadow: 0 1px 1px 0 rgb(0 0 0 / 3%);
    padding: 0 0.5rem;
`;

export const InfoTitle = styled.label`
    color: rgba(0, 0, 0, 0.4);
    margin-right: 1.25rem;
    font-size: 1.8rem;
    text-transform: capitalize;
`;

export const InfoNumber = styled.span`
    display: inline-block;
    color: ${props => props.color};
    font-size: 1.8rem;
`;
