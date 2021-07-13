import styled from 'styled-components';
import { Button, Flex, Image, GridLayout } from '../../globalStyle';

export const BackToHomeContainer = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    margin-bottom: 2.5rem;
    color: rgba(0, 0, 0, 0.8);
    text-transform: uppercase;
    font-size: 1.8rem;
    line-height: 2rem;

    &:hover {
        color: #d0011b;
    }

    &:hover svg {
        fill: #d0011b;
    }
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

export const FilterLabel = styled.div`
    color: #555;
    font-weight: 400;
    font-size: 1.6rem;

    @media (min-width: 991px) {
        font-size: 1.8rem;
    }
`;

export const SortTitle = styled.span`
    font-size: 1.6rem;
    font-weight: 400;
    margin: 0 4px;

    @media (min-width: 991px) {
        font-size: 1.8rem;
    }
`;

export const ModalTitle = styled(SortTitle)`
    margin: 0;
`;

export const SortByPriceModal = styled.div`
    width: 18rem;
    background: #fff;
    position: absolute;
    top: 106%;
    left: 0;
    display: none;

    & span {
    }

    @media (min-width: 991px) {
        width: 25rem;
    }
`;

export const SortByPrice = styled.div.attrs(() => ({
    className: 'shopProductsDropDownOption',
}))`
    width: 18rem;
    height: 43px;
    display: flex;
    position: relative;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    background: #fff;
    margin-left: 12.5px;

    &:hover ${SortByPriceModal} {
        display: block;
        z-index: 2;
    }

    @media (min-width: 991px) {
        width: 25rem;
    }
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
    padding: 0 1.5rem;
    display: flex;
    align-items: center;
    justify-self: center;
    box-shadow: 0 1px 1px 0 rgb(0 0 0 / 2%);
    background: #fff;
    text-transform: capitalize;
    font-size: 1.6rem;
    margin-left: 12.5px;
    font-weight: 400;
    color: #333;
    cursor: pointer;

    @media (min-width: 991px) {
        font-size: 1.8rem;
        padding: 0 1.9rem;
    }
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

export const ShopName = styled.div`
    text-align: center;
    margin-top: 6.25px;
    font-size: 18px;
    z-index: 1;
    color: #fff;
    position: absolute;
    top: 58%;
    width: 100%;
`;

export const ShopLogo = styled(Image).attrs(() => ({
    width: '10rem',
    height: '10rem',
    borderRadius: '50%',
}))`
    border: 3px solid #000;
    position: absolute;
    top: 75px;
    left: 50%;
    transform: translate(-50%, -50%);
`;

export const ShopeeMallLogo = styled(Image).attrs(() => ({
    width: '6.4rem',
    height: '1.4rem',
}))`
    position: absolute;
    top: 51%;
    left: 32%;
`;

export const ListItem = styled.li.attrs(() => ({
    className: 'shopProductsItemFilter',
}))`
    display: block;
    padding: 12.5px 0;
    font-size: 16px;
    border-top: 1px solid rgba(0, 0, 0, 0.09);
    cursor: pointer;

    &:first-child {
        border-top: none;
    }

    &:hover {
        text-decoration: underline;
        color: #ee4d2d;
    }
`;

export const FilterTitle = styled.div`
    color: rgba(0, 0, 0, 0.8);
    text-transform: uppercase;
    font-size: 1.8rem;
    padding: 1.75rem 0 2.25rem;
`;

export const FlexWithPadding = styled(Flex).attrs(() => ({
    alignItems: 'center',
}))`
    padding: 1rem 0;

    &:first-child {
        padding-top: 0;
    }
`;

export const InputWrapper = styled(Flex)`
    margin-top: 0.125rem;
    margin-right: 1.25rem;
`;

export const CheckboxInput = styled.input.attrs(() => ({
    type: 'checkbox',
}))`
    margin-top: 0.225rem;
    width: 1.5rem;
    height: 1.5rem;

    &:checked {
        background-color: #fff;
        color: orange;
    }

    &:hover {
        background-color: #ccc;
    }
`;

export const TextField = styled.input.attrs(() => ({
    type: 'text',
}))`
    width: 5.3rem;
    height: 3.8rem;

    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 4px;
    border: 1px solid #888;
    font-size: 15px;
    border-radius: 3px;
`;

export const TFWrapper = styled.div``;

export const Label = styled.label`
    font-weight: 400;
    font-size: 1.8rem;
    color: rgba(0, 0, 0, 0.54);
`;

export const LabelWrapper = styled.div`
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 2rem;
    max-height: 6rem;
    word-wrap: break-word;
`;

export const GridLayoutExtend = styled(GridLayout)`
    @media (min-width: 991px) {
        grid-template-columns: repeat(5, 1fr);
    }
`;
