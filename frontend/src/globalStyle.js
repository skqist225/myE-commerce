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
    text-decoration: none;
    color: ${props => props.color};
    font-weight: ${props => props.fontWeight};
    font-size: ${props => props.fontSize};
`;

export const GridLayout = styled.div`
    display: grid;
    grid-template-columns: ${props => props.templatecolumn};
    align-items: center;
`;

export const PageBodyContainer = styled.main`
    position: absolute;
    top: 15rem;
    left: 0;
    width: 100%;
    padding-top: ${props => props.pt || '4rem'};
`;

export default GlobalStyle;
