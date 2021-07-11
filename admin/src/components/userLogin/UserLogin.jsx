import React, { forwardRef } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Form, Input, MetaData } from '..';
import {
    FormControl,
    InputLabel,
    InputAdornment,
    OutlinedInput,
    IconButton,
    Button,
    CircularProgress,
    Typography,
    FormHelperText,
} from '@material-ui/core';

import { Visibility, VisibilityOff, ExitToApp } from '@material-ui/icons';
import { NotificationContainer, NotificationManager } from 'react-notifications';

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { userLogin, clearErrorMessage } from '../../features/auth';

const loginSchema = yup.object().shape({
    username: yup.string().required('User name required for login'),
    password: yup
        .string()
        .min(8, 'Please enter at least 8 characters')
        .required('Password required for login'),
});

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    margin: {
        margin: theme.spacing(1),
    },
    withoutLabel: {
        marginTop: theme.spacing(3),
    },
    textField: {
        width: '30ch',
    },
    button: {
        margin: theme.spacing(1),
        width: '24ch',
    },
}));

function UserLogin() {
    const history = useHistory();
    const dispatch = useDispatch();
    const classes = useStyles();

    const { isAuthenticated, loading, errorMessage } = useSelector(state => state.auth);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        mode: 'onSubmit',
        resolver: yupResolver(loginSchema),
        defaultValues: {
            username: '',
            password: '',
        },
    });

    const [values, setValues] = React.useState({
        showPassword: false,
    });

    const handleClickShowPassword = () => {
        setValues({ showPassword: true });
    };

    const handleMouseDownPassword = event => {
        event.preventDefault();
    };

    const handleUserLogin = (data, e) => {
        e.preventDefault();
        dispatch(userLogin(data));
    };

    React.useEffect(() => {
        if (isAuthenticated) {
            history.push('/');
        }

        if (errorMessage) {
            NotificationManager.error(errorMessage, 'Click me!', 4000, () => {
                dispatch(clearErrorMessage());
            });
        }
    }, [dispatch, isAuthenticated, errorMessage]);

    console.log('Login rendering...');

    const PasswordInput = forwardRef((props, ref) => {
        return (
            <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
                <InputLabel>Password</InputLabel>
                <OutlinedInput
                    inputRef={ref}
                    name={props.name}
                    type={values.showPassword ? 'text' : 'password'}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                            >
                                {values.showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                    }
                    aria-describedby="my-helper-text"
                    {...props}
                    labelWidth={70}
                />
                <FormHelperText id="my-helper-text">{props.helpertext}</FormHelperText>
            </FormControl>
        );
    });

    return (
        <div
            style={{
                height: '100vh',
                width: '100%',
            }}
        >
            {loading ? (
                <CircularProgress />
            ) : (
                <>
                    {errorMessage && <NotificationContainer />}
                    <MetaData title={'Login'} />
                    <Typography variant="h2" style={{ textAlign: 'center', color: 'red' }}>
                        Login
                    </Typography>
                    <Typography variant="h4" style={{ textAlign: 'center', color: 'darkblue' }}>
                        myE-commerce
                    </Typography>
                    <Form
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'flex-start',
                            marginTop: '150px',
                            height: 'calc(100vh - 50px)',
                        }}
                        onSubmit={handleSubmit(handleUserLogin)}
                    >
                        <Input
                            {...register('username')}
                            name="username"
                            type="text"
                            helperText={errors?.username?.message}
                            error={!!errors.username}
                            label="User Name"
                            className={classes.textField}
                            placeholder=""
                        />
                        <input
                            {...register('password')}
                            name="password"
                            error={!!errors.password}
                            helpertext={errors?.password?.message}
                        />

                        <Button
                            variant="outlined"
                            color="primary"
                            className={classes.button}
                            endIcon={<ExitToApp />}
                            type="submit"
                            size="large"
                        >
                            Login
                        </Button>
                    </Form>
                </>
            )}
        </div>
    );
}

export default UserLogin;
