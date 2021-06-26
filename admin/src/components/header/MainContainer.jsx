import React from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => {
    return {
        root: {
            marginTop: theme.spacing(4),
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
    };
});

function MainContainer({ children, ...props }) {
    const styles = useStyles();

    return (
        <Container
            {...props}
            component="main"
            maxWidth="xs"
            className={styles.root}
        >
            {children}
        </Container>
    );
}

export default MainContainer;
