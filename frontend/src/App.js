import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ProtectedRoute } from './components';
import { Home, Login, CategoryMall, ViewShop, ShopProducts } from './pages';

import './App.css';

function App() {
    return (
        <div>
            <Router>
                <Switch>
                    <Route component={Login} path="/buyer/login" exact />{' '}
                    <ProtectedRoute component={Home} path="/" exact />
                    <ProtectedRoute component={CategoryMall} path="/:shopCategory" exact />
                    <ProtectedRoute component={ShopProducts} path="/shop/:shopId/search" exact />
                    <ProtectedRoute component={ViewShop} path="/shop/:shopName" exact />
                </Switch>
            </Router>
        </div>
    );
}

export default App;
