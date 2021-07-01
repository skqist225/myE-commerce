import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { FileInput } from '../../components';
import { patchShop } from '../../features/shops';
import Button from '@material-ui/core/Button';

function EditShop({ match }) {
    const dispatch = useDispatch();
    const { shopId } = match.params;
    const { control, handleSubmit } = useForm({});

    const onSubmit = data => {
        const formData = new FormData();
        const { homeImages } = data;

        homeImages.forEach(homeImage => formData.append('homeImages', homeImage));

        dispatch(patchShop({ shopId, shopChanges: formData }));
    };

    return (
        <div>
            <form action="" encType="multipart/form-data" onSubmit={handleSubmit(onSubmit)}>
                <FileInput control={control} name="homeImages" />
                <Button type="submit" variant="contained" color="secondary">
                    Update Shop
                </Button>
            </form>
        </div>
    );
}

export default EditShop;
