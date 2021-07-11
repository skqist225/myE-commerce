import styled from 'styled-components';
import { Button, Image } from '../../globalStyle';

export const BackToHomeContainer = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    margin-bottom: 2.5rem;
    color: rgba(0, 0, 0, 0.8);
    text-transform: uppercase;
    font-size: 1.8rem;
    line-height: 2rem;
`;
export const ViewShopButton = styled(Button).attrs(props => ({
    height: '3.125rem',
    width: '21rem',
    height: '3.125rem',
    color: '#fff',
    backgroundColor: '#666666',
    border: '1px solid #fff',
    fontSize: '1.5rem',
    fontWeight: '500',
    textTransform: 'uppercase',
    padding: '.7rem 0',
}))`
    margin-right: 0.5rem;
`;

export const ViewShopLogo = styled(Image).attrs(props => ({
    width: '9rem',
    height: '9rem',
    borderRadius: '50%',
    objectFit: 'contain',
}))`
    margin-left: 2.5rem;
    border: 5px solid #a2a2a2;
`;

export const ViewShopMallLogo = styled(Image).attrs(props => ({
    height: '1.6rem',
    width: '6.4rem',
}))`
    position: absolute;
    left: 3.8rem;
    top: 80%;
`;

export const ProductCardContainer = styled.div`
    max-width: 19rem;
    max-height: 33.3rem;
    background: #fff;
    -webkit-box-shadow: 0px 4px 5px 2px rgb(232 227 232);
    -moz-box-shadow: 0px 4px 5px 2px rgb(232 227 232);
    box-shadow: 0px 4px 5px 2px rgb(232 227 232);
    position: relative;
    transition: all 0.3s ease-out;

    &:hover {
        transform: scale(1.05);
    }
`;

export const FilterButton = styled(Button).attrs(props => ({
    height: '3.75rem',
    width: '100%',
    textTransform: 'uppercase',
    fontWeight: '400',
    fontSize: '18px',
    color: ' #fff',
    backgroundColor: 'rgb(238, 77, 45)',
}))`
    margin: 2.25rem 0 0;
`;

export const ShopProductsFilter = styled.div.attrs(() => ({
    className: 'shopProductsSortOption',
}))`
    border-radius: 2px;
    height: 43px;
    padding: 0 19px;
    display: flex;
    align-items: center;
    justify-self: center;
    box-shadow: 0 1px 1px 0 rgb(0 0 0 / 2%);
    background: #fff;
    text-transform: capitalize;
    font-size: 18px;
    margin-left: 12.5px;
    font-weight: 400;
    color: #333;
    cursor: pointer;
`;

export const CardName = styled.div`
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    font-size: 1.6rem;
    font-weight: 500;
    word-wrap: break-word;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #222;
    line-height: 2rem;
`;

export const CardLocation = styled.div`
    margin-top: 0.625rem;
    color: rgba(0, 0, 0, 0.65);
    font-size: 1.5rem;
    line-height: 1.75rem;
    min-height: 1em;
    text-align: right;
    font-weight: 400;
`;
