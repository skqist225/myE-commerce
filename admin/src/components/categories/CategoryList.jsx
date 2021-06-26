import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import MaterialTable from 'material-table';
import {
    fetchCategories,
    categoriesSelectors,
} from '../../features/categories';

function CategoryList() {
    const dispatch = useDispatch();
    const history = useHistory();
    const allCategories = useSelector(categoriesSelectors.selectAll);

    const columns = [
        { title: 'Category name', field: 'categoryName' },
        {
            title: 'Category image',
            field: 'categoryImage',
            render: rowData => {
                return rowData.categoryImage ? (
                    <img
                        src={`${process.env.REACT_APP_IMAGE_SERVER_PATH}${rowData.categoryImage}`}
                        style={{ width: 50, borderRadius: '50%' }}
                    />
                ) : (
                    <span style={{ color: 'blue' }}>No image</span>
                );
            },
        },
        {
            title: 'Type',
            field: 'parentId',
            render: rowData =>
                !rowData.parentId ? <span>Parent</span> : <span>Children</span>,
        },
    ];

    const data = allCategories.map(category => ({
        ...category,
        id: category._id,
    }));

    // React.useEffect(() => {
    //     dispatch(fetchCategories());
    // }, [dispatch]);

    return (
        <div>
            <MaterialTable
                title="Categories"
                data={data}
                columns={columns}
                parentChildData={(row, rows) =>
                    rows.find(a => a.id === row.parentId)
                }
                options={{
                    selection: true,
                }}
                actions={[
                    rowData => ({
                        icon: 'delete',
                        tooltip: 'Delete User',
                        isFreeAction: true,
                        onClick: (event, rowData) => {},
                        // confirm('You want to delete ' + rowData.name),
                        // disabled: rowData.birthYear < 2000,
                    }),
                    {
                        icon: 'add',
                        tooltip: 'Add Category',
                        isFreeAction: true,
                        onClick: event => {
                            history.push('/category/add');
                        },
                    },
                ]}
            />
        </div>
    );
}

export default CategoryList;
