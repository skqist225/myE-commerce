import React, { Fragment, createContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Header } from '../../components';

import { CategoryMallBody } from '../../components';
import { fetchMallShops, mallShopsSelectors } from '../../features/mallShops/mallShopsSlice';

export const MallShopsContext = createContext();

function CategoryMall({ match }) {
    const { shopCategory } = match.params;
    const mallShops = useSelector(mallShopsSelectors.selectAll);

    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(fetchMallShops(shopCategory));
    }, [dispatch, shopCategory]);

    return (
        <Fragment>
            <Header></Header>

            <MallShopsContext.Provider
                value={{
                    mallShops,
                    shopCategory,
                }}
            >
                <CategoryMallBody />
            </MallShopsContext.Provider>
        </Fragment>
    );
}

export default CategoryMall;
