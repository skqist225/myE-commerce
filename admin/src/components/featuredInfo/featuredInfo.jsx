import React from 'react';
import { ArrowDownward } from '@material-ui/icons';
import './featuredinfo.css';

const featuredInfo = () => {
    return (
        <div className="featured">
            <div className="featuredItem">
                <span className="featureTitle">Revanue</span>
                <div className="featuredMoneyContainer">
                    <span className="featuredMoney">$2,415</span>
                    <span className="featuredMoneyRate">
                        -11.4
                        <ArrowDownward />
                    </span>
                </div>
                <span className="featuredSub">Compared to last month</span>
            </div>
        </div>
    );
};

export default featuredInfo;
