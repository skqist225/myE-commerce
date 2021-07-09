import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Section = styled.section`
    padding-top: 3rem;
    margin-top: 0;
    background-color: #fff;
    box-shadow: 0 1px 1px 0 rgb(0 0 0 / 5%);
    border-radius: 0.125rem;
    overflow: hidden;
    width: 100%;
    height: 38.8rem;
`;

export const Anchor = styled(Link)`
    text-decoration: none;
`;

export const ImageStuffContainer = styled.article`
    width: 100%;
    height: 23.5rem;
    display: grid;
    grid-template-columns: 2fr 1fr;
    column-gap: 0.8rem;
    row-gap: 1rem;
`;

export const ServiceStuffContainer = styled.article`
    display: grid;
    grid-template-columns: repeat(10, 1fr);
    column-gap: 2rem;
    margin-bottom: 0.8rem;
    align-items: center;
    justify-content: space-evenly;
    margin-top: 1rem;
`;

export const ImageWrapper = styled.div`
    display: grid;
    place-items: center;
`;

export const Image = styled.img`
    height: calc(50% - 8px);
    width: 397px;
    border-radius: 2px;
    cursor: pointer;
`;

export const ServiceWrapper = styled.div`
    padding-top: 1.8rem;
    transition: all 0.1s ease;

    &:hover {
        transform: translateY(-4px);
    }
`;

export const ServiceImg = styled.img`
    width: 45px;
    height: 45px;
`;

export const ServiceTitle = styled.div.attrs(props => ({ children: props.title }))`
    display: -webkit-box;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    font-size: 1.625rem;
    line-height: 1.75rem;
    max-width: 150px;
    word-wrap: break-word;
    overflow: hidden;
    width: 100%;

    color: #222;
    letter-spacing: 0;
    height: 3.4rem;
    text-align: center;

    margin-top: 1rem;
`;
