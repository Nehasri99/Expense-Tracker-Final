// src/components/dashboard/TrendChart.js

import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const TrendChart = ({ data, isLoading }) => {
    const styles = {
        card: {
            backgroundColor: '#ffffff',
            borderRadius: '12px',
            padding: '1.5rem',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
        },
        statusText: {
            textAlign: 'center',
            color: '#6b7280',
            padding: '2rem 0',
        }
    };

    if (isLoading) {
        return <div style={styles.card}><p style={styles.statusText}>Loading trend chart...</p></div>;
    }

    // A function to format the Y-Axis labels with the Rupee symbol
    const formatYAxis = (tickItem) => `₹${tickItem.toLocaleString('en-IN')}`;

    return (
        <div style={styles.card}>
            <h3 style={{ marginTop: 0,marginBottom: '1.5rem' }}>Spending Trend (Last 7 Days) 📈</h3>
            <ResponsiveContainer width="100%" height={250}>
                <LineChart data={data} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />

                    {/* 1. Add the tickFormatter to the Y-Axis */}
                    <YAxis tickFormatter={formatYAxis} />
                    
                    <Tooltip formatter={(value) => `₹${value.toLocaleString('en-IN')}`} />
                    <Legend />

                    {/* 2. Update the Line component with a name and new styles */}
                    <Line 
                        type="monotone" 
                        dataKey="amount" 
                        name="Spending" /* This updates the legend */
                        stroke="#3b82f6" /* Matches your app's primary color */
                        strokeWidth={3} /* Makes the line slightly thicker */
                        activeDot={{ r: 8 }} 
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default TrendChart;