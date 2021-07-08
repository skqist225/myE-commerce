import React, { useEffect, useState } from 'react';

import { DataGrid } from '@material-ui/data-grid';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';

import { Link } from 'react-router-dom';

import { fetchUsers } from '../../features/users';
import { useDispatch, useSelector } from 'react-redux';
import { usersSelectors } from '../../features/users';
import { Sidebar, Topbar } from '../../components';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import WarningIcon from '@material-ui/icons/Warning';
import './userList.css';

const UserList = () => {
    const dispatch = useDispatch();
    const users = useSelector(usersSelectors.selectAll);

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    const rows = users.map(user => ({ id: user._id, ...user }));

    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        {
            field: 'avatar',
            headerName: 'Avatar',
            width: 100,
            renderCell: params => {
                return (
                    <div className="userListUser">
                        <img src={params.row.avatar} alt="" className="userListImg" />
                    </div>
                );
            },
        },
        {
            field: 'username',
            headerName: 'Username',
            width: 170,
        },
        {
            field: 'email',
            headerName: 'Email',
            width: 300,
        },
        {
            field: 'phoneNumber',
            headerName: 'Phone number',
            width: 170,
        },
        {
            field: 'gender',
            headerName: 'Gender',
            width: 150,
            renderCell: params => {
                return <p>{params.row.gender}</p>;
            },
        },
        {
            field: 'isEmailVerified',
            headerName: 'Verified Account',
            width: 150,
            renderCell: params => {
                return (
                    <p className="userListIsVerifiedAccount">
                        {params.row.isEmailVerified ? (
                            <VerifiedUserIcon className="verifiedIcon" />
                        ) : (
                            <WarningIcon className="warningIcon" />
                        )}
                    </p>
                );
            },
        },
        {
            field: 'role',
            headerName: 'Role',
            width: 150,
            renderCell: params => {
                const { role } = params.row;
                let className = '';
                if (role === 'admin') className = 'userListRole admin';
                if (role === 'shop') className = 'userListRole shop';
                if (role === 'user') className = 'userListRole userRole';

                return <span className={className}>{params.row.role}</span>;
            },
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
                <div className="userList" style={{ height: 'calc(100vh - 50px)', width: '100%' }}>
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
};

export default UserList;
