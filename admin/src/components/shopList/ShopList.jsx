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
import { Link } from 'react-router-dom';
import { Sidebar, Topbar } from '..';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import { useDispatch, useSelector } from 'react-redux';

import { NotificationContainer, NotificationManager } from 'react-notifications';
import { Cancel, Check, ThumbUp } from '@material-ui/icons';
import slugify from 'slugify';
import './shopList.css';

function ShopList() {
    const dispatch = useDispatch();
    dispatch(clearSuccessMessage());
    const allShops = useSelector(shopsSelectors.selectAll);
    const { successMessage, errorMessage, loading, shops_productsLength } = useSelector(
        state => state.shops
    );

    console.log(shops_productsLength);

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
            width: 120,
            renderCell: params => {
                return <span>{params.row.vouchers.length}</span>;
            },
        },
        {
            field: 'followers_nbm',
            headerName: 'Total followers',
            width: 100,
        },
        {
            field: 'totalProducts',
            headerName: 'Total products',
            width: 100,
            rencerCell: params => {
                return <span>{params.row.totalProducts}</span>;
            },
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
                        {isApproved ? <Check className="shopListApproved" /> : 'Waiting'}
                    </div>
                );
            },
        },
        {
            field: 'action',
            headerName: 'Action',
            width: 250,
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
                                Edit
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
                                }}
                            >
                                View
                            </button>
                        </Link>
                        <Link to={'/shop'}>
                            <button
                                className="productListEdit"
                                onClick={() => {
                                    dispatch(clearErrorMessage());
                                    dispatch(clearSuccessMessage());
                                }}
                            >
                                Manage
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
                                <ThumbUp onClick={() => dispatch(approveShop(params.row.id))} />
                                <Cancel
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
