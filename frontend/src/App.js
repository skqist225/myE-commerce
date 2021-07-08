import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { Home } from './pages';

import './App.css';

function App() {
    return (
        <div>
            <Router>
                <Switch>
                    <Route component={Home} path="/" exact />
                </Switch>
            </Router>
        </div>
    );
}

export default App;
