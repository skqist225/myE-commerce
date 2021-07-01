import React, { useEffect, Fragment } from 'react';
import {
    RadioGroup,
    InputLabel,
    FormControlLabel,
    FormHelperText,
    Button,
    Radio,
    FormLabel,
    FormControl,
    FormGroup,
    Checkbox,
    NativeSelect,
    Typography,
} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
import { useForm, Controller, useFieldArray, useWatch } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Input, FileInput } from '../../components';
import { transportersSelector } from '../../features/transporters';
import { categoriesSelectors } from '../../features/categories';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import './addProduct.css';
import { addProduct, clearSuccessMessage, clearErrorMessage } from '../../features/products';
import { BootstrapInput } from '../../components';
import { NotificationContainer, NotificationManager } from 'react-notifications';

yup.setLocale({
    string: {
        required: '${PATH} is required',
        matches: ({ path }) =>
            `${path.charAt(0).toUpperCase() + path.slice(1)} must be a valid ObjectId`,
    },
});

const productSchema = yup.object().shape({
    productName: yup.string().required(),
    description: yup.string().required(),
    category: yup
        .string()
        .matches(/^[0-9a-fA-F]{24}$/)
        .required(),
    supplier: yup
        .string()
        .matches(/^[0-9a-fA-F]{24}$/)
        .required(),
    // transporters: yup.array().required(),
    images: yup
        .mixed()
        .test('name', "Product's images is required", value => {
            return value[0] && value[0].name !== '';
        })
        .test('fileSize', 'The file is too large', value => {
            let passTest = true;

            value.forEach(file => {
                if (file.size > 1000000) {
                    return false;
                }
            });

            return passTest;
        })
        .test('type', 'We only support image', value => {
            let passTest = true;
            value.forEach(file => {
                if (!file.type.includes('image')) {
                    return false;
                }
            });
            return passTest;
        }),
    isFreeship: yup.boolean().default(false),
    productWeight: yup.number().required(),
    discountPercent: yup.number().min(0).max(100).default(0),
    // productTypes: yup.array().of(
    //     yup
    //         .object()
    //         .shape({
    //             typeName: yup.string().required(),
    //             typeImage: yup
    //                 .mixed()
    //                 .test('name', 'Type image is required', value => {
    //                     return value[0] && value[0].name !== '';
    //                 })
    //                 .test('fileSize', 'The file is too large', value => {
    //                     return value[0] && value[0].size <= 1000000;
    //                 })
    //                 .test('type', 'We only support image', value => {
    //                     return value[0] && value[0].type.includes('image');
    //                 }),
    //             typeStock: yup.number().required(),
    //             typePrice: yup.number().required(),
    //         })
    //         .required()
    // ),
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

const WatchProductTypesField = ({ control, name, index }) => {
    const productTypes = useWatch({
        control,
        name,
    });

    const totalProductStock = productTypes?.reduce(
        (acc, productType) => Math.abs(productType.typeStock) + acc,
        0
    );

    const totalProductPrice = productTypes?.reduce(
        (acc, productType) => acc + Math.abs(productType.typePrice),
        0
    );

    return (
        <div className="productTypesInfo">
            <Typography>Total product's type: {productTypes?.length || 0}</Typography>
            <Typography>Total product's stock: {totalProductStock || 0}</Typography>
            <Typography>Total product's price: {totalProductPrice || 0}</Typography>
        </div>
    );
};

function AddProduct() {
    const dispatch = useDispatch();
    dispatch(clearSuccessMessage());

    const [imagePreview, setImageReview] = React.useState([]);
    const transporters = useSelector(transportersSelector.selectAll);
    const categories = useSelector(categoriesSelectors.selectAll);
    const { successMessage, errorMessage, loading } = useSelector(state => state.products);
    const classes = useStyles();
    const {
        register,
        handleSubmit,
        control,
        reset,
        watch,
        getValues,
        formState: { errors, isValid, isSubmitting },
    } = useForm({
        mode: 'onBlur',
        defaultValues: {
            productWeight: 1,
            isFreeship: false,
            discountPercent: 0,
            transporters: [], //transporters[0]?._id
        },
        resolver: yupResolver(productSchema),
    });
    const hasDiscount = watch('hasDiscount', false);

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'productTypes',
    });

    const freeshipRef = register('isFreeship');
    const transportersRef = register('transporters');

    const onSubmit = (data, e) => {
        e.preventDefault();
        console.log(data);

        const {
            productName,
            description,
            category,
            supplier,
            transporters,
            isFreeship,
            productWeight,
            discountPercent,
            productTypes,
            images,
        } = data;

        const formData = new FormData();
        formData.set('productName', productName);
        formData.set('description', description);
        formData.set('category', category);
        formData.set('supplier', supplier);
        formData.set('isFreeship', isFreeship);
        formData.set('productWeight', productWeight);
        formData.set('discountPercent', discountPercent);

        transporters.forEach(transporter => formData.append('transporters', transporter));
        images.forEach(image => formData.append('images', image));
        // formData.append('images', images);

        productTypes.forEach(productType => {
            formData.append('productTypes[typeName]', productType.typeName);
            formData.append('productTypes[typeImage]', productType.typeImage[0]);
            formData.append('productTypes[typeStock]', productType.typeStock);
            formData.append('productTypes[typePrice]', productType.typePrice);
        });

        dispatch(addProduct(formData));
    };

    const handleTypeImagePreview = (e, index) => {
        const fileReader = new FileReader();
        fileReader.onload = () => {
            if (fileReader.readyState === 2) {
                if (imagePreview[index]) {
                    const _imagePreview = imagePreview;
                    _imagePreview[index] = fileReader.result;

                    setImageReview([..._imagePreview]);
                    return;
                }

                setImageReview([...imagePreview, fileReader.result]);
            }
        };

        fileReader.readAsDataURL(e.target.files[0]);
    };

    // useEffect(() => {
    //     dispatch(clearSuccessMessage());
    // }, []);

    useEffect(() => {
        if (isSubmitting) {
        }

        if (errorMessage)
            NotificationManager.error(errorMessage, 'Click me!', 4000, () => {
                dispatch(clearErrorMessage());
            });

        if (successMessage) {
            NotificationManager.success(successMessage, 'Click me!', 4000, () => {
                dispatch(clearSuccessMessage());
            });
        }
    }, [isSubmitting, successMessage, errorMessage]);

    return (
        <div className="addProduct">
            {successMessage && <NotificationContainer />}
            <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
                <div className="addProductFirstLine">
                    <Input
                        {...register('productName')}
                        type="text"
                        label="Product Name"
                        size="small"
                        error={!!errors.productName}
                        helperText={errors?.productName?.message}
                        fullWidth={false}
                        className={classes.margin}
                    />
                    <Input
                        {...register('description')}
                        type="text"
                        label="Description"
                        size="small"
                        error={!!errors.description}
                        helperText={errors?.description?.message}
                        fullWidth={false}
                        className={classes.margin}
                    />
                    <Input
                        {...register('productWeight')}
                        type="number"
                        label="Product's weight"
                        size="small"
                        error={!!errors.productWeight}
                        helperText={errors?.productWeight?.message}
                        fullWidth={false}
                        className={classes.margin}
                    />
                    <Input
                        {...register('supplier')}
                        type="text"
                        label="Supplier"
                        size="small"
                        error={!!errors.supplier}
                        helperText={errors?.supplier?.message}
                        fullWidth={false}
                        className={classes.margin}
                    />
                    <FormControl className={classes.margin}>
                        <InputLabel>Category:</InputLabel>
                        <Controller
                            control={control}
                            name="category"
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
                </div>
                <div className="addProductSecondLine">
                    <div className="addProductPriceOffer">
                        <Controller
                            control={control}
                            name="hasDiscount"
                            render={({ field }) => (
                                <FormControlLabel
                                    control={<Checkbox color="primary" {...field} />}
                                    label="Do product have any price offer"
                                />
                            )}
                        />
                        {hasDiscount && (
                            <Input
                                {...register('discountPercent')}
                                type="number"
                                label="Discount percent"
                                size="small"
                                error={!!errors.discountPercent}
                                helperText={errors?.discountPercent?.message}
                                fullWidth={false}
                            />
                        )}
                    </div>
                    <div className="addProduct">
                        <FormControl required component="fieldset">
                            <FormLabel component="legend">Transporters</FormLabel>
                            <FormGroup className={classes.root}>
                                {transporters.map((transporter, index) => (
                                    <Fragment key={transporter._id}>
                                        <FormControlLabel
                                            key={transporter._id.toString()}
                                            control={
                                                <Checkbox
                                                    color="primary"
                                                    onChange={transportersRef.onChange}
                                                    inputRef={transportersRef.ref}
                                                    name="transporters"
                                                    value={transporter._id}
                                                />
                                            }
                                            style={{ fontSize: '16px' }}
                                            label={transporter.transporterName}
                                            className={classes.label}
                                        />
                                    </Fragment>
                                ))}
                            </FormGroup>
                            <FormHelperText>You can display an error</FormHelperText>
                        </FormControl>

                        <FormControl component="fieldset">
                            <FormLabel component="legend">Is Freeship</FormLabel>
                            <RadioGroup aria-label="isFreeship" className={classes.root}>
                                {[true, false].map((val, index) => (
                                    <FormControlLabel
                                        key={index}
                                        control={
                                            <Radio
                                                color="primary"
                                                name="isFreeship"
                                                onChange={freeshipRef.onChange}
                                                value={`${val}`}
                                                inputRef={freeshipRef.ref}
                                                // checked={getValues().isFreeship}
                                            />
                                        }
                                        label={val ? 'Có' : 'Không'}
                                    />
                                ))}
                            </RadioGroup>
                        </FormControl>
                    </div>
                </div>

                <FileInput control={control} name="images" />
                {fields.map(({ id, typeName, typeImage, typeStock, typePrice }, index) => {
                    return (
                        <div key={id} className="productTypesContainer">
                            <div className="productTypesInputWrapper">
                                <input
                                    {...register(`productTypes.${index}.typeName`)}
                                    type="text"
                                    defaultValue={typeName}
                                    className="productTypesInput"
                                    placeholder="Type name"
                                />
                                <input
                                    {...register(`productTypes.${index}.typeImage`)}
                                    type="file"
                                    defaultValue={typeImage}
                                    className="productTypesInput"
                                    placeholder="Type image"
                                    onChange={e => handleTypeImagePreview(e, index)}
                                />
                                <input
                                    {...register(`productTypes.${index}.typeStock`)}
                                    type="number"
                                    defaultValue={typeStock}
                                    className="productTypesInput"
                                    placeholder="Type stock"
                                />
                                <input
                                    {...register(`productTypes.${index}.typePrice`)}
                                    type="number"
                                    defaultValue={typePrice}
                                    className="productTypesInput"
                                    placeholder="Type price"
                                />

                                <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={e => {
                                        e.preventDefault();

                                        console.log(fields.length);

                                        const _imagePreview = imagePreview;
                                        console.log(_imagePreview);
                                        if (_imagePreview.length > 0) {
                                            if (index === fields.length - 1) {
                                                _imagePreview.splice(index, 1);
                                            } else {
                                                _imagePreview[index] = undefined;
                                            }
                                        }

                                        setImageReview(_imagePreview);
                                        remove(index);
                                    }}
                                >
                                    Delete
                                </Button>
                            </div>
                            <div className="productTypesTypeImagePreview">
                                {imagePreview[index] && (
                                    <img
                                        src={
                                            imagePreview[index]
                                                ? imagePreview[index]
                                                : `${process.env.REACT_APP_IMAGE_SERVER_PATH}/uploads/images/1.jpg`
                                        }
                                        alt={imagePreview ? imagePreview : 'No image'}
                                        className="productTypeTypeImagePreview"
                                    />
                                )}
                            </div>

                            {/* <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={() => {
                                        reset(
                                            {
                                                productTypes: [
                                                    {
                                                        typeStock: 0,
                                                        typePrice: 0,
                                                    },
                                                ],
                                            },
                                            {
                                                keepDirty: true,
                                                keepDefaultValues: true,
                                            }
                                        );
                                    }}
                                >
                                    Reset Field
                                </Button> */}
                        </div>
                    );
                })}
                <WatchProductTypesField name={'productTypes'} control={control} />
                <Button variant="outlined" color="secondary" type="submit">
                    Add Product
                </Button>
                <Button
                    variant="outlined"
                    onClick={e => {
                        e.preventDefault();
                        append({ shouldFocus: true, focusIndex: 0 });
                    }}
                >
                    Append Products's type
                </Button>
            </form>
        </div>
    );
}

export default AddProduct;
