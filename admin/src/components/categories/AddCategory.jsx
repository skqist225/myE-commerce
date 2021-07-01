import React, { Fragment, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import Input from '../input/Input';
import { Fab, FormControl, InputLabel, makeStyles, NativeSelect } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { FileInput, BootstrapInput } from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import { addCategory, categoriesSelectors, fetchCategories } from '../../features/categories';

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

function AddCategory() {
    const dispatch = useDispatch();
    const classes = useStyles();
    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        mode: 'onBlur',
    });

    const categories = useSelector(categoriesSelectors.selectAll);

    const onSubmit = (data, e) => {
        const { categoryName, categoryImage, parentId } = data;

        const formData = new FormData();
        formData.set('categoryName', categoryName);
        formData.set('categoryImage', categoryImage[0]);
        formData.set('parentId', parentId);

        dispatch(addCategory(formData));
    };

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
                <Input {...register('categoryName')} type="text" placeholder="Category Name" />
                <Input {...register('categoryImage')} type="file" placeholder="Category Image" />

                <FormControl className={classes.margin}>
                    <InputLabel>ParentId:</InputLabel>
                    <Controller
                        control={control}
                        name="parentId"
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
                <Fab
                    color="primary"
                    aria-label="add"
                    size="medium"
                    variant="extended"
                    type="submit"
                >
                    <AddIcon />
                    Add Category
                </Fab>
            </form>
        </div>
    );
}

export default AddCategory;
