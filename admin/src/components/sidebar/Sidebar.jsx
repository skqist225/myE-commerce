import React from 'react';
import { LineStyle, Timeline, TrendingUp, Storefront, ShoppingCart } from '@material-ui/icons';
import { Link } from 'react-router-dom';

import './sidebar.css';

const Sidebar = () => {
    return (
        <div className="sidebar">
            <div className="sidebarWrapper">
                <div className="sidebarMenu">
                    <h3 className="sidebarTitle">Dashboard</h3>
                    <ul className="sidebarList">
                        <Link to="/">
                            <li className="sidebarListItem active">
                                <LineStyle className="sidebarIcon" />
                                Home
                            </li>
                        </Link>
                        <li className="sidebarListItem">
                            <Timeline className="sidebarIcon" />
                            Analytics
                        </li>
                        <li className="sidebarListItem">
                            <TrendingUp className="sidebarIcon" />
                            Sales
                        </li>
                    </ul>
                </div>
                <div className="sidebarMenu">
                    <h3 className="sidebarTitle">Quick Menu</h3>
                    <ul className="sidebarList">
                        <Link to="/users">
                            <li className="sidebarListItem active">
                                <LineStyle className="sidebarIcon" />
                                Users
                            </li>
                        </Link>
                        <Link to="/products">
                            <li className="sidebarListItem">
                                <Timeline className="sidebarIcon" />
                                Products
                            </li>
                        </Link>
                        <Link to="/shops">
                            <li className="sidebarListItem">
                                <Storefront className="sidebarIcon" />
                                Shops
                            </li>
                        </Link>
                        <li className="sidebarListItem">
                            <i className="bi bi-bag-check sidebarIcon"></i>
                            Orders
                        </li>
                        <li className="sidebarListItem">
                            <ShoppingCart className="sidebarIcon" />
                            Carts
                        </li>
                        <Link to="/transporters">
                            <li className="sidebarListItem">
                                <ShoppingCart className="sidebarIcon" />
                                Transporters
                            </li>
                        </Link>
                        <Link to="/categories">
                            <li className="sidebarListItem">
                                <ShoppingCart className="sidebarIcon" />
                                Categories
                            </li>
                        </Link>
                        <li className="sidebarListItem">
                            <ShoppingCart className="sidebarIcon" />
                            Sales
                        </li>
                    </ul>
                </div>
                <div className="sidebarMenu">
                    <h3 className="sidebarTitle">Notifications</h3>
                    <ul className="sidebarList">
                        <li className="sidebarListItem active">
                            <LineStyle className="sidebarIcon" />
                            Home
                        </li>
                        <li className="sidebarListItem">
                            <Timeline className="sidebarIcon" />
                            Analytics
                        </li>
                        <li className="sidebarListItem">
                            <TrendingUp className="sidebarIcon" />
                            Sales
                        </li>
                    </ul>
                </div>
                <div className="sidebarMenu">
                    <h3 className="sidebarTitle">Staff</h3>
                    <ul className="sidebarList">
                        <li className="sidebarListItem active">
                            <LineStyle className="sidebarIcon" />
                            Home
                        </li>
                        <li className="sidebarListItem">
                            <Timeline className="sidebarIcon" />
                            Analytics
                        </li>
                        <li className="sidebarListItem">
                            <TrendingUp className="sidebarIcon" />
                            Sales
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
