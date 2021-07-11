import styled from 'styled-components';
import { Anchor } from '../Body/bodySection/serviceSectionComponent';
import { Link } from 'react-router-dom';

export const HeaderContainer = styled.div`
    width: 100%;
    min-height: 10rem;
    max-height: 10rem;
    position: fixed;
    top: 0;
    left: 0;
    background-color: #fff;
    z-index: 99;
`;

export const ContentContainer = styled.div`
    width: 100%;
    height: 100%;
    padding: 2rem 0;

    display: flex;
    align-items: center;
    justify-content: space-between;

    @media (min-width: 991px) {
        & {
            margin: 0 auto;
            max-width: calc(100% - 48rem);
        }
    }
`;

export const HeaderLeft = styled.div`
    display: flex;
    align-items: center;
`;

export const HeaderRight = styled.div``;

export const HeaderTitle = styled.div`
    color: #222;
    font-size: 3rem;
`;

export const AnchorExtend = styled(Anchor)`
    display: inline-block;
    color: #ee4d2d;
    font-size: 1.625rem;
    margin-right: 1.875rem;
    cursor: pointer;
`;

export const BodyContainer = styled.div`
    width: 100%;
    height: 75rem;
    background-color: rgb(238, 77, 45);
    position: absolute;
    top: 10.5rem;
    left: 0;
`;

export const RelativeWrapper = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
`;

export const ImageCover = styled.div`
    width: 100%;
    height: 100%;
    z-index: 1;
    background: url('${props => props.src}');
    background-repeat: no-repeat;
    background-size: cover;

    @media (max-width: 991px) {
        position: absolute;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        opacity: 0.7;
        transition: all 0.2s ease;
    }
`;

export const FormWrapper = styled.div`
    position: absolute;
    left: 50%;
    top: 50%;
    background-color: #fff;
    max-width: 50rem;
    width: 100%;
    height: 60rem;
    z-index: 2;
    transform: translate(-50%, -50%);
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    box-shadow: 0 3px 10px 0 rgb(0 0 0 / 14%);
    border-radius: 0.5rem;
    overflow: hidden;

    @media (min-width: 991px) {
        right: 0;
        transform: translateY(-50%);
    }
`;

export const LoginForm = styled.form`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 5rem 4rem;
`;

export const SpecialInputWrapper = styled.div`
    position: relative;
    width: 100%;
    display: flex;
    align-items: center;
`;

export const LoginInput = styled.input`
    flex: 1;
    max-height: 5rem;
    border: 1px solid #dbdbdb;
    border-radius: 0.25rem;
    padding: 1.5rem;
    margin-bottom: 4rem;
    color: #222;
    font-size: 1.8rem;
    line-height: normal;
    overflow: hidden;
    outline: none;

    &:focus {
        border: 1px solid #eee;
    }

    &::placeholder {
        color: #c1c1c1;
    }
`;

export const ButtonMask = styled.div``;

export const ButtonIcon = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
    background-color: #fff;
    position: absolute;
    right: 5px;
    top: 5px;
    width: 4.9rem;
    height: 4rem;
    cursor: pointer;
`;

export const SubmitButton = styled.button`
    color: #fff;
    background-color: #ee4d2d;
    box-shadow: 0 1px 1px rgb(0 0 0 / 9%);
    opacity: 0.7;
    flex: 1;
    max-height: 5rem;
    border: none;
    outline: none;
    border-radius: 0.25rem;
    padding: 0 1.25rem;
    font-size: 1.8rem;
    cursor: pointer;
    transition: opacity 0.1s ease;

    &:hover {
        opacity: 1;
    }
`;

export const LoginFormTitle = styled.div`
    color: #222;
    font-size: 2.5rem;
    font-weight: 500;
    margin-bottom: 4rem;
`;

export const OptionLine = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 1.25rem 0;
`;

export const LoginFeature = styled(Link)`
    text-decoration: none;
    color: #0055aa;
    font-size: 1.5rem;
`;

export const LineWrraper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 1.5rem;
    margin-top: 1.5rem;
    margin-bottom: 2.5rem;
`;

export const Line = styled.div`
    width: 17rem;
    height: 0.1rem;
    background-color: #ccc;
`;

export const AnotherLoginOption = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export const LoginOption = styled.div`
    width: 13rem;
    height: 5rem;
    margin: 0 0.5rem;
    display: flex;
    align-items: center;
    cursor: pointer;

    &:first-child {
        background-color: #4285f4;
        color: #fff;
    }

    &:nth-child(2) {
        background-color: #4285f4;
        color: #fff;
    }

    &:last-child {
        background-color: #000;
        color: #fff;
    }
`;

export const EmbededWrapper = styled.div`
    width: 4.5rem;
    height: 4.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const WhiteBgWrapperCustom = styled.div`
    width: 4.5rem;
    height: 4.5rem;
    background-color: #fff;
    margin-left: 2px;
    border-radius: 2px;
    margin-top: -1px;
`;

export const EmbededImage = styled.div`
    background: url('${props => props.src}');
    width: 2.75rem;
    height: 2.75rem;

    &.facebook {
        background-size: 372% 232%;
        background-position: 76.47058823529412% 15.151515151515152%;
    }

    &.google {
        background-size: 516.6666666666666% 322.22222222222223%;
        background-position: 100% 100%;
    }

    &.apple {
        background-size: 290.625% 181.25%;
        background-position: 8.19672131147541% 19.23076923076923%;
    }
`;

export const SignUpRedirectLine = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: fit-content;
    white-space: pre;
    padding-right: 0.25rem;
    color: rgba(0, 0, 0, 0.26);
    font-size: 1.8rem;
    margin-top: 4.5rem;
`;
