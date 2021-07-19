import styled from 'styled-components';
import { Flex, MenuItem, MenuList, Button } from '../../globalStyle';

export const QuickMenuTitle = styled.div``;

export const UserInfoSection = styled.section`
    padding: 0 3.75rem 1.25rem;
    background: #fff;
    box-shadow: 0 1px 2px 0 rgb(0 0 0 / 13%);
    margin-left: 1.6875rem;
    border-radius: 2px;
    flex: 3;
    height: 80rem;
`;

export const Label = styled.label`
    display: inline-block;
    font-size: 18px;
    color: rgba(85, 85, 85, 0.8);
    text-transform: capitalize;
    margin-right: 20px;
    max-width: 80px;
    width: 100%;
    text-align: right;
`;

export const UserInfo = styled.div`
    font-size: 1.8rem;
    color: #333;
`;

export const RadioLabel = styled.label`
    font-size: 14px;
    color: #000;
    margin-left: 5px;
`;

export const RadioInput = styled.input.attrs(() => ({
    type: 'radio',
}))`
    border-color: #ee4d2d;
    width: 18px;
    height: 18px;
    border-radius: 100%;
    border: 2px solid rgba(0, 0, 0, 0.26);
`;

export const TextInput = styled.input.attrs(() => ({
    type: 'text',
}))`
    font-size: 18px;
    border: 1px solid rgba(0, 0, 0, 0.14);
    box-shadow: inset 0 2px 0 0 rgb(0 0 0 / 2%);
    color: #222;
    height: 40px;
    padding: 10px;
    background-color: #fff;
    position: relative;
    border-radius: 2px;

    &:hover {
        box-shadow: inset 0 2px 3px 0 rgb(0 0 0 / 5%);
    }
`;

export const BirthdaySelect = styled.select`
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    border: 1px solid rgba(0, 0, 0, 0.09);
    border-radius: 2px;
    height: 5rem;
    background: #fff;
    width: 100%;
    outline: none;
    padding: 5px;
    margin-right: 10px;
    font-size: 18px;
    font-weight: 400;
    color: #565656;

    &:hover {
        border: 1px solid #ee4d2d;
    }
`;

export const UpdateInfoButton = styled(Button)`
    color: #fff;
    background: #ee4d2d;
    height: 40px;
    padding: 0 20px;
    // min-width: 70px;
    // max-width: 220px;
    width: 7rem;
`;

export const UpdateForm = styled.form`
    display: flex;
    max-width: 500px;
    height: 560px;
    width: 100%;
    flex-direction: column;
    justify-content: space-between;
`;

export const InfoHeader = styled.section`
    padding: 22.5px;
    border-bottom: 1px solid #efefef;

    & div {
        margin: 0;
        font-size: 2.25rem;
        font-weight: 500;
        line-height: 2.4rem;
        text-transform: capitalize;
        color: #333;
    }

    & div.lineTwo {
        margin-top: 0.5rem;
        font-size: 1.8rem;
        line-height: 2rem;
        color: #555;
    }
`;

export const UpdateImage = styled(Flex)`
    flex-direction: column;
    justify-content: center;
    flex: 1;
    overflow: hidden;
    border-left: 1px solid #efefef;
    padding-left: 1rem;

    & div:last-child {
        margin: 1rem 0;
    }

    & div.lineOne {
        margin-top: 1rem;
        width: 100%;
    }

    & div.lineOne input[type='file'] {
        opacity: 0.8;
        width: 36%;
    }

    & div.lineOne input[type='file']:hover {
        opacity: 1;
    }

    & div {
        text-align: center;
    }

    @media (max-width: 991px) {
        & img {
            width: 10rem;
            height: 10rem;
        }

        & div.lineOne input[type='file'] {
            width: 41%;
        }
    }
`;

export const InfoSection = styled.section`
    flex: 2;
    pading-right: 5.25rem;

    @media (min-width: 991px) {
        padding-right: 6.25rem;
    }
`;
