import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '../../components';
import { makeStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';

const productSchema = yup.object().shape({

})

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  formControl: {
    margin: theme.spacing(3),
  },
}));

function AddProduct() {

    const {register, handleSubmit, formState:{ errors}} = useForm({
        mode: 'onBlur',
        resolver: yupResolver()
    })

    return (
        <div>
            <form onSubmit={}>
                <Input {...register("productName")} name="productName" type="text"/>
                <Input  {...register("description")} name="description"type="text"/>
                <Input  {...register("category")} name="category" type="text"/>
                <Input  {...register("supplier")} name="supplier" type="text"/>
                <div className={classes.root}>
        <FormControl required error={error} component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">Pick one</FormLabel>
        <FormGroup>
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
          <FormControlLabel
            control={<Checkbox checked={gilad} onChange={handleChange} name="gilad" />}
            label="Gilad Gray"
          />
          <FormControlLabel
            control={<Checkbox checked={jason} onChange={handleChange} name="jason" />}
            label="Jason Killian"
          />
          <FormControlLabel
            control={<Checkbox checked={antoine} onChange={handleChange} name="antoine" />}
            label="Antoine Llorca"
          />
        </FormGroup>
        <FormHelperText>You can display an error</FormHelperText>
      </FormControl>
    </div>
                <Input />
                <Input />
                <Input type="file" />
            </form>
        </div>
    );
}

export default AddProduct;
