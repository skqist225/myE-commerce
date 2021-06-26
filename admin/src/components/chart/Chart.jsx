import React, { PureComponent } from 'react';
import {
    LineChart,
    Line,
    XAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';

import './chart.css';

const Chart = ({ title, data, dataKey, grid }) => {
    return (
        <div className="chart">
            <h3 className="chartTitle">{title}</h3>{' '}
            <ResponsiveContainer width="100%" height="100%" aspect={4 / 1}>
                <LineChart
                    width={500}
                    height={300}
                    data={data}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    {grid && (
                        <CartesianGrid strokeDasharray="3 3" stroke="#e0dfdf" />
                    )}
                    <XAxis dataKey="name" stroke="#5550bd" />
                    <Tooltip />
                    <Line type="monotone" dataKey={dataKey} stroke="#82ca9d" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default Chart;
