import React, { Fragment } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { BootstrapInput } from '../../components';
import { addShop, clearSuccessMessage } from '../../features/shops';
import { Input, FileInput } from '../../components';
import { makeStyles } from '@material-ui/core/styles';
import { categoriesSelectors } from '../../features/categories';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import {
    InputLabel,
    Button,
    FormControl,
    NativeSelect,
    RadioGroup,
    FormLabel,
    FormControlLabel,
    Radio,
} from '@material-ui/core';

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

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'row',
    },
    formControl: {
        margin: theme.spacing(3),
    },
    margin: {
        margin: theme.spacing(1),
    },
    label: {
        fontSize: 16,
    },
    buttonRoot: {
        marginTop: theme.spacing(1),
    },
}));

function AddShop() {
    const dispatch = useDispatch();
    const classes = useStyles();
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
    const categories = useSelector(categoriesSelectors.selectAll);
    const isMallType = register('isMallType');

    const onSubmit = (data, e) => {
        e.preventDefault();
        console.log(data);

        const { shopName, shopLogo, shopDescription, homeImages, isMallType, shopCategory } = data;

        const formData = new FormData();
        formData.set('shopName', shopName);
        formData.set('shopLogo', shopLogo[0]);
        formData.set('shopDescription', shopDescription);
        formData.set('isMallType', isMallType);
        formData.set('shopCategory', shopCategory);
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
                <FormControl className={classes.margin}>
                    <InputLabel>Category:</InputLabel>
                    <Controller
                        control={control}
                        name="shopCategory"
                        render={({ field }) => (
                            <>
                                <NativeSelect {...field} input={<BootstrapInput />}>
                                    <option aria-label="None" value="" />
                                    {categories.map(category => (
                                        <Fragment key={category._id}>
                                            <option value={category._id.toString()}>
                                                {category.categoryName}
                                            </option>
                                        </Fragment>
                                    ))}
                                </NativeSelect>
                            </>
                        )}
                    />
                </FormControl>
                <FormControl component="fieldset">
                    <FormLabel component="legend">Is Mall Type:</FormLabel>
                    <RadioGroup aria-label="isMallType" className={classes.root}>
                        {[true, false].map((val, index) => (
                            <FormControlLabel
                                key={index}
                                control={
                                    <Radio
                                        color="primary"
                                        name="isMallType"
                                        onChange={isMallType.onChange}
                                        value={`${val}`}
                                        inputRef={isMallType.ref}
                                        // checked={getValues().isFreeship}
                                    />
                                }
                                label={val ? 'Có' : 'Không'}
                            />
                        ))}
                    </RadioGroup>
                </FormControl>
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
