import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import Form from './components/header/Form';
import MainContainer from './components/header/MainContainer';
import Input from './components/header/Input';
import PrimaryButton from './components/header/PrimaryButton';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import { useData } from './DataContext';
import { useHistory } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { parsePhoneNumberFromString } from 'libphonenumber-js';

const schema = yup.object().shape({
    email: yup
        .string()
        .email('Email should have correct format')
        .required('Email is required field'),
});

const normalizePhoneNumber = value => {
    const phoneNumber = parsePhoneNumberFromString(value);

    if (!phoneNumber) return value;

    return phoneNumber.formatInternational();
};

const Step2 = () => {
    const { data, setValues } = useData();
    const {
        register,
        handleSubmit,
        watch,
        control,
        formState: { errors },
    } = useForm({
        defaultValues: {
            email: data.email,
            hasPhone: data.hasPhone,
            phoneNumber: data.phoneNumber,
        },
        mode: 'onBlur',
        resolver: yupResolver(schema),
    });

    const [checkboxState, setCheckboxState] = React.useState({
        hasPhone: false,
    });

    const history = useHistory();

    const hasPhone = watch('hasPhone', false);
    const checkBoxRef = register('hasPhone');

    const onSubmit = data => {
        console.log(data);
        history.push('/step3');
        setValues(data);
    };

    return (
        <MainContainer>
            <Typography>Step3</Typography>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Input
                    type="email"
                    label="Email"
                    name="email"
                    required
                    {...register('email')}
                    error={!!errors.email}
                    helperText={errors?.email?.message}
                />

                <Controller
                    control={control}
                    name="hasPhone"
                    render={({
                        field: { onChange, onBlur, value, name, ref },
                    }) => (
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={value}
                                    onChange={onChange}
                                    color="primary"
                                    inputRef={ref}
                                    name={name}
                                />
                            }
                            label="Do you have a phone"
                        />
                    )}
                />

                {hasPhone && (
                    <Input
                        {...register('phoneNumber')}
                        id="phoneNumber"
                        type="tel"
                        label="Phone Number"
                        name="phoneNumber"
                        onChange={event => {
                            event.target.value = normalizePhoneNumber(
                                event.target.value
                            );
                        }}
                    />
                )}
                <PrimaryButton type="submit">Next</PrimaryButton>
            </Form>
        </MainContainer>
    );
};

export default Step2;
