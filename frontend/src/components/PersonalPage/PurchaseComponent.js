import styled from 'styled-components';
import { Flex, MenuList, Button } from '../../globalStyle';

export const PurchaseContainer = styled.section`
    flex: 3;
`;

export const OrderTypeSelection = styled(MenuList)`
    width: 100%;
    justify-content: space-between;
    background-color: #fff;
`;

export const OrderBox = styled.div`
    padding: 2.4rem 2.4rem 2.4rem;
    background-color: #fff;
    margin-top: 1.2rem;
    box-shadow: 0 1px 1px 0 rgb(0 0 0 / 5%);
    border-radius: 0.125rem;
`;

export const OrderHeader = styled(Flex)`
    width: 100%;
    height: 6.2rem;
`;

export const ViewShop = styled(Button)`
    color: #555;
    background-color: #fff;
    font-size: 12px;
    padding: 4px 8px;
    border: 1px solid rgba(0, 0, 0, 0.09);
    text-transform: capitalize;

    opacity: 0.9;

    &:hover {
        opacity: 1;
    }
`;

export const ChatWithShop = styled(ViewShop)`
    background-color: #ee4d2d;
    border-color: #cd3011;
    color: #fff;
    border: none;

    margin-right: 1rem;
`;

export const OrderFooter = styled.div`
    & div.totalPriceTitle {
        margin: 0 10px 0 0;
        font-size: 14px;
        line-height: 20px;
        color: rgba(0, 0, 0, 0.8);
    }

    & span.totalPrice {
        color: #ee4d2d;
        font-size: 24px;
        line-height: 30px;
    }

    & span.totalPrice:before {
        content: 'đ';
    }
`;

export const OrderFooterButton = styled(Button)`
    min-width: 150px;
    min-height: 40px;
    background-color: #fff;
    color: #555;
    border: 1px solid rgba(0, 0, 0, 0.09);
    padding: 8px 2rem;
    font-size: 1.4rem;
    margin-left: 1.5rem;

    &.diffBg {
        background-color: #ee4d2d;
        color: #fff;
    }
`;
