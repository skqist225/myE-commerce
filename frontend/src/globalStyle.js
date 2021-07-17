import styled, { createGlobalStyle } from 'styled-components';
import { Link } from 'react-router-dom';

const GlobalStyle = createGlobalStyle`
    html {
        font-size: 50%;
        line-height: 1.6rem;
    }

    body {
        margin: 0;
        padding: 0;
        font-family: 'Open Sans', sans-serif;
    }

    *,*::before, *::after {
        box-sizing: border-box;
    }

    ul {
        padding-left: 0;
    }

    a {
        text-decoration: none;
    }
`;

export const colorVariables = {
    textColor: '#fff',
    primaryColor: '#ee4d2d',
    blackColorInWhiteBg: 'rgba(0,0,0,.8)',
};

export const ContentContainer = styled.div`
    max-width: ${props => props.maxwidth || '1200px'};
    width: 100%;
    margin: 0 auto;
    padding: ${props => props.padding || '0 0'};
    height: ${props => props.height || '100%'};
`;

export const Anchor = styled(Link)`
    color: ${props => props.color};
    font-weight: ${props => props.fontWeight};
    font-size: ${props => props.fontSize};
`;

export const GridLayout = styled.div`
    display: grid;
    grid-template-columns: ${props => props.templateColumns};
    align-items: center;
    padding: ${props => props.padding};
    gap: ${props => props.gap};
`;

export const StandardSelfFlex = styled.div`
    width: ${props => props.width};
    height: ${props => props.height};
    display: flex;
    align-items: center;
    justify-content: ${props => props.justifyContent || 'center'};
`;

export const Flex = styled.div`
    display: flex;
    flex-direction: ${props => props.flexDirection || 'row'};
    align-items: ${props => props.alignItems || 'center'};
    justify-content: ${props => props.justifyContent};
    width: ${props => props.width};
    height: ${props => props.height};
    padding: ${props => props.padding};
`;

export const PageBodyContainer = styled.main`
    position: absolute;
    top: ${props => props.top || '15rem'};
    left: 0;
    width: 100%;
    padding-top: ${props => props.pt || '4rem'};
    background-color: ${props => props.backgroundColor};
`;

export const MenuList = styled.ul`
    list-style-type: none;
    display: flex;

    align-items: center;
    padding-left: 0;
`;

export const MenuItem = styled.li`
    display: inline-block;

    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    text-align: center;
    width: ${props => props.width};
    font-size: ${props => props.fontSize};
    padding: ${props => props.padding};
    color: ${props => props.color};
`;

export const Button = styled.button`
    width: ${props => props.width};
    height: ${props => props.height};
    padding: ${props => props.padding};
    color: ${props => props.color};
    background-color: ${props => props.backgroundColor};
    font-size: ${props => props.fontSize};
    font-weight: ${props => props.fontWeight};
    text-transform: ${props => props.textTransform || 'none'};
    border-radius: ${props => props.borderRadius || '2px'};
    border: ${props => props.border || 'none'};

    display: flex;
    align-items: center;
    justify-content: center;
    outline: none;
    cursor: pointer;
`;

export const Image = styled.img`
    width: ${props => props.width};
    height: ${props => props.height};
    object-fit: ${props => props.objectFit};
    border-radius: ${props => props.borderRadius || '0'};
`;

export const WhiteBgWrapper = styled.div`
    width: 100%;
    height: 100%;
    background-color: #fff;
    padding: ${props => props.padding};
    margin-top: ${props => props.mt};
`;

export default GlobalStyle;
