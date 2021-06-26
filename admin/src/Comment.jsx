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

const Comment = ({ comment, onDelete, onPatch }) => {
    const classes = useStyles();

    const newComment = {
        id: comment.id,
        newObj: {
            body: 'AGAHAHAH',
        },
    };

    return (
        <div>
            <p>{comment.body}</p>
            <Button
                variant="contained"
                color="primary"
                onClick={() => onDelete(comment.id)}
            >
                Delete Comment
            </Button>
            <Button
                variant="contained"
                color="primary"
                size="small"
                className={classes.button}
                startIcon={<SaveIcon />}
                onClick={() => onPatch(newComment)}
            >
                Edit Comment
            </Button>
        </div>
    );
};

// Product.propTypes = {
//     product: PropTypes.object.isRequired,
//     onDelete: PropTypes.func.isRequired,
//     onPatch: PropTypes.func.isRequired,
// };

export default memo(Comment);
