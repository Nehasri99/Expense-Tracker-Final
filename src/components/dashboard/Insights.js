import React from 'react';

const Insights = ({ insights, isLoading }) => {
    // We no longer need the 'styles' object here

    if (isLoading) {
        return <div className="card"><p className="status-text">Analyzing insights...</p></div>;
    }

    if (!insights || insights.length === 0) {
        return null;
    }

    // Use className="card" instead of style={styles.card}
    return (
        <div className="card">
            <h3 style={{marginTop: 0}}>Financial Insights 💡</h3>
            {/* The rest of the component can have its own specific styles if needed,
                but the main container should use the global .card class.
            */}
            <ul style={{ listStyleType: 'none', padding: 0 }}>
                {insights.map((insight, index) => (
                    <li key={index} style={{
                        backgroundColor: '#f3f4f6', 
                        padding: '0.75rem', 
                        borderRadius: '6px', 
                        marginBottom: '0.5rem', 
                        color: '#4b5563'
                    }}>{insight}</li>
                ))}
            </ul>
        </div>
    );
};

export default Insights;