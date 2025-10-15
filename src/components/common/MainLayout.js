import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import '../../styles/MainLayout.css';

const MainLayout = () => {
    // This function checks if the link is active and returns the correct classes
    const getLinkClass = ({ isActive }) => isActive ? "nav-link active" : "nav-link";

    return (
        <div className="main-layout">
            <main className="main-layout-content">
                <Outlet />
            </main>

            <nav className="bottom-nav">
                <NavLink to="/dashboard" className={getLinkClass}>Home</NavLink>
                <NavLink to="/analytics" className={getLinkClass}>Analytics</NavLink>
                
                <NavLink to="/add-transaction" className="add-transaction-button">+</NavLink>
                
                <NavLink to="/budget" className={getLinkClass}>Budget</NavLink>
                <NavLink to="/settings" className={getLinkClass}>Settings</NavLink>
            </nav>
        </div>
    );
};

export default MainLayout;