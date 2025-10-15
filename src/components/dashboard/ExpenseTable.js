// In /src/components/dashboard/ExpenseTable.js
import React from 'react';

const ExpenseTable = ({ expenses, deleteExpense, isLoading }) => {
    if (isLoading) return <div className="card"><p className="status-text">Loading transactions...</p></div>;
    if (!expenses || expenses.length === 0) return <div className="card"><p className="status-text">No transactions found.</p></div>;

    const sortedExpenses = [...expenses].sort((a, b) => new Date(b.date) - new Date(a.date));

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
                        <th>Payment Method</th> {/* New header */}
                        <th>Amount</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedExpenses.map((transaction) => (
                        <tr key={transaction._id}>
                            <td className={`transaction-type ${transaction.amount > 0 ? 'income' : 'expense'}`}>
                                {transaction.amount > 0 ? '▲' : '▼'}
                            </td>
                            <td>{transaction.text}</td>
                            <td>{transaction.category || 'N/A'}</td>
                            <td>{new Date(transaction.date).toLocaleDateString()}</td>
                            <td>{transaction.paymentMethod || 'N/A'}</td> {/* New cell */}
                            <td className={transaction.amount > 0 ? 'positive' : 'negative'}>
                                ₹{Math.abs(transaction.amount).toFixed(2)}
                            </td>
                            <td>
                                <button className="delete-button" onClick={() => deleteExpense(transaction._id)}>&times;</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ExpenseTable;