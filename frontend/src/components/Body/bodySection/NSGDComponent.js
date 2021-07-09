import styled from 'styled-components';

export const MainContainer = styled.section`
    width: 100%;
    height: 52rem;
    position: relative;
`;

export const WhiteBgWrapper = styled.div`
    width: 100%;
    height: 100%;
    background-color: #fff;
    padding: 0 1.8rem;
    padding-bottom: 1.8rem;
    position: relative;
`;

export const MainDiv = styled.div`
    width: calc(100% - 3.4rem);
    background-color: #ffebd9;
    height: calc(100% - 11.8rem);
    position: relative;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    overflow: hidden;
    position: absolute;
    left: 1.7rem;
    top: 10rem;
    bottom: 1.8rem;
`;

export const Banner = styled.img.attrs(props => ({ src: props.src }))`
    position: absolute;
    left: 0;
    top: 0;
`;
