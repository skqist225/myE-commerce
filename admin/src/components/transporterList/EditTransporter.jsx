import React from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import { patchTransporter, clearSuccessMessage } from '../../features/transporters';
import { useHistory } from 'react-router-dom';

function EditTransporter({ match }) {
    const { register, handleSubmit } = useForm();
    const history = useHistory();
    const dispatch = useDispatch();

    const { transporterId } = match.params;

    const { successMessage } = useSelector(state => state.transporters);
    console.log(successMessage);

    const onSubmit = data => {
        const formData = new FormData();
        const { contactNumber } = data;

        formData.set('contactNumber', contactNumber);

        dispatch(patchTransporter({ transporterId, transporterChanges: formData }));
    };

    React.useEffect(() => {
        if (successMessage) {
            console.log(successMessage);

            setTimeout(() => history.push('/transporters'), 2000);
            dispatch(clearSuccessMessage());
        }
    }, [successMessage, dispatch]);

    return (
        <div>
            <form action="" encType="multipart/form-data" onSubmit={handleSubmit(onSubmit)}>
                <Input {...register('contactNumber')} type="text" label="Contact Number" />
                <Button type="submit" variant="contained" color="secondary">
                    Update Transporter
                </Button>
            </form>
        </div>
    );
}

export default EditTransporter;
