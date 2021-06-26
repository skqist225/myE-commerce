import React, { forwardRef } from 'react';
import { TextField } from '@material-ui/core';

const Input = forwardRef((props, ref) => {
    return (
        <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            inputRef={ref}
            {...props}
        />
    );
});

export default Input;
