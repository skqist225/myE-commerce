import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import UserList from './pages/userList/UserList';
import ProductList from './pages/productList/ProductList';
import User from './pages/user/User';
import './app.css';
import { useDispatch, useSelector } from 'react-redux';
import {
    UserLogin,
    ProtectedRoute,
    ProtectedRouteWithLayout,
    AddTransporter,
    TransporterList,
    AddCategory,
    ViewProduct,
    CategoryList,
    ShopList,
    AddProduct,
    EditProduct,
    AddShop,
    EditShop,
    ViewShop,
    ShopProducts,
    EditTransporter,
} from './components';
import { fetchCategories } from './features/categories';
import { fetchTransporters } from './features/transporters';
import SaleChannel from './pages/shop/SaleChannel';
import AllOrder from './pages/shop/AllOrder';

function App() {
    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(fetchTransporters());
        dispatch(fetchCategories());
    }, [dispatch]);

    return (
        <div>
            <Router>
                <Switch>
                    <Route path="/login" component={UserLogin} />
                    <ProtectedRoute path="/uploads/images" component={Home} />

                    <ProtectedRoute path="/users" component={UserList} />
                    <ProtectedRoute path="/user/account/profile" component={User} exact />

                    <ProtectedRoute path="/products" component={ProductList} />
                    <ProtectedRoute path="/product/add" component={AddProduct} exact />
                    <ProtectedRoute path="/product/:productId/edit" component={EditProduct} />

                    <ProtectedRoute path="/product/:productId" component={ViewProduct} />

                    <ProtectedRoute path="/shop/add" component={AddShop} exact />
                    {/* <ProtectedRoute path="/shop" component={SaleChannel} exact /> */}

                    <ProtectedRoute path="/shop/:shopId/edit" component={EditShop} exact />
                    <ProtectedRoute path="/shop/:shopId/search" component={ShopProducts} exact />
                    <ProtectedRoute path="/shop/:shopName" component={ViewShop} exact />
                    <ProtectedRouteWithLayout
                        parent={SaleChannel}
                        path={`/shop/sale/order`}
                        component={AllOrder}
                        exact={true}
                    />

                    <ProtectedRoute path="/shops" component={ShopList} exact />
                    <ProtectedRoute path="/transporters" component={TransporterList} />
                    <ProtectedRoute
                        path="/transporter/:transporterId/edit"
                        component={EditTransporter}
                    />

                    <ProtectedRoute path="/categories" component={CategoryList} />
                    <ProtectedRoute path="/category/add" component={AddCategory} />
                    <ProtectedRoute path="/transporter/add" component={AddTransporter} />

                    <ProtectedRoute path="/" exact component={Home} />
                </Switch>
            </Router>
        </div>
    );
}

export default App;
