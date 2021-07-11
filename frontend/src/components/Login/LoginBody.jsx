import React, { useState, useEffect } from 'react';
import { ContentContainer } from '../../globalStyle';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
    BodyContainer,
    RelativeWrapper,
    ImageCover,
    FormWrapper,
    LoginForm,
    LoginInput,
    SubmitButton,
    LoginFormTitle,
    SpecialInputWrapper,
    ButtonIcon,
    OptionLine,
    LoginFeature,
    LoginOption,
    LineWrraper,
    Line,
    AnotherLoginOption,
    EmbededWrapper,
    EmbededImage,
    WhiteBgWrapperCustom,
    AnchorExtend,
    SignUpRedirectLine,
} from './LoginComponent';
import { ShowPasswordIcon, HiddenPasswordIcon } from './loginIcon';
import { userLogin } from '../../features/auth';
import { createImage } from '../../helpers';
import './login.css';

function LoginBody() {
    const dispatch = useDispatch();
    const history = useHistory();
    const [passwordType, setPasswordType] = useState('password');
    const { register, handleSubmit } = useForm({
        mode: 'onSubmit',
    });

    const { isAuthenticated } = useSelector(state => state.auth);

    const onSubmit = data => {
        dispatch(userLogin(data));
    };

    const handleChangePasswordType = e => {
        e.preventDefault();
        setPasswordType(prevState => (prevState === 'password' ? 'text' : 'password'));
    };

    useEffect(() => {
        if (isAuthenticated) {
            history.push('/');
        }
    }, [dispatch, isAuthenticated, history]);

    return (
        <BodyContainer>
            <ContentContainer maxwidth="130rem">
                <RelativeWrapper>
                    <ImageCover src={createImage('coverLoginPage.png')} />

                    <FormWrapper>
                        <LoginForm onSubmit={handleSubmit(onSubmit)}>
                            <LoginFormTitle>Đăng nhập </LoginFormTitle>
                            <LoginInput placeholder="Tên đăng nhập" {...register('username')} />
                            <SpecialInputWrapper>
                                <LoginInput
                                    placeholder="Mật khẩu"
                                    type={passwordType}
                                    {...register('password')}
                                />

                                <ButtonIcon
                                    onClick={handleChangePasswordType}
                                    type="button
                                "
                                >
                                    {passwordType === 'password' ? (
                                        <ShowPasswordIcon className="loginIcon" />
                                    ) : (
                                        <HiddenPasswordIcon className="loginIcon" />
                                    )}
                                </ButtonIcon>
                            </SpecialInputWrapper>
                            <SubmitButton type="submit">ĐĂNG NHẬP</SubmitButton>
                            <OptionLine>
                                <LoginFeature>Quên mật khẩu </LoginFeature>

                                <LoginFeature>Đăng nhập với SMS</LoginFeature>
                            </OptionLine>
                            <LineWrraper>
                                <Line />
                                <div style={{ fontSize: '1.5rem', color: '#ccc', padding: '2rem' }}>
                                    HOẶC
                                </div>
                                <Line />
                            </LineWrraper>
                            <AnotherLoginOption>
                                <LoginOption>
                                    <EmbededWrapper>
                                        <EmbededImage
                                            src={createImage('LoginOption.png')}
                                            className="facebook"
                                        />
                                    </EmbededWrapper>

                                    <div style={{ fontSize: '1.8rem' }}>Facebook</div>
                                </LoginOption>
                                <LoginOption>
                                    <WhiteBgWrapperCustom>
                                        <EmbededWrapper>
                                            <EmbededImage
                                                src={createImage('LoginOption.png')}
                                                className="google"
                                            />
                                        </EmbededWrapper>
                                    </WhiteBgWrapperCustom>
                                    <div style={{ flex: '1', textAlign: 'center' }}>
                                        <div style={{ fontSize: '1.8rem' }}>Google</div>
                                    </div>
                                </LoginOption>
                                <LoginOption>
                                    <EmbededWrapper>
                                        <EmbededImage
                                            src={createImage('LoginOption.png')}
                                            className="apple"
                                        />
                                    </EmbededWrapper>
                                    <div style={{ flex: '1', textAlign: 'center' }}>
                                        <div style={{ fontSize: '1.8rem' }}>Apple</div>
                                    </div>
                                </LoginOption>
                            </AnotherLoginOption>
                            <SignUpRedirectLine>
                                Bạn mới biết đến Shopee?
                                <AnchorExtend style={{ marginLeft: '3px' }}>
                                    Đăng ký
                                </AnchorExtend>{' '}
                            </SignUpRedirectLine>
                        </LoginForm>
                    </FormWrapper>
                </RelativeWrapper>
            </ContentContainer>
        </BodyContainer>
    );
}

export default LoginBody;
