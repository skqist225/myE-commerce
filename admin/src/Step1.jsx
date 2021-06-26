import React from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import Form from './components/form/Form';
import MainContainer from './components/header/MainContainer';
import Input from './components/input/Input';
import PrimaryButton from './components/header/PrimaryButton';
import Typography from '@material-ui/core/Typography';

import { useData } from './DataContext';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object().shape({
    firstName: yup
        .string()
        .matches(/^([^0-9]*)$/, 'First name should not contain number')
        .required('First name is a required field'),
    lastName: yup
        .string()
        .matches(/^([^0-9]*)$/, 'Last name should not contain number')
        .required('Last name is a required field'),
});

function Step1() {
    const { setValues, data } = useData();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: { firstName: data.firstName, lastName: data.lastName },
        mode: 'onBlur',
        resolver: yupResolver(schema),
    });

    const history = useHistory();

    const onSubmit = data => {
        history.push('/step2');
        setValues(data);
    };

    return (
        <MainContainer>
            <Typography component="h2" variant="h5">
                Step 2
            </Typography>
            <Form action="" onSubmit={handleSubmit(onSubmit)}>
                <Input
                    {...register('firstName')}
                    type="text"
                    name="firstName"
                    label="First Name"
                    error={!!errors.firstName}
                    helperText={errors?.firstName?.message}
                />
                <Input
                    {...register('lastName')}
                    type="text"
                    name="lastName"
                    label="Last Name"
                    error={!!errors.lastName}
                    helperText={errors?.lastName?.message}
                />
                <PrimaryButton type="submit">Next</PrimaryButton>
            </Form>
        </MainContainer>
    );
}

export default Step1;
