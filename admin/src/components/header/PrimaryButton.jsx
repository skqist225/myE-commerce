import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
    root: {
        margin: theme.spacing(1),
    },
}));

const PrimaryButton = ({ children, ...props }) => {
    const classes = useStyles();
    return (
        <Button
            variant="contained"
            type="submit"
            fullWidth
            color="primary"
            className={classes.root}
            {...props}
        >
            {children}
        </Button>
    );
};

export default PrimaryButton;
