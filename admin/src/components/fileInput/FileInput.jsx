import React from 'react';
import { Controller } from 'react-hook-form';
import Dropzone from 'react-dropzone';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ImageIcon from '@material-ui/icons/Image';

function FileInput({ control, name }) {
    return (
        <Controller
            control={control}
            name={name}
            defaultValue={[]}
            render={({ field: { onChange, onBlur, value } }) => (
                <>
                    <Dropzone onDrop={onChange}>
                        {({ getRootProps, getInputProps }) => (
                            <Paper variant="outlined" {...getRootProps()}>
                                <CloudUploadIcon />
                                <input type="text" {...getInputProps()} />
                                <p>Drag 'n drop product's images here, or click to select file'</p>
                            </Paper>
                        )}
                    </Dropzone>
                    <List>
                        {value &&
                            value.map((file, index) => (
                                <ListItem key={index}>
                                    <ListItemIcon>
                                        <ImageIcon />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={`${file.name}`}
                                        secondary={`${file.size}`}
                                    />
                                </ListItem>
                            ))}
                    </List>
                </>
            )}
        />
    );
}

export default FileInput;
