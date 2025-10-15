import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

// import { handleSuccess } from '../../utils/toastUtils';

function Header({ onFilter, onResetFilter, onLogout }) {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const loggedInUser = localStorage.getItem('loggedInUser') || 'User';

    const handleFilterClick = () => {
        if (!startDate || !endDate) {
            return toast.warn("Please select both start and end dates.");
        }
        if (new Date(startDate) > new Date(endDate)) {
            return toast.warn("Start date cannot be after end date.");
        }
        onFilter(startDate, endDate);
    };
    
    // This function will clear the date inputs and call the onResetFilter function from props
    const handleReset = () => {
        setStartDate('');
        setEndDate('');
        onResetFilter(); // FIX: This now correctly calls the function passed from the parent.
        toast.info("Filters have been reset.");
    };

    const handleExport = () => {
    const token = localStorage.getItem('token');
    if (!token) {
        return toast.error("You must be logged in to export data.");
    }

    // 1. Use the base URL consistent with your apiService.js (No '/api')
    let exportUrl = `http://localhost:8080/expenses/export`;
    if (startDate && endDate) {
        exportUrl += `?startDate=${startDate}&endDate=${endDate}`;
    }
    
    fetch(exportUrl, {
        headers: {
            // 2. Match the Authorization header format used in your apiService.js
            'Authorization': token 
        }
    })
    .then(response => {
        if (!response.ok) {
            // Try to get a more specific error message from the backend if available
            return response.json().then(err => { throw new Error(err.message || "Export failed.") });
        }
        return response.blob();
    })
    .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = 'expenses.csv';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
        toast.success("Expenses exported successfully!");
    })
    .catch((err) => toast.error(err.message || 'Could not download the file.'));
};

    return (
        <div className="card header-section">
            <div className="header-top">
                <h1>Welcome, {loggedInUser}</h1>
                <button onClick={onLogout} className="logout-btn">Logout</button>
            </div>
            <div className="filter-controls">
                <label>Start Date:</label>
                <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                <label>End Date:</label>
                <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                <button onClick={handleFilterClick} className="btn-primary">Filter</button>
                <button onClick={handleReset} className="btn-secondary">Reset</button>
                <button onClick={handleExport} className="btn-secondary">Export as CSV</button>
            </div>
        </div>
    );
}

export default Header;

