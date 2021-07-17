import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ProtectedRoute } from './components';
import {
    Home,
    Login,
    CategoryMall,
    ViewShop,
    ShopProducts,
    ViewProduct,
    Cart,
    Checkout,
} from './pages';
import './App.css';

function App() {
    return (
        <div>
            <Router>
                <Switch>
                    <Route component={Login} path="/buyer/login" exact />{' '}
                    <ProtectedRoute component={Home} path="/" exact />
                    <ProtectedRoute component={Checkout} path="/checkout" exact />
                    <ProtectedRoute component={Cart} path="/cart" exact />
                    <ProtectedRoute component={CategoryMall} path="/:shopCategory" exact />
                    <ProtectedRoute component={ShopProducts} path="/shop/:shopId/search" exact />
                    <ProtectedRoute component={ViewShop} path="/shop/:shopName" exact />
                    <ProtectedRoute component={ViewProduct} path="/product/:productId" />
                </Switch>
            </Router>
        </div>
    );
}

export default App;
