import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    // Check for the authentication token in local storage.
    const token = localStorage.getItem('token');

    // If a token exists, render the child components (the protected page).
    // Otherwise, use the Navigate component to redirect the user to the /login route.
    return token ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;