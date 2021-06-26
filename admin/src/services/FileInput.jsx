import React from 'react';
import { Controller } from 'react-hook-form';
import Dropzone from 'react-dropzone';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Paper from '@material-ui/core/Paper';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import { makeStyles } from '@material-ui/core';
import List from '@material-ui/core/List';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: '#eee',
        textAlign: 'center',
        cursor: 'pointer',
        color: '#333',
        padding: '10px',
        marginTop: '20px',
    },
    icon: {
        marginTop: '16px',
        color: '#888',
        fontSize: '42px',
    },
}));

export default function FileInput({ control, name }) {
    const styles = useStyles();

    return (
        <Controller
            control={control}
            name={name}
            defaultValue={[]}
            render={({ field: { onChange, onBlur, value, ref } }) => (
                <>
                    <Dropzone onDrop={onChange}>
                        {({ getRootProps, getInputProps }) => (
                            <Paper
                                variant="outline"
                                {...getRootProps()}
                                className={styles.root}
                            >
                                <CloudUploadIcon className={styles.icon} />
                                <input
                                    {...getInputProps()}
                                    name={name}
                                    onBlur={onBlur}
                                />
                                <p>
                                    Drag 'n' drop some files here, or click to
                                    select files
                                </p>
                            </Paper>
                        )}
                    </Dropzone>
                    <List>
                        {value.map((file, index) => (
                            <ListItem key={index}>
                                <ListItemIcon>
                                    <InsertDriveFileIcon />
                                </ListItemIcon>
                                <ListItemText
                                    primary={file.name}
                                    secondary={file.size}
                                />
                            </ListItem>
                        ))}
                    </List>
                </>
            )}
        />
    );
}
