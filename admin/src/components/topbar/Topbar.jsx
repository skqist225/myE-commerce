import React from 'react';
import './topbar.css';
import { Language, Settings, NotificationsNone } from '@material-ui/icons';

const Topbar = () => {
    return (
        <div className="topbar">
            <div className="topbarWrapper">
                <div className="topLeft logo">myE-commerceAdmin</div>
                <div className="topRight">
                    <div className="topbarIconContainer">
                        <NotificationsNone />
                        <span className="topIconBadge">2</span>
                    </div>
                    <div className="topbarIconContainer">
                        <Language />
                        <span className="topIconBadge">2</span>
                    </div>
                    <div className="topbarIconContainer">
                        <Settings />
                    </div>
                    <img
                        src="https://images.pexels.com/photos/6450022/pexels-photo-6450022.jpeg?cs=srgb&dl=pexels-thuanny-gantuss-6450022.jpg&fm=jpg"
                        alt="userAvatar"
                        className="topAvatar"
                    />
                </div>
            </div>
        </div>
    );
};

export default Topbar;
