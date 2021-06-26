import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import MainContainer from './components/header/MainContainer';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import PrimaryButton from './components/header/PrimaryButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { useData } from './DataContext';
import Swal from 'sweetalert2';
import useWindowSize from 'react-use/lib/useWindowSize';

import Confetti from 'react-confetti';

export default function Result() {
    const { data } = useData();
    const { width, height } = useWindowSize();
    const [success, setSuccess] = React.useState(false);

    console.log(width, height);

    const entries = Object.entries(data).filter(entry => entry[0] !== 'files');

    const { files } = data;

    const onSubmit = async () => {
        const formData = new FormData();
        if (data.files) {
            data.files.forEach(file => {
                formData.append('files', file, file.name);
            });
        }

        entries.forEach(entry => {
            formData.append(entry[0], entry[1]);
        });

        setSuccess(true);
        Swal.fire('Great job', 'You are doing great');
        console.log(formData);
    };

    if (success) {
        return <Confetti width={width} height={height} />;
    }

    return (
        <MainContainer>
            <Typography component="h2" variant="h5">
                Form values
            </Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Field</TableCell>
                            <TableCell align="left">Value</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {entries.map(entry => (
                            <TableRow key={entry[0]}>
                                <TableCell>{entry[0]}</TableCell>
                                <TableCell>{entry[1].toString()}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {files && (
                <>
                    <Typography component="h2" variant="h5">
                        Files
                    </Typography>
                    <List>
                        {files.map((file, index) => (
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
            <PrimaryButton onClick={onSubmit}>Next</PrimaryButton>
        </MainContainer>
    );
}
