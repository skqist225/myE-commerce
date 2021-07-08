import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';

export const Button = styled.button.attrs(props => ({
    type: props.submit || 'button',
    children: props.render,
}))`
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${props => props.color || '#fff'};
    background-color: ${props => props.backgroundColor || ' #ee4d2d'};
    border-color: ${props => props.borderColor || '#ee4d2d'};
    height: 40px;
    min-width: 80px;
    padding: 0 16px;
    cursor: pointer;
    border-radius: 4px;
    outline: none;
    border: 1px solid;

    & span {
        font-size: 14px;
        white-space: nowrap;
        line-height: 1;
        vertical-align: middle;
    }
`;

export const HeaderTitle = styled(Link)`
    display: inline-block;
    font-size: 18px;
    color: #999;
    text-decoration: none;
    cursor: pointer;
`;

export const IconWrapper = styled.span`
    display: inline-flex;
    margin: ${props => (props.noMargin ? '0' : '0 12px')};
    width: ${props => (props.width ? props.width : '16px')};
    height: ${props => (props.height ? props.height : '16px')};
`;

export const OverlayIconWrapper = styled(IconWrapper)`
    position: absolute;
    top: 50%;
    left: 50%;
    bottom: 0;
    right: 0;
    transform: translate(-50%, -50%);
    display: none;

    &.active {
        display: block;
    }
`;

export const UserImage = styled.img`
    border-radius: 50%;
    width: 32px;
    height: 32px;
`;

export const UserInfo = styled.div`
    display: flex;
    align-items: center;
`;

export const IconContainer = styled(UserInfo)`
    height: 100%;
    justify-content: space-evenly;
    flex: 1;
`;

export const Username = styled.p.attrs(props => ({
    children: props.name,
}))`
    font-size: 14px;
    color: #333;
    margin-left: 10px;
`;

export const ButtonIconWrapper = styled(IconWrapper)`
    ${props => (props.end ? 'margin-left: 6px' : 'margin-right: 10px')}
`;

export const MainContainer = styled.div`
    max-height: 56px;
    min-height: 56px;
    width: 100vw;
    box-shadow: 0 1px 4px 0 rgb(74 74 78 / 12%);
    position: fixed;
    top: 0;
    left: 0;
    background-color: #fff;
    z-index: 2250;
`;

export const SubWrapper = styled.div`
    display: flex;
    align-items: center;
`;

export const SubContainer = styled(SubWrapper)`
    padding: 12px 15px;
`;

export const Wrapper = styled.div`
    display: flex;
    align-items: center;

    &:nth-child(2) {
        justify-content: space-between;
        flex: 1;
        margin: 0 16px;
        padding-right: 5px;
    }

    &:nth-child(3) {
        width: 220px;
        position: relative;
    }

    &.thirdWrapper::before {
        content: '';
        top: 1px;
        left: 0;
        position: absolute;
        width: 1px;
        height: 32px;
        background-color: #e8e8e8;
    }
`;

export const CustomShopName = styled.div`
    padding: 0 16px;
    border: 1px solid #dcdce0;
    border-radius: 16px;
    line-height: 32px;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    color: #333;
    font-size: 12px;
`;
