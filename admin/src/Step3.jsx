import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import Form from './components/header/Form';
import MainContainer from './components/header/MainContainer';

import PrimaryButton from './components/header/PrimaryButton';

import Typography from '@material-ui/core/Typography';
import { useData } from './DataContext';
import { useHistory } from 'react-router-dom';

import FileInput from './FileInput';

export default function Step3() {
    const history = useHistory();
    const { data, setValues } = useData();

    const { control, handleSubmit } = useForm({
        defaultValues: { files: data.files },
    });

    const onSubmit = data => {
        history.push('/result');
        setValues(data);
    };

    return (
        <MainContainer>
            <Typography component="h2" variant=""></Typography>{' '}
            <Form onSubmit={handleSubmit(onSubmit)}>
                <FileInput control={control} name="files" />
                <PrimaryButton type="submit">Next</PrimaryButton>
            </Form>
        </MainContainer>
    );
}
