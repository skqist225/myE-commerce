import React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import { Link } from 'react-router-dom';
import { Sidebar, Topbar } from '../../components';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import './productList.css';
import { useDispatch, useSelector } from 'react-redux';
import {
    productsSelectors,
    productTypesSelectors,
    fetchProducts,
    clearErrorMessage,
    deleteProduct,
} from '../../features/products';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { fetchTransporters, transportersSelector } from '../../features/transporters';
import { fetchCategories } from '../../features/categories';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { clearSuccessMessage } from '../../features/product';
import { createImage } from '../../helper';

export default function ProductList() {
    const dispatch = useDispatch();
    dispatch(clearSuccessMessage());

    const allProducts = useSelector(productsSelectors.selectAll);
    const productTypes = useSelector(productTypesSelectors.selectAll);
    const transporters = useSelector(transportersSelector.selectAll);

    const { successMessage } = useSelector(state => state.products);

    const rows = allProducts.map(product => {
        let _productTypes = [];
        let _transporters = [];

        productTypes.forEach(productType => {
            if (productType.productId === product._id) {
                _productTypes.push(productType);
            }
        });

        const stock = _productTypes.reduce((acc, productType) => {
            return productType.typeStock + acc;
        }, 0);

        product.transporters.forEach(transporter => {
            const _transporter = transporters.find(
                _transporter => _transporter._id.toString() === transporter.toString()
            );

            _transporters.push(_transporter);
        });

        return {
            id: product._id,
            _productTypes,
            _transporters,
            stock,
            ...product,
        };
    });

    const _columns = [
        { field: '_id', headerName: 'ID', width: 90 },
        {
            field: 'images',
            headerName: "Product's images",
            width: 200,
            renderCell: params => {
                return (
                    <div className="productListProduct">
                        {params.row.images.map(image => (
                            <img
                                src={`${process.env.REACT_APP_IMAGE_SERVER_PATH}${image}`}
                                alt={image.substring(image.lastIndexOf('/'), image.indexOf('.'))}
                                className="productListImg"
                                key={image}
                            />
                        ))}
                    </div>
                );
            },
        },
        {
            field: 'productName',
            headerName: 'Product Name',
            width: 250,
            renderCell: params => {
                return <span style={{ color: '#222' }}> {params.row.productName}</span>;
            },
        },
        {
            field: 'category',
            headerName: 'Category',
            width: 200,
            renderCell: params => {
                return <span>{params.row.category.categoryName}</span>;
            },
        },
        {
            field: 'supplier',
            headerName: 'Supplier',
            width: 170,
            renderCell: params => {
                return <span>{params.row.supplier.supplierName}</span>;
            },
        },
        {
            field: 'stock',
            headerName: 'Total Stock',
            width: 150,
        },
        {
            field: '_transporter',
            headerName: 'Transporter',
            width: 200,
            renderCell: params => {
                return (
                    <ul
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            listStyle: 'none',
                            // justifyContent: 'space-evenly',
                            marginTop: '22px',
                            // width: '100%',
                            paddingLeft: '0',
                        }}
                    >
                        {params.row._transporters.map(transporter => (
                            <li style={{ marginRight: '10px' }} key={transporter._id}>
                                <img
                                    src={createImage(transporter.transporterLogo, false)}
                                    style={{
                                        width: '50px',
                                        height: '50px',
                                        objectFit: 'cover',
                                    }}
                                    className="productListTransporterLogo"
                                />
                            </li>
                        ))}
                    </ul>
                );
            },
        },
        {
            field: '_productType',
            headerName: 'Number of type',
            width: 200,
            renderCell: params => <span>{params.row.productTypes.length}</span>,
        },
        {
            field: 'action',
            headerName: 'Action',
            width: 150,
            renderCell: params => {
                return (
                    <div className="productListAction">
                        <Link
                            to={`/product/${params.row.id}/edit`}
                            onClick={() => {
                                dispatch(clearSuccessMessage());
                                dispatch(clearErrorMessage());
                            }}
                        >
                            <button className="productListEdit">Edit</button>
                        </Link>

                        <DeleteOutlineIcon
                            className="productListDelete"
                            onClick={() => {
                                dispatch(clearSuccessMessage());
                                dispatch(clearErrorMessage());
                                dispatch(deleteProduct(params.row.id));
                            }}
                        />

                        <Link
                            to={`/product/${params.row.id}`}
                            onClick={() => {
                                dispatch(clearSuccessMessage());
                                dispatch(clearErrorMessage());
                            }}
                        >
                            <VisibilityIcon
                                style={{ width: '25px', height: '25px', marginLeft: '10px' }}
                            />
                        </Link>
                    </div>
                );
            },
        },
    ];

    const columns = _columns.map(column => ({
        ...column,
        headerClassName: 'productListHeaderTable',
    }));

    React.useEffect(() => {
        dispatch(fetchProducts());
        dispatch(fetchTransporters());
        dispatch(fetchCategories());

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

                <div className="productList" style={{ height: 'calc(100vh - 50px)', width: '80%' }}>
                    <Link to="/product/add">
                        <Fab color="primary" aria-label="add" size="medium" variant="extended">
                            <AddIcon />
                            Add Product
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
