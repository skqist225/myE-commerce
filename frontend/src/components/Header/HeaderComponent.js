import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { colorVariables } from '../../globalStyle';

export const ParentContainer = styled.div`
    width: 100%;
    height: 15rem;
    position: fixed;
    top: 0;
    left: 0;
    background: linear-gradient(-180deg, #f53d2d, #f63);
`;

export const HeaderLine = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    &:last-child {
        height: 7.3rem;
        margin-top: 2rem;
        align-items: flex-start;
    }
`;

export const ListItem = styled.li`
    display: inline-block;
    padding: 0 0.8375rem;
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
`;

export const ItemLink = styled(Link)`
    text-decoration: none;
    font-size: ${props => props.fontSize || '1.625rem'};
    font-weight: ${props => props.fontWeight || '400'};
    color: ${colorVariables.textColor};
    cursor: pointer;
    display: inline-block;
    margin-left: ${props => (props.mL ? '1.3rem' : '0')};
    padding: ${props => (props.needPaddingLeft ? props.needPaddingLeft : '0')};
`;

export const LogoWrapper = styled.div.attrs(props => ({
    children: props.render,
}))`
    width: 14.6rem;
    height: 4.6rem;
`;
export const HeaderSearchWrapper = styled.div`
    max-width: 84rem;
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
    placeholder: 'Tổng quà 3 tỷ - voucher 150k ',
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
    color: #f5f5f5;
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
    background: #fb5533;
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
