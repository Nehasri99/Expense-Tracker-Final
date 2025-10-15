import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF'];

const ExpenseChart = ({ data, isLoading }) => {
    if (isLoading) {
        return <div className="card"><p className="status-text">Loading Chart...</p></div>;
    }
    
    if (!data || data.length === 0) {
        return (
            <div className="card">
                <h3 style={{marginTop: 0}}>Expense Summary</h3>
                <p className="status-text">No expense data to display.</p>
            </div>
        );
    }

    // Use className="card" to support dark mode
    return (
        <div className="card">
            <h3 style={{marginTop: 0}}>Expense Summary by Category</h3>
            <ResponsiveContainer width="100%" height={300}>
                {/* The margin prevents labels from being cut off */}
                <PieChart margin={{ top: 5, right: 30, left: 30, bottom: 5 }}>
                    {/* All the chart components are now restored below */}
                    <Pie 
                        data={data} 
                        dataKey="value" 
                        nameKey="name" 
                        cx="50%" 
                        cy="50%" 
                        outerRadius={90} 
                        labelLine={false} 
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                        {data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                    </Pie>
                    <Tooltip formatter={(value) => `₹${value.toLocaleString('en-IN')}`} />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default ExpenseChart;