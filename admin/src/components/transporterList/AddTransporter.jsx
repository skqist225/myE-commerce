import React, { Fragment } from 'react';
import { Input, MetaData } from '../../components';
import SaveIcon from '@material-ui/icons/Save';
import {
    NotificationContainer,
    NotificationManager,
} from 'react-notifications';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { addTransporter, clearErrorMessage } from '../../features/transporters';
import { CircularProgress, Button } from '@material-ui/core';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import './addTransporter.css';

const transporterValidationSchema = yup.object().shape({
    transporterName: yup.string().required('Please enter transporter name'),
    transporterLogo: yup
        .mixed()
        .test('name', 'Transporter logo is required', value => {
            return value[0] && value[0].name !== '';
        })
        .test('fileSize', 'The file is too large', value => {
            return value[0] && value[0].size <= 1000000;
        })
        .test('type', 'We only support image', value => {
            return value[0] && value[0].type.includes('image');
        }),
    contactNumber: yup.string(),
    policy: yup.string(),
    transportFee: yup
        .number()
        .required("Please enter transporter's fee")
        .positive()
        .max(60000),
    pickUpArea: yup.string().required('Please enter pick up area'),
    deliveryArea: yup.string().required('Please enter deliveryArea'),
});

function AddTransporter() {
    const [imageReview, setImageReview] = React.useState('');
    const dispatch = useDispatch();
    const { loading, errorMessage, successMessage } = useSelector(
        state => state.transporters
    );

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm({
        mode: 'onSubmit',
        resolver: yupResolver(transporterValidationSchema),
    });

    const onSubmit = (data, e) => {
        e.preventDefault();

        const {
            transporterName,
            transporterLogo,
            contactNumber,
            transportFee,
            policy,
            pickUpArea,
            deliveryArea,
        } = data;

        const formData = new FormData();
        formData.set('transporterName', transporterName);
        formData.set('transporterLogo', transporterLogo[0]);
        formData.set('contactNumber', contactNumber);
        formData.set('transportFee', transportFee);
        formData.set('policy', policy);
        formData.set('pickUpArea', pickUpArea);
        formData.set('deliveryArea', deliveryArea);

        dispatch(addTransporter(formData));
    };

    React.useEffect(() => {
        if (errorMessage) {
            NotificationManager('Error message', errorMessage);
            dispatch(clearErrorMessage());
        }

        if (!errorMessage && successMessage) {
            NotificationManager.success('Success message', successMessage);
            document.getElementById('addTransporterForm').reset();
        }
    }, [dispatch]);

    const handleLogoChange = e => {
        const fileReader = new FileReader();

        fileReader.onload = () => {
            if (fileReader.readyState === 2) {
                setImageReview(fileReader.result);
            }
        };

        fileReader.readAsDataURL(e.target.files[0]);
    };

    return (
        <div
            style={{
                margin: '20px auto',
                height: '100vh',
                width: '50%',
                display: 'flex',
                justifyContent: 'center',
            }}
        >
            <div
                style={{
                    padding: '30px',
                    boxShadow: ' 6px 6px 31px 1px rgba(158,100,158,0.8)',
                    height: '90%',
                }}
                className="addTransporterFormContainer"
            >
                {loading ? (
                    <CircularProgress />
                ) : (
                    <Fragment>
                        <MetaData title="Add Transporter" />
                        {successMessage && <NotificationContainer />}
                        {errorMessage && <NotificationContainer />}
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                height: '90%',
                            }}
                            encType="multipart/form-data"
                            id="addTransporterForm"
                        >
                            <Input
                                {...register('transporterName')}
                                name="transporterName"
                                type="text"
                                label="Transporter Name"
                                error={!!errors.transporterName}
                                helperText={errors?.transporterName?.message}
                            />
                            <div>
                                <label htmlFor="">Transporter Logo</label>
                                <input
                                    {...register('transporterLogo')}
                                    name="transporterLogo"
                                    type="file"
                                    onChange={handleLogoChange}
                                />
                                {errors.transporterLogo && (
                                    <p
                                        style={{
                                            color: 'red',
                                            textAlign: 'center',
                                        }}
                                    >
                                        {errors.transporterLogo.message}
                                    </p>
                                )}
                            </div>
                            <div className="transporterLogoWrapper">
                                {imageReview && (
                                    <img
                                        src={imageReview}
                                        alt="Transporter Logo Preview"
                                        className="transporterLogoPreview"
                                    />
                                )}
                            </div>
                            <Input
                                {...register('contactNumber')}
                                name="contactNumber"
                                type="text"
                                label="Contact Number"
                                error={!!errors.contactNumber}
                                helperText={errors?.contactNumber?.message}
                            />
                            <Input
                                {...register('policy')}
                                name="policy"
                                type="text"
                                label="Policy"
                                error={!!errors.policy}
                                helperText={errors?.policy?.message}
                            />
                            <Input
                                {...register('transportFee')}
                                name="transportFee"
                                type="text"
                                label="Transport Fee"
                                error={!!errors.transportFee}
                                helperText={errors?.transportFee?.message}
                            />
                            <Input
                                {...register('pickUpArea')}
                                name="pickUpArea"
                                type="text"
                                label="Pick up area"
                                error={!!errors.pickUpArea}
                                helperText={errors?.pickUpArea?.message}
                            />
                            <Input
                                {...register('deliveryArea')}
                                name="deliveryArea"
                                type="text"
                                label="Delivery area"
                                error={!!errors.deliveryArea}
                                helperText={errors?.deliveryArea?.message}
                            />
                            <Button
                                variant="contained"
                                color="primary"
                                size="large"
                                startIcon={<SaveIcon />}
                                type="submit"
                                style={{ marginTop: '20px', width: '280px' }}
                            >
                                Save
                            </Button>
                        </form>
                    </Fragment>
                )}
            </div>
        </div>
    );
}

export default AddTransporter;
