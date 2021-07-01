import React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import { Link } from 'react-router-dom';
import { Sidebar, Topbar } from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import {
    transportersSelector,
    fetchTransporters,
    clearErrorMessage,
    clearSuccessMessage,
} from '../../features/transporters';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

import './transporterList.css';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    button: {
        margin: theme.spacing(1),
    },
}));

function TransporterList() {
    const classes = useStyles();

    const dispatch = useDispatch();
    const allTransporters = useSelector(transportersSelector.selectAll);

    const rows = allTransporters.map(transporter => ({
        ...transporter,
        id: transporter._id,
    }));

    const handleDelete = id => {};

    const columns = [
        { field: 'id', headerName: 'ID', width: 150 },
        {
            field: 'transporterName',
            headerName: 'Transporter Name',
            width: 400,
            renderCell: params => {
                return (
                    <div className="transporterListNameImg">
                        <img
                            src={params.row.transporterLogo}
                            alt="Transport's logo"
                            className="transporterListImg"
                        />
                        <span className="transporterListName">{params.row.transporterName}</span>
                    </div>
                );
            },
        },
        {
            field: 'contactNumber',
            headerName: 'Contact Number',
            width: 200,
        },
        {
            field: 'policy',
            headerName: 'Policy',
            width: 120,
        },
        {
            field: 'transportFee',
            headerName: 'Transport Fee',
            width: 120,
        },
        {
            field: 'pickUpArea',
            headerName: 'Pickup Area',
            width: 150,
        },
        {
            field: 'deliveryArea',
            headerName: 'Delivery Area',
            width: 150,
        },
        {
            field: 'action',
            headerName: 'Action',
            width: 150,
            renderCell: params => {
                return (
                    <div className="productListAction">
                        <Link to={`/transporter/${params.row.id}/edit`}>
                            <button
                                className="productListEdit"
                                onClick={() => {
                                    dispatch(clearSuccessMessage());
                                    dispatch(clearErrorMessage());
                                }}
                            >
                                Edit Transporter
                            </button>
                        </Link>
                        {/* <DeleteOutlineIcon
                            className="productListDelete"
                            onClick={() => handleDelete(params.row.id)}
                        /> */}
                    </div>
                );
            },
        },
    ];

    React.useEffect(() => {
        dispatch(fetchTransporters());
    }, [dispatch]);

    return (
        <>
            <Topbar />
            <div className="container">
                <Sidebar />
                <div className="transporters">
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            height: '100%',
                        }}
                    >
                        <div style={{ alignSelf: 'flex-end' }}>
                            <Button
                                variant="contained"
                                color="primary"
                                size="medium"
                                className={classes.button}
                                startIcon={<AddIcon />}
                                component={Link}
                                to="/transporter/add"
                            >
                                Add Transporter
                            </Button>
                        </div>

                        <DataGrid
                            rows={rows}
                            columns={columns}
                            pageSize={20}
                            disableSelectionOnClick
                            checkboxSelection
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

export default TransporterList;
