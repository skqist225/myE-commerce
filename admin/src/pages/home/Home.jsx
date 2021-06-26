import React from 'react';
import FeaturedInfo from '../../components/featuredInfo/featuredInfo';
import Chart from '../../components/chart/Chart';
import WidgetSm from '../../components/widgetSm/WidgetSm';
import WidgetLg from '../../components/widgetLg/WidgetLg';
import { userData } from '../../dummyData';
import { Sidebar, Topbar } from '../../components';
import './home.css';

const Home = () => {
    return (
        <>
            <Topbar />
            <div className="container">
                <Sidebar />
                <div className="home">
                    <FeaturedInfo />
                    <Chart
                        grid={false}
                        data={userData}
                        title="User Analytics"
                        dataKey="ActiveUser"
                    />
                    <div className="homeWidgets">
                        <WidgetSm />
                        <WidgetLg />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;
