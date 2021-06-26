import React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import { productRows } from '../../dummyData';
import { Link } from 'react-router-dom';
import { Sidebar, Topbar } from '../../components';

import './productList.css';
import { useDispatch, useSelector } from 'react-redux';
import {
    productsSelectors,
    productTypesSelectors,
    fetchProducts,
    clearErrorMessage,
} from '../../features/products';
import VisibilityIcon from '@material-ui/icons/Visibility';

import { transportersSelector } from '../../features/transporters';

export default function ProductList() {
    const dispatch = useDispatch();
    const allProducts = useSelector(productsSelectors.selectAll);
    const productTypes = useSelector(productTypesSelectors.selectAll);
    const transporters = useSelector(transportersSelector.selectAll);

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
                _transporter =>
                    _transporter._id.toString() === transporter.toString()
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

    const handleDelete = id => {
        // const newArray = ;
        // setData(data.filter(product => product.id !== id));
    };

    const _columns = [
        { field: '_id', headerName: 'ID', width: 90 },
        {
            field: 'productName',
            headerName: 'Product Name',
            width: 200,
            renderCell: params => {
                return (
                    <div className="productListProduct">
                        {params.row.images.map(image => (
                            <img
                                src={`${process.env.REACT_APP_IMAGE_SERVER_PATH}${image}`}
                                alt={image.substring(
                                    image.lastIndexOf('/'),
                                    image.indexOf('.')
                                )}
                                className="productListImg"
                                key={image}
                            />
                        ))}
                        {params.row.productName}
                    </div>
                );
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
                            <li style={{ marginRight: '10px' }}>
                                <img
                                    src={`${process.env.REACT_APP_IMAGE_SERVER_PATH}${transporter.transporterLogo}`}
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
                        <Link to={`/product/${params.row.id}/edit`}>
                            <button className="productListEdit">Edit</button>
                        </Link>
                        <DeleteOutlineIcon
                            className="productListDelete"
                            onClick={() => handleDelete(params.row.id)}
                        />
                        <Link to={`/product/${params.row.id}`}>
                            <VisibilityIcon />
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
    }, [dispatch]);

    return (
        <>
            <Topbar />
            <div className="container">
                <Sidebar />
                <div
                    className="productList"
                    style={{ height: 'calc(100vh - 50px)', width: '80%' }}
                >
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={20}
                        disableSelectionOnClick
                        checkboxSelection
                    />
                </div>
            </div>
        </>
    );
}
