import React, { memo } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    button: {
        margin: theme.spacing(1),
    },
}));

const Product = ({ product, onDelete, onPatch }) => {
    const classes = useStyles();

    const replaceProduct = {
        productId: product._id,
        productBody: {
            productName: 'hehehehe',
        },
    };

    return (
        <div>
            {' '}
            <h2>{product.productName}</h2>
            {product.productType.map(type => (
                <div key={type._id}>
                    <img
                        src={`http://localhost:2250/${type.typeImage}`}
                        width="100px"
                        height="100px"
                    />
                </div>
            ))}
            <Button
                variant="contained"
                color="primary"
                onClick={() => onDelete(product._id)}
            >
                Delete comment
            </Button>
            <Button
                variant="contained"
                color="primary"
                size="small"
                className={classes.button}
                startIcon={<SaveIcon />}
                onClick={() => onPatch(replaceProduct)}
            >
                Edit comment
            </Button>
        </div>
    );
};

Product.propTypes = {
    product: PropTypes.object.isRequired,
    onDelete: PropTypes.func.isRequired,
    onPatch: PropTypes.func.isRequired,
};

export default memo(Product);
