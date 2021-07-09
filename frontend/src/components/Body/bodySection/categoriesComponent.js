import styled from 'styled-components';

export const CategorySection = styled.section`
    width: 100%;
    height: 38rem;
    margin-top: 2.5rem;
    border-radius: 3px;
    overflow: hidden;
`;

export const WhiteBgWrapper = styled.div`
    width: 100%;
    height: 100%;
    background-color: #fff;
    padding: ${props => props.padding || '0'};
`;

export const Title = styled.div`
    padding: 0 2.5rem;
    height: 7.6rem;
    font-size: 2rem;
    color: rgba(0, 0, 0, 0.54);
    font-weight: 500;
    margin: 0;
    display: flex;
    align-items: center;
`;

export const CategoryContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(10, 1fr);
    align-items: center;
    column-gap: 0;
    row-gap: 0;
    overflow: hidden;
`;

export const CategoryBox = styled.div`
    height: 15rem;
    display: grid;
    place-items: center;
    border: 1px solid #f2f2f2;
`;

export const CategoryImage = styled.img`
    width: 8.3rem;
    height: 7.5rem;
    object-fit: cover;
`;

export const CategoryName = styled.div`
    color: rgba(0, 0, 0, 0.8);
    font-size: 1.625rem;
    font-weight: 500;
    text-decoration: none;
    line-height: 2.5rem;
    margin-bottom: 1.25rem;
    word-break: break-word;
    overflow: hidden;
    display: -webkit-box;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    height: 5rem;

    text-align: center;
`;
