import styled from 'styled-components';
import { Flex, MenuItem, MenuList, Button } from '../../globalStyle';

export const LeftMenuContainer = styled.section`
    flex: 1;
    max-width: 20%;
`;

export const FlexAlignStart = styled(Flex)`
    align-items: flex-start;
    width: 100%;
    margin-bottom: 1.875rem;
`;

export const MenuIcon = styled.img`
    width: 25px;
    height: 25px;
`;

export const MenuTitle = styled.div`
    cursor: pointer;
    font-size: 1.8rem;
    line-height: 2.5rem;
    padding-left: 1.5rem;

    &:hover {
        color: #ee4d2d;
    }
`;

export const DetailFunc = styled(MenuItem)`
    font-size: 1.75rem;
    color: rgba(0, 0, 0, 0.65);
    margin-bottom: 1.875rem;
    cursor: pointer;
    line-height: 2.5rem;
    display: block;
    text-align: left;

    & a {
        color: #565656;
    }

    &:last-child {
        margin-bottom: 0;
    }

    &:hover a {
        color: #ee4d2d;
    }
`;

export const MenuDetail = styled(MenuList).attrs(() => ({
    className: 'menuDetail',
}))`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    padding-left: 1rem;

    & ${DetailFunc}:hover {
        color: #ee4d2d;
    }
`;

export const Username = styled.div`
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    min-height: 2rem;
    font-weight: 600;
    margin-bottom: 5px;
    color: #333;
    font-size: 1.75rem;
    line-height: 1.8rem;
`;
