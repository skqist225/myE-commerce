import React from 'react';
import './widgetlg.css';

const WidgetLg = () => {
    const Button = ({ type }) => {
        return <button className={`widgetLgButton ${type}`}>{type}</button>;
    };

    return (
        <div className="widgetLg">
            <h3 className="widgetTitle">Latest transactions</h3>
            <table className="widgetLgTable">
                <thead>
                    <tr className="widgetLgTr">
                        <th className="widgetLgTh">Customer</th>
                        <th className="widgetLgTh">Date</th>
                        <th className="widgetLgTh">Amount</th>
                        <th className="widgetLgTh">Status</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="widgetLgTr">
                        <td className="widgetLgUser">
                            <img
                                src="https://images.pexels.com/photos/8051957/pexels-photo-8051957.jpeg?cs=srgb&dl=pexels-anna-tarazevich-8051957.jpg&fm=jpg"
                                alt=""
                                className="widgetLgImg"
                            />
                            <span className="widgetLgName">Susan Carol</span>
                        </td>
                        <td className="widgetLgData">2 Jun 2021</td>
                        <td className="widgetLgAmount">$122.00</td>
                        <td className="widgetLgStatus">
                            <Button type={'Approved'} />
                        </td>
                    </tr>
                    <tr className="widgetLgTr">
                        <td className="widgetLgUser">
                            <img
                                src="https://images.pexels.com/photos/8051957/pexels-photo-8051957.jpeg?cs=srgb&dl=pexels-anna-tarazevich-8051957.jpg&fm=jpg"
                                alt=""
                                className="widgetLgImg"
                            />
                            <span className="widgetLgName">Susan Carol</span>
                        </td>
                        <td className="widgetLgData">2 Jun 2021</td>
                        <td className="widgetLgAmount">$122.00</td>
                        <td className="widgetLgStatus">
                            <Button type={'Declined'} />
                        </td>
                    </tr>
                    <tr className="widgetLgTr">
                        <td className="widgetLgUser">
                            <img
                                src="https://images.pexels.com/photos/8051957/pexels-photo-8051957.jpeg?cs=srgb&dl=pexels-anna-tarazevich-8051957.jpg&fm=jpg"
                                alt=""
                                className="widgetLgImg"
                            />
                            <span className="widgetLgName">Susan Carol</span>
                        </td>
                        <td className="widgetLgData">2 Jun 2021</td>
                        <td className="widgetLgAmount">$122.00</td>
                        <td className="widgetLgStatus">
                            <Button type={'Pending'} />
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default WidgetLg;
