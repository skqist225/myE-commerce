import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { addShop, clearSuccessMessage } from '../../features/shops';
import { Input, FileInput } from '../../components';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@material-ui/core';

const shopSchema = yup.object().shape({
    shopName: yup.string().required(),
    shopLogo: yup
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
    homeImage: yup.array(),
    shopDescription: yup.string().required(),
});

function AddShop() {
    const dispatch = useDispatch();
    dispatch(clearSuccessMessage());
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        mode: 'onBlur',
        resolver: yupResolver(shopSchema),
    });

    const onSubmit = (data, e) => {
        e.preventDefault();
        console.log(data);

        const { shopName, shopLogo, shopDescription, homeImages } = data;

        const formData = new FormData();
        formData.set('shopName', shopName);
        formData.set('shopLogo', shopLogo[0]);
        formData.set('shopDescription', shopDescription);
        homeImages.forEach(image => formData.append('homeImages', image));

        dispatch(addShop(formData));
    };

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
                <Input
                    {...register('shopName')}
                    type="text"
                    placeholder="Shop Name"
                    error={!!errors.shopName}
                    helperText={errors?.shopName?.message}
                />
                <Input
                    {...register('shopLogo')}
                    type="file"
                    placeholder="Shop Logo"
                    error={!!errors.shopLogo}
                    helperText={errors?.shopLogo?.message}
                />
                <Input
                    {...register('shopDescription')}
                    type="text"
                    placeholder="Shop\'s description"
                    error={!!errors.shopDescription}
                    helperText={errors?.shopDescription?.message}
                />
                <FileInput name="homeImages" control={control} />
                {errors?.homeImage?.message && <p>{errors.homeImage.message}</p>}
                <Button variant="contained" color="primary" type="submit">
                    Add Shop
                </Button>
            </form>
        </div>
    );
}

export default AddShop;
