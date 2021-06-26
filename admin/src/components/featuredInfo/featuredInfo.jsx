import React from 'react';
import { ArrowDownward, ArrowUpward } from '@material-ui/icons';
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
                        <ArrowDownward className="featuredIcon negative" />
                    </span>
                </div>
                <span className="featuredSub">Compared to last month</span>
            </div>
            <div className="featuredItem">
                <span className="featureTitle">Cost</span>
                <div className="featuredMoneyContainer">
                    <span className="featuredMoney">$10,415</span>
                    <span className="featuredMoneyRate">
                        +5.4
                        <ArrowUpward className="featuredIcon" />
                    </span>
                </div>
                <span className="featuredSub">Compared to last month</span>
            </div>
            <div className="featuredItem">
                <span className="featureTitle">Sales</span>
                <div className="featuredMoneyContainer">
                    <span className="featuredMoney">4,415</span>
                    <span className="featuredMoneyRate">
                        +2.4
                        <ArrowDownward className="featuredIcon negative" />
                    </span>
                </div>
                <span className="featuredSub">Compared to last month</span>
            </div>
        </div>
    );
};

export default featuredInfo;
