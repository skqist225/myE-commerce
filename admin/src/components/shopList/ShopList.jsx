import React from 'react';
import {
    fetchShops,
    shopsSelectors,
    clearSuccessMessage,
    clearErrorMessage,
    approveShop,
    cancelShopRequest,
} from '../../features/shops';
import { DataGrid } from '@material-ui/data-grid';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import { Link } from 'react-router-dom';
import { Sidebar, Topbar } from '..';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import { useDispatch, useSelector } from 'react-redux';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import CancelIcon from '@material-ui/icons/Cancel';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import CheckIcon from '@material-ui/icons/Check';
import './shopList.css';
import { setViewedShopId } from '../../features/shop';
import slugify from 'slugify';

function ShopList() {
    const dispatch = useDispatch();
    dispatch(clearSuccessMessage());
    const allShops = useSelector(shopsSelectors.selectAll);
    const { successMessage, errorMessage, loading } = useSelector(state => state.shops);

    const rows = allShops.map(shop => ({ id: shop._id, ...shop }));

    const columns = [
        // { field: '_id', headerName: 'ID', width: 90 },
        {
            field: 'shopName',
            headerName: 'Shop Name',
            width: 200,
            renderCell: params => {
                const { shopLogo } = params.row;
                return (
                    <div className="productListProduct">
                        <img
                            src={`${process.env.REACT_APP_IMAGE_SERVER_PATH}${shopLogo}`}
                            alt=""
                            className="productListImg"
                        />
                        {params.row.shopName}
                    </div>
                );
            },
        },
        {
            field: 'shopDescription',
            headerName: "Shop's description",
            width: 200,
            renderCell: params => {
                return <span>{params.row.shopDescription}</span>;
            },
        },
        {
            field: 'homeImage',
            headerName: 'Home images',
            width: 200,
            renderCell: params => {
                return (
                    <div className="shopListHomeImage">
                        {params.row.homeImages.map((image, index) => (
                            <img
                                src={`${process.env.REACT_APP_IMAGE_SERVER_PATH}${image}`}
                                alt={image}
                                key={image + index}
                            />
                        ))}
                    </div>
                );
            },
        },
        {
            field: 'vouchers',
            headerName: "Total shop's vouchers",
            width: 170,
            renderCell: params => {
                return <span>{params.row.vouchers.length}</span>;
            },
        },
        {
            field: 'followers_nbm',
            headerName: 'Total followers',
            width: 200,
        },
        {
            field: 'isApproved',
            headerName: 'Approved',
            width: 150,
            renderCell: params => {
                const { isApproved } = params.row;

                return (
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '100%',
                        }}
                    >
                        {isApproved ? <CheckIcon className="shopListApproved" /> : 'Waiting'}
                    </div>
                );
            },
        },
        {
            field: 'action',
            headerName: 'Action',
            width: 200,
            renderCell: params => {
                return (
                    <div className="productListAction">
                        <Link to={`/shop/${params.row.id}/edit`}>
                            <button
                                className="productListEdit"
                                onClick={() => {
                                    dispatch(clearErrorMessage());
                                    dispatch(clearSuccessMessage());
                                }}
                            >
                                Edit Shop
                            </button>
                        </Link>
                        <Link
                            to={`/shop/${slugify(params.row.shopName, {
                                replacement: '_',
                                lower: true,
                            })}`}
                        >
                            <button
                                className="productListEdit"
                                onClick={() => {
                                    dispatch(clearErrorMessage());
                                    dispatch(clearSuccessMessage());
                                    dispatch(setViewedShopId(params.row._id));
                                }}
                            >
                                View Shop
                            </button>
                        </Link>
                    </div>
                );
            },
        },
        {
            field: 'approvedShop',
            headerName: 'Approve Shop',
            width: 150,
            renderCell: params => {
                return (
                    <div className="productListAction">
                        {params.row.isApproved === false ? (
                            <>
                                <ThumbUpIcon onClick={() => dispatch(approveShop(params.row.id))} />
                                <CancelIcon
                                    onClick={() => dispatch(cancelShopRequest(params.row.id))}
                                />
                            </>
                        ) : (
                            <span>No action</span>
                        )}
                    </div>
                );
            },
        },
    ];

    React.useEffect(() => {
        dispatch(fetchShops());

        if (successMessage) {
            NotificationManager.success(successMessage, 'Click me!', 4000, () => {
                dispatch(clearSuccessMessage());
            });
        }
    }, [dispatch, successMessage]);

    return (
        <>
            <Topbar />
            <div className="container">
                <Sidebar />
                <div className="shopList">
                    <Link to="/shop/add">
                        <Fab color="primary" aria-label="add" size="medium" variant="extended">
                            <AddIcon />
                            Add Shop
                        </Fab>
                    </Link>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={20}
                        disableSelectionOnClick
                        checkboxSelection
                    />
                    {successMessage && <NotificationContainer />}
                </div>
            </div>
        </>
    );
}

export default ShopList;
