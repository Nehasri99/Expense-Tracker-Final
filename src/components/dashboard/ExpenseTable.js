import React from 'react';

// Helper function to format dates safely, using createdAt as a fallback
const formatDateSafely = (dateValue, createdAtValue) => {
    // 1. Prioritize the 'date' field if it exists and is valid
    if (dateValue != null) { 
        try {
            const dateObj = new Date(dateValue);
            if (!isNaN(dateObj.getTime())) {
                // Format valid 'date' field
                return dateObj.toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric' });
            } 
            // If dateValue exists but is invalid, log it and try createdAt
            console.warn(`Invalid format in 'date' field: "${dateValue}". Falling back to createdAt.`);
        } catch (error) {
            console.error("Error parsing 'date' field:", dateValue, error);
            // Fallback to createdAt if an error occurs
        }
    }

    // 2. If 'date' is missing or invalid, try using 'createdAt'
    if (createdAtValue != null) {
        try {
            const createdAtObj = new Date(createdAtValue);
            if (!isNaN(createdAtObj.getTime())) {
                // Format valid 'createdAt' field
                return createdAtObj.toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric' });
            } else {
                 console.warn(`Invalid format in 'createdAt' field: "${createdAtValue}"`);
                 return 'Invalid CreatedAt'; // Indicate createdAt was also bad
            }
        } catch (error) {
             console.error("Error parsing 'createdAt' field:", createdAtValue, error);
             return 'Error';
        }
    }

    // 3. If neither field is valid or present, return 'N/A'
    return 'N/A';
};

const ExpenseTable = ({ expenses, deleteExpense, isLoading }) => {
    if (isLoading) return <div className="card"><p className="status-text">Loading transactions...</p></div>;
    
    // Ensure expenses is an array before processing
    const validExpenses = Array.isArray(expenses) ? expenses : [];
    
    if (validExpenses.length === 0) return <div className="card"><p className="status-text">No transactions found.</p></div>;

    // Sort expenses, handling potential invalid dates during comparison
    const sortedExpenses = [...validExpenses].sort((a, b) => {
        try {
            // Prioritize 'date', fallback to 'createdAt' for sorting
            const dateAValue = (a && a.date != null) ? a.date : (a && a.createdAt != null ? a.createdAt : null);
            const dateBValue = (b && b.date != null) ? b.date : (b && b.createdAt != null ? b.createdAt : null);

            const dateA = dateAValue ? new Date(dateAValue) : null;
            const dateB = dateBValue ? new Date(dateBValue) : null;

            // Handle cases where one or both dates are invalid/missing for sorting
            if (!dateA || isNaN(dateA.getTime())) return 1; // Put entries without valid date later
            if (!dateB || isNaN(dateB.getTime())) return -1; // Keep entries with valid date earlier

            return dateB - dateA; // Sort valid dates descending (newest first)
        } catch (error) {
            console.error("Error sorting dates:", a, b, error);
            return 0; // Don't change order if an error occurs
        }
    });

    // Log the received expenses data once per render for debugging
    console.log("Expenses data received by table:", validExpenses); 

    return (
        <div className="card expense-table-container">
            <h2>Transaction History</h2>
            <table className="expense-table">
                <thead>
                    <tr>
                        <th>Type</th>
                        <th>Details</th>
                        <th>Category</th>
                        <th>Date</th>
                        <th>Payment Method</th>
                        <th>Amount</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>{
                    sortedExpenses.map((transaction) => (
                        // Basic check for valid transaction object and ID
                        transaction && transaction._id ? (
                            <tr key={transaction._id}>
                                <td className={`transaction-type ${transaction.amount > 0 ? 'income' : 'expense'}`}>
                                    {transaction.amount > 0 ? '▲' : '▼'}
                                </td>
                                <td>{transaction.text || 'N/A'}</td>
                                <td>{transaction.category || 'N/A'}</td>
                                {/* Pass both date and createdAt to the helper */}
                                <td>{formatDateSafely(transaction.date, transaction.createdAt)}</td> 
                                <td>{transaction.paymentMethod || 'N/A'}</td>
                                <td className={transaction.amount > 0 ? 'positive' : 'negative'}>
                                    {/* Handle potential missing amount */}
                                    ₹{Math.abs(transaction.amount || 0).toFixed(2)} 
                                </td>
                                <td>
                                    <button className="delete-button" onClick={() => deleteExpense(transaction._id)}>&times;</button>
                                </td>
                            </tr>
                        ) : null // Skip rendering if transaction object or _id is missing/invalid
                    ))
                }</tbody>
            </table>
        </div>
    );
};

export default ExpenseTable;