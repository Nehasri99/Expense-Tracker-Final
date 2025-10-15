import { toast } from 'react-toastify';
export const getSpendingInsights = () => request('/expenses/insights');
const API_BASE_URL = 'http://localhost:8080';

// A helper function to handle API requests, headers, and errors
const request = async (url, options = {}) => {
    const token = localStorage.getItem('token');
    const headers = {
        'Content-Type': 'application/json',
        ...options.headers,
    };

    if (token) {
        headers['Authorization'] = token;
    }

    try {
        const response = await fetch(`${API_BASE_URL}${url}`, { ...options, headers });
        const data = await response.json();

        if (!response.ok) {
            // Handle token expiry or invalid token
            if (response.status === 403 || response.status === 401) {
                localStorage.removeItem('token');
                localStorage.removeItem('loggedInUser');
                // Force a reload to the login page
                window.location.href = '/login';
            }
            throw new Error(data.message || 'An error occurred');
        }
        return data;
    } catch (err) {
        // We throw the error so component-level logic can catch it if needed.
        throw err; 
    }
};

// --- AUTH ---
export const login = (credentials) => request('/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
});

export const signup = (userInfo) => request('/auth/signup', {
    method: 'POST',
    body: JSON.stringify(userInfo),
});


// --- EXPENSES ---
export const getExpenses = () => request('/expenses');

export const getExpensesByDateRange = (startDate, endDate) => {
    return request(`/expenses/date-range?startDate=${startDate}&endDate=${endDate}`);
};

export const addTransaction = (data) => {
    return request('/expenses', {
        method: 'POST',
        body: JSON.stringify(data),
    });
};

export const deleteExpense = (id) => {
    return request(`/expenses/${id}`, {
        method: 'DELETE',
    });
};
export const getBudgets = () => request('/budgets'); // Assuming a GET /budgets route

export const setBudget = (budgetData) => {
  return request('/budgets', {
      method: 'POST',
      body: JSON.stringify(budgetData),
  });
};

