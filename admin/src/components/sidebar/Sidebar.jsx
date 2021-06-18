import React from 'react';
import {
    LineStyle,
    Timeline,
    TrendingUp,
    Storefront,
    ShoppingCart,
} from '@material-ui/icons';

import './sidebar.css';

const Sidebar = () => {
    return (
        <div className="sidebar">
            <div className="sidebarWrapper">
                <div className="sidebarMenu">
                    <h3 className="sidebarTitle">Dashboard</h3>
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
                    <h3 className="sidebarTitle">Quick Menu</h3>
                    <ul className="sidebarList">
                        <li className="sidebarListItem active">
                            <LineStyle className="sidebarIcon" />
                            Users
                        </li>
                        <li className="sidebarListItem">
                            <Timeline className="sidebarIcon" />
                            Products
                        </li>
                        <li className="sidebarListItem">
                            <Storefront className="sidebarIcon" />
                            Shops
                        </li>
                        <li className="sidebarListItem">
                            <i className="bi bi-bag-check sidebarIcon"></i>
                            Orders
                        </li>
                        <li className="sidebarListItem">
                            <ShoppingCart className="sidebarIcon" />
                            Carts
                        </li>
                        <li className="sidebarListItem">
                            <ShoppingCart className="sidebarIcon" />
                            Transporters
                        </li>
                        <li className="sidebarListItem">
                            <ShoppingCart className="sidebarIcon" />
                            Categories
                        </li>
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
