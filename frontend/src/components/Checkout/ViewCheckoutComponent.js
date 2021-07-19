import styled from 'styled-components';
import { Button, Flex, StandardSelfFlex } from '../../globalStyle';

export const ShippingAddress = styled.div`
    width: 100%;
    height: 13rem;
    padding: 2.2rem;
    background-color: #fff;
`;

export const UserInfo = styled.div`
    font-weight: 600;
    color: #222;
    font-size: 1.8rem;
    width: 29%;
    line-height: 2.25rem;
`;

export const Span = styled.span`
    font-size: 2.25rem;
    color: #ee4d2d;
    text-transform: capitalize;
    flex: 1 1 auto;
    line-height: 2.5rem;
`;

export const DefaultText = styled.div`
    font-size: 1.75rem;
    font-weight: 400;
    color: #929292;
    margin-left: 2rem;
    text-transform: capitalize;
    width: 10rem;
`;

export const DecorationLine = styled.div`
    height: 3px;
    width: 100%;
    background-position-x: -30px;
    background-size: 116px 3px;
    background-image: repeating-linear-gradient(
        45deg,
        #6fa6d6,
        #6fa6d6 33px,
        transparent 0,
        transparent 41px,
        #f18d9b 0,
        #f18d9b 74px,
        transparent 0,
        transparent 82px
    );
`;

export const InfoTitle = styled.div`
    font-size: 1.4rem;
    color: #bbb;
    width: 25%;
    text-align: right;
`;

export const ProductInfo = styled.div`
    width: 100%;
    background-color: #fff;
    padding: 2.4rem 3rem;
    margin-top: 1.25rem;

    &:last-child {
        margin-bottom: 2rem;
    }
`;

export const ShopName = styled.div`
    color: rgba(0, 0, 0, 0.8);
    font-size: 1.75rem;
    margin-left: 0.5rem;
`;

export const ProductImage = styled.img`
    width: 4rem;
    height: 4rem;
`;
export const ProductName = styled.div`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 1.4rem;
`;
export const AfterDiscountPrice = styled.div`
    font-size: 1.4rem;
    text-align: right;
    width: 25%;
`;
export const Quantity = styled(AfterDiscountPrice)``;
export const FinalPrice = styled(Quantity)``;

export const VoucherContainer = styled(Flex)`
    height: 6rem;
    padding: 1.8rem 3rem;
    background-color: #fff;

    border-bottom: 1px dashed rgba(0, 0, 0, 0.09);
    border-top: 1px dashed rgba(0, 0, 0, 0.09);
`;

export const TransporterContainer = styled.div`
    background-color: #fff;
    height: 7.2rem;
    display: flex;
`;

export const ChangeButton = styled(Button)`
    background-color: transparent;
    font-size: 1.8rem;
    color: #0055aa;
`;

export const GridItem = styled.div`
    font-size: 1.8rem;
    &:first-child {
        grid-column-start: 1;
        grid-column-end: 2;
        color: #00bfa5;
        padding-left: 2rem;
    }

    &:nth-child(2) {
        grid-column-start: 2;
        grid-column-end: 3;
    }

    &.changeButton {
        grid-column-start: 3;
        grid-column-end: 4;
    }

    &.lineTwo {
        grid-column-start: 2;
        grid-column-end: 5;

        grid-row-start: 3;
        grid-row-end: 3;

        margin-top: 5px;
        font-size: 12px;
        color: #888;
    }

    &:last-child {
        padding-right: 3rem;
        font-size: 1.4rem;
        grid-column-start: 4;
        grid-column-end: 5;
        text-align: right;
    }
`;

export const SelectAddress = styled.div`
    width: 100%;
    height: 28.5rem;
    background-color: #fff;
    padding: 2.8rem 2.4rem 2.4rem;
    display: flex;
    flex-direction: column;
`;

export const AddAddressButton = styled(Button)`
    color: #555;
    text-transform: capitalize;
    box-shadow: 0 1px 1px 0 rgb(0 0 0 / 3%);
    border: 1px solid rgba(0, 0, 0, 0.09);
    background: #fff;
    padding: 0.8rem 1rem;
    margin-right: 1.5rem;
`;

export const SettingAddressButton = styled(AddAddressButton)`
    margin-right: 0;
`;

export const Coin = styled.div`
    font-weight: 500;
    -webkit-box-flex: 0;
    -webkit-flex: 0 1 auto;
    -moz-box-flex: 0;
    -ms-flex: 0 1 auto;
    flex: 0 1 auto;
    color: #929292;
    margin-left: 17px;
    font-size: 1.75rem;
`;

export const SelectPayment = styled(Flex)`
    width: 100%;
    background-color: #fff;
    border-radius: 3px;
    box-shadow: 0 1px 0 0 rgb(0 0 0 / 5%);
    margin-bottom: 1.2rem;
`;

export const GI = styled(StandardSelfFlex)`
    font-size: 14px;
    color: rgba(0, 0, 0, 0.54);

    &:first-child {
        grid-column-start: 1;
        grid-column-end: 2;
    }

    &:nth-child(2) {
        grid-column-start: 2;
        grid-column-end: 3;
    }

    &:nth-child(3) {
        grid-column-start: 1;
        grid-column-end: 2;

        grid-row-start: 2;
        grid-row-end: 3;
    }
    &:nth-child(4) {
        grid-column-start: 2;
        grid-column-end: 3;

        grid-row-start: 2;
        grid-row-end: 3;
    }

    &:nth-child(5) {
        grid-column-start: 1;
        grid-column-end: 2;

        grid-row-start: 3;
        grid-row-end: 4;
    }

    &:last-child {
        grid-column-start: 2;
        grid-column-end: 3;

        grid-row-start: 3;
        grid-row-end: 4;

        color: #ee4d2d;
        font-size: 2.5rem;
    }

    &:nth-child(even) {
        justify-content: flex-end;
        padding-right: 2.5rem;
    }

    &:nth-child(even):before {
        content: 'đ';
        text-direction: underline;
    }

    &:nth-child(odd) {
        justify-content: flex-start;
    }
`;
