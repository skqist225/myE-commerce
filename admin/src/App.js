import React, { useCallback } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    useHistory,
} from 'react-router-dom';

import Home from './pages/home/Home';
import UserList from './pages/userList/UserList';
import ProductList from './pages/productList/ProductList';
import User from './pages/user/User';
import NewUser from './pages/newPage/NewUser';
import './app.css';
import { useGetPokemonByNameQuery } from './services/pokemon';
import pokemon, { all } from 'pokemon';
import Pokemon from './Pokemon';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchComments,
    commentsSelectors,
    deleteComment,
    patchComment,
    removeLikes,
    removeTagById,
    tagsSelectors,
    likesSelectors,
} from './features/comments/commentSlice';
import {
    fetchProducts,
    productsSelectors,
    deleteProduct,
    patchProduct,
    updateOneProduct,
} from './features/products/productsSlice';
import Product from './components/products/Product';
import Comment from './Comment';
import {
    UserLogin,
    ProtectedRoute,
    AddTransporter,
    TransporterList,
    AddCategory,
} from './components';
import ShopList from './components/shopList/ShopList';
import CategoryList from './components/categories/CategoryList';
import { fetchTransporters } from './features/transporters';
import { fetchCategories } from './features/categories';

function App() {
    // const dispatch = useDispatch();
    // const total = useSelector(commentsSelectors.selectTotal);
    // const allComments = useSelector(commentsSelectors.selectAll);
    // const allProducts = useSelector(productsSelectors.selectAll);
    // const singleProducts = useSelector(state =>
    //     productsSelectors.selectById(state, '60c9b76f07a1b139de112324')
    // );

    // const allLikes = useSelector(likesSelectors.selectAll);
    // const allTags = useSelector(tagsSelectors.selectAll);
    // // console.log(allLikes);
    // // console.log(allTags);

    // const selectEntities = useSelector(productsSelectors.selectEntities);
    // const selectIds = useSelector(productsSelectors.selectIds);
    // let [requestStatus, setRequestStatus] = React.useState('');

    // console.log('selectEntities', selectEntities);
    // console.log('selectIds', selectIds);

    // console.log(total);
    // console.log(allComments);
    // console.log(allProducts);
    // console.log('singleProducts', singleProducts);

    // console.table({ allLikes });

    // const onDelete = useCallback(productId => {
    //     dispatch(deleteProduct(productId)).then(data =>
    //         setRequestStatus(data.meta.requestStatus)
    //     );
    // }, []);

    // const onPatch = useCallback(product => {
    //     dispatch(
    //         updateOneProduct({
    //             id: product.productId,
    //             changes: product.productBody,
    //         })
    //     );
    // }, []);

    // const onDelete2 = useCallback(id => {
    //     dispatch(deleteComment(id));
    // }, []);

    // const onPatch2 = useCallback(newComment => {
    //     console.log(newComment);

    //     dispatch(patchComment(newComment));
    // }, []);

    // React.useEffect(() => {
    //     dispatch(fetchComments());
    // }, [dispatch]);
    // const history = useHistory();
    const dispatch = useDispatch();

    // const { isAuthenticated, user } = useSelector(state => state.auth);

    // console.log(isAuthenticated);

    React.useEffect(() => {
        dispatch(fetchTransporters());
        dispatch(fetchCategories());
        dispatch(fetchProducts());
    }, [dispatch]);

    return (
        <div>
            <Router>
                <Switch>
                    <Route path="/login" component={UserLogin} />
                    <ProtectedRoute path="/uploads/images" component={Home} />

                    {/* <ProtectedRoute path="/users" component={UserList} /> */}
                    <ProtectedRoute path="/products" component={ProductList} />
                    <ProtectedRoute
                        path="/product/:productId"
                        component={ViewProduct}
                    />
                    <ProtectedRoute path="/shops" component={ShopList} />
                    <ProtectedRoute
                        path="/transporters"
                        component={TransporterList}
                    />
                    <ProtectedRoute
                        path="/categories"
                        component={CategoryList}
                    />
                    <ProtectedRoute
                        path="/category/add"
                        component={AddCategory}
                    />
                    <ProtectedRoute
                        path="/transporter/add"
                        component={AddTransporter}
                    />

                    <ProtectedRoute path="/" exact component={Home} />
                </Switch>
            </Router>
        </div>
    );
}

export default App;
