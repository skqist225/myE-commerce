import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';
import { colorVariables } from '../../globalStyle';

export const ParentContainer = styled.div`
    width: 100%;
    height: 15rem;
    position: fixed;
    top: 0;
    left: 0;
    background: ${props => props.bgColor || 'linear-gradient(-180deg, #f53d2d, #f63)'};
    z-index: 99;
`;

export const HeaderLine = styled.div`
    display: flex;
    align-items: center;

    ${props => props.getBgInCartPage === true && ' background-color: #fff'};

    &.headerLineOne {
        justify-content: space-between;
    }

    &:last-child {
        height: 7.3rem;
        margin-top: 2rem;
        align-items: flex-start;
    }
`;

export const ShopeeCartWrapper = styled.div`
    @media (max-width: 991px) {
        display: none;
    }
`;

export const Seperator = styled.div`
    width: 1px;
    height: calc(6.1rem / 2);
    background-color: #e36776;
    position: absolute;
    left: 7.2rem;
    top: -2.2rem;
`;

export const SeconLogoContainer = styled.div`
    display: flex;
    align-items: center;
    width: 32rem;

    @media (min-width: 991px) {
        justify-content: space-between;
    }
`;

var fadeIn = keyframes`
    from {
        opacity: 0;
    } to {
        opacity: 1;
    }
`;

export const UserMenuModal = styled.div.attrs(props => ({
    children: props.render,
}))`
    position: absolute;
    top: 2.75rem;
    right: 0;
    background-color: #fff;
    box-shadow: 0 1.25rem 6.25rem 0 rgba(0 0 0 / 20%);
    width: 19rem;
    height: 15.5rem;
    z-index: 3;
    overflow: hidden;
    border-radius: 2px;
    border-top: 0;
    display: none;
    animation: ${fadeIn} 0.2s ease;
`;

export const Bridge = styled.div`
    width: 45%;
    height: 1rem;
    background-color: transparent;
    position: absolute;
    top: 2rem;
    left: 55%;
`;

export const ListItem = styled.li`
    display: inline-block;
    padding: 0 0.8375rem;

    &.userItem {
        cursor: pointer;
    }

    &.userItem:hover ${UserMenuModal} {
        display: block;
    }
`;

export const HeaderList = styled.ul`
    display: flex;
    align-items: center;
    padding-left: 0;

    &.headerListLeft ${ListItem} {
        border-right: 2px solid hsla(0, 0%, 100%, 0.22);
    }

    &.headerListLeft ${ListItem}:last-child {
        display: inline-flex;
        margin-left: 0.3rem;
        border-right: none;
        font-size: 1.625rem;
        font-weight: 400;
        color: ${colorVariables.textColor};
    }

    &.headerListRight ${ListItem} {
        display: inline-flex;
        align-items: center;
    }

    &.headerListRight ${ListItem}:last-child {
        font-size: 1.625rem;
        font-weight: 500;
        color: ${colorVariables.textColor};
    }

    &.headerListRight {
        position: relative;
        justify-content: space-between;
    }
`;

export const ItemLink = styled(Link)`
    text-decoration: none;
    font-size: ${props => props.fontSize || '1.625rem'};
    font-weight: ${props => props.fontWeight || '400'};
    color: ${colorVariables.textColor};
    cursor: pointer;
    display: inline-block;
    margin-left: ${props => (props.ml ? '1.3rem' : '0')};
    padding: ${props => (props.needpaddingleft ? props.needpaddingleft : '0')};
`;

export const LogoWrapper = styled.div.attrs(props => ({
    children: props.render,
}))`
    width: 16.2rem;
    height: fit-content;
    margin-right: 5rem;
`;

export const MenuList = styled.ul`
    list-style: none;
    padding-left: 0;
`;

export const MenuLink = styled(Link)`
    text-decoration: none;
    color: rgba(0, 0, 0, 0.8);
    text-transform: capitalize;
    font-weight: 500;
    font-size: 1.8rem;
`;

export const MenuItem = styled.li`
    padding-left: 1.875rem;
    height: 5rem;
    display: flex;
    align-items: center;

    &:hover ${MenuLink} {
        color: #00bfa5;
    }
`;

export const HeaderSearchWrapper = styled.div`
    max-width: ${props => (props.secondLogo ? '65rem' : '84rem')};
    width: 100%;
    display: flex;
    flex-direction: column;
    height: 100%;
`;

export const HeaderForm = styled.form`
    position: relative;
    flex: 1;
    padding: 5px;
`;

export const HeaderSearchInput = styled.input.attrs(props => ({
    placeholder: props.secondLogo ? 'Tìm trong Shop này' : 'Tổng quà 3 tỷ - voucher 150k',
}))`
    width: 100%;
    height: 5rem;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    box-shadow: 0 1px 1px 0 rgb(0 0 0 / 9%);
    border-radius: 2px;
    border: none;
    padding-left: 1.25rem;
    font-size: 1.8rem;
    background-color: -internal-light-dark(rgb(255, 255, 255), rgb(59, 59, 59));
    color: #222;
    outline: none;

    &:placeholder {
        color: #f5f5f5;
    }
`;
export const HeaderSearchButton = styled.button`
    position: absolute;
    top: 3px;
    right: 3px;
    height: 34px;
    width: 60px;
    border: none;
    z-index: 1;
    outline: none;
    background: ${props => props.bgColor || '#fb5533'};
    padding: 0 15px;
    min-width: 60px;
    max-width: 190px;
    box-shadow: 0 1px 1px 0 rgb(0 0 0 / 9%);
    border-radius: 2px;
`;

export const HeaderBelowSearchProductName = styled.div`
    display: flex;
    align-items: center;
    margin-top: 5px;
`;

// export const Span = styled.span`
//     display: inline-block;
//     color: ${colorVariables.textColor};
//     font-size: 1.5rem;
//     font-weight: 300;
// `;

export const CartWrapper = styled.div.attrs(props => ({ children: props.render }))`
    width: 12.8rem;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    position: relative;
`;

export const Avatar = styled.img`
    border-radius: 50%;
    width: 25px;
    height: 25px;
    object-fit: cover;
`;

export const FacebookIcon = styled.div`
    width: 16px;
    height: 16px;
    background: url('${props => props.src}');
    background-size: 487.5% 293.75%;
    background-position: 8.064516129032258% 16.129032258064516%;
    margin-right: 10px;
`;

export const InstagramIcon = styled(FacebookIcon)`
    background-position: 58.064516129032256% 16.129032258064516%;
`;

export const Badge = styled.span.attrs(props => ({ children: props.innertext }))`
    position: absolute;
    width: 3.1rem;
    height: 2.5rem;
    background-color: #fff;
    border-radius: 5.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.625rem;
    font-size: 1.8rem;
    font-weight: 400;
    // color: ${props => props.color};
    color: #f6422d;
    bottom: 4rem;
    right: 3.5rem;
`;
