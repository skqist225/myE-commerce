import styled from 'styled-components';
import { Button } from '../../globalStyle';

export const ProductRatingSection = styled.section`
    width: 100%;
    height: 100%;
`;

export const PaddingLayout = styled.div`
    width: 100%;
    height: 100%;
    padding: 3.125rem;
`;

export const Line = styled.div`
    height: 1px;
    width: 100%;
    background-color: red;
`;

export const RatingBox = styled.div`
    padding: 3.125rem;
    width: 100%;
    height: 23.4rem;
    background-color: #fffbf8;
    border-radius: 2px;
    border: 1px solid ${props => props.bgColor};
    display: flex;
    margin-bottom: 2rem;
`;

export const RatingWrapper = styled.div`
    color: ${props => props.color};
    font-weight: 500;
    margin-bottom: 1.5rem;

    & span.first {
        font-size: 3.75rem;
    }

    & span.second {
        font-size: 2.25rem;
    }
`;

export const ReviewImg = styled.img`
    width: 9rem;
    height: 9rem;
    object-fit: cover;
    display: inline-block;
    margin-right: 1.25rem;
    margin-bottom: 1.25rem;
`;

export const StarWrapper = styled.div``;

export const ApplyHoverEffect = styled.div`
    & svg {
        fill: rgba(0, 0, 0, 0.2);
    }

    &:hover svg {
        fill: ${props => props.color};
    }

    &.selected svg {
        fill: ${props => props.color};
    }

    &.selected span {
        color: ${props => props.color} !important;
    }

    &:hover span {
        color: ${props => props.color} !important;
    }
`;

export const RatingButton = styled(Button).attrs(props => ({
    className: 'ratingButton',
    color: 'rgba(0,0,0,.8)',
    backgroundColor: '#fff',
    border: '1px solid rgba(0,0,0,.09)',
    height: '4rem',
    fontSize: '1.8rem',
    padding: '0 1.25rem',
    borderRadius: '2px',
}))`
    display: inline-block;
    text-transform: capitalize;
    margin: 0.625rem 1rem 0.625rem;

    &.active {
        color: #d0011b;
        border: 1px solid #d0011b;
    }

    &:hover {
        color: #fff;
        background-color: #d0011b;
    }
`;

export const UserComment = styled.div`
    font-size: 1.8rem;
    color: rgba(0, 0, 0, 0.8);
    font-weight: 500;
    margin: 1.8rem 0;
`;

export const Username = styled.span`
    display: block;
    color: rgba(0, 0, 0, 0.87);
    font-size: 1.5rem;
`;

export const UserAvatar = styled.img`
    border-radius: 50%;
    width: 5rem;
    height: 5rem;
`;

export const ReviewTime = styled.div`
    margin-top: 1.5rem;
    font-size: 1.5rem;
    color: rgba(0, 0, 0, 0.54);
`;
