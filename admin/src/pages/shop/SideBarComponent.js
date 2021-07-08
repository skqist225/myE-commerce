import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div`
    background-color: #fff;
    position: fixed;
    top: 56px;
    left: 0;
    height: calc(100vh - 56px);
    overflow-y: hidden;
    overflow-x: hidden;
    width: 220px;
    z-index: 99;
`;

export const SubContainer = styled.div`
    padding: 16px 16px 0;
`;

export const AccessMenuExpend = styled.div`
    display: flex;
    align-items: center;
`;

export const MenuExpend = styled.div`
    padding-left: 24px;
    display: none;
    transition: display 0.2s ease;

    &.open {
        display: block;
    }
`;

export const QuickMenuContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin: 40px 0;

    &:first-child {
        margin: 0 0 40px;
    }
`;
export const Wrapper = styled.div``;

export const TransporterIcon = styled.img.attrs(props => ({
    src: props.src,
}))`
    width: 16px;
    height: 16px;
`;

export const MenuTitle = styled.span`
    font-size: 14px;
    font-weight: 500;
    line-height: 18px;
    max-width: 140px;
    color: #999;
    justify-self: flex-start;
    margin-left: 8px;
    text-transform: capitalize;
`;
export const MenuList = styled.ul`
    list-style: none;
    transform: translateX(-160px);
    opacity: 0;
    transition: all 0.2s ease;

    &.open {
        opacity: 1;
        transform: translateX(0);
    }
`;

export const ItemLink = styled(Link)`
    text-decoration: none;
    color: #333;
    font-size: 13px;
    font-weight: 400;
    text-transform: capitalize;
`;

export const MenuItem = styled.li`
    padding: 5px 0;

    &.active {
        color: #ee4d2d;
    }

    &:hover ${ItemLink} {
        color: #e84f20;
    }

    ${props =>
        props.isNew
            ? ` &:after {
        content: 'New';
        width: 29px;
        height: 16px;
        color: #fff;
        font-size: 10px;
        line-height: 16px;
        padding: 1px 3px;
        margin-left: 5px;
        background-image: -webkit-gradient(
            linear,
            right top,
            left top,
            color-stop(9%, #fe9373),
            color-stop(91%, #ee4d2d)
        );
        background-image: linear-gradient(270deg, #fe9373 9%, #ee4d2d 91%);
        border-radius: 9px 2px 9px 9px;
    }`
            : ''}
`;

export const IconContainer = styled.div`
    margin-right: 16px;
    width: 16px;
    height: 24px;
    position: relative;
    cursor: pointer;
`;
