import React, { useEffect, useState } from 'react';

import { DataGrid } from '@material-ui/data-grid';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import { userRows } from '../../dummyData';
import { Link, useHistory } from 'react-router-dom';

import { fetchUsers } from '../../features/users';
import { useDispatch, useSelector } from 'react-redux';
import { usersSelectors } from '../../features/users';
import { Sidebar, Topbar } from '../../components';
import './userList.css';

const UserList = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const users = useSelector(usersSelectors.selectAll);
    const [data, setData] = useState(users);

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    const handleDelete = id => {
        setData(data.filter(user => user.id !== id));
    };

    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        {
            field: 'avatar',
            headerName: 'Avatar',
            width: 200,
            renderCell: params => {
                return (
                    <div className="userListUser">
                        <img
                            src={params.row.avatar}
                            alt=""
                            className="userListImg"
                        />
                        {params.row.username}
                    </div>
                );
            },
        },
        {
            field: 'email',
            headerName: 'Email',
            width: 200,
        },
        {
            field: 'status',
            headerName: 'Status',
            width: 120,
        },
        {
            field: 'action',
            headerName: 'Action',
            width: 150,
            renderCell: params => {
                return (
                    <div className="userListAction">
                        <Link to={`/user/${params.row.id}`}>
                            <button className="userListEdit">Edit</button>
                        </Link>
                        <DeleteOutlineIcon
                            className="userListDelete"
                            onClick={() => handleDelete(params.row.id)}
                        />
                    </div>
                );
            },
        },
    ];

    return (
        <>
            <Topbar />
            <div className="container">
                <Sidebar />
                <div
                    className="userList"
                    style={{ height: 'calc(100vh - 50px)', width: '100%' }}
                >
                    <DataGrid
                        rows={data}
                        columns={columns}
                        pageSize={20}
                        disableSelectionOnClick
                        checkboxSelection
                    />
                </div>
            </div>
        </>
    );
};

export default UserList;
