import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleSuccess, handleError } from '../utils/toastUtils';
import { signup } from '../api/apiService';
import '../styles/Auth.css';
function SignupPage() {
    const [signupInfo, setSignupInfo] = useState({ name: '', email: '', password: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSignupInfo({ ...signupInfo, [name]: value });
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        const { name, email, password } = signupInfo;
        if (!name || !email || !password) {
            return handleError('All fields are required');
        }

        try {
            const data = await signup(signupInfo);
            if (data.success) {
                handleSuccess(data.message);
                setTimeout(() => navigate('/login'), 1000); // Redirect to login after successful signup
            }
        } catch (err) {
            handleError(err.message || 'Signup failed. Please try again.');
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-container">
                <h1>Signup</h1>
                <form onSubmit={handleSignup}>
                    <div>
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={signupInfo.name}
                            onChange={handleChange}
                            placeholder="Enter your name"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={signupInfo.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={signupInfo.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    <button type="submit">Signup</button>
                    <span>
                        Already have an account? <Link to="/login">Login</Link>
                    </span>
                </form>
                <ToastContainer />
            </div>
        </div>
    );
}

export default SignupPage;