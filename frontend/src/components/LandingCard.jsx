import React, { useState } from 'react';

const LandingCard = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [messages, setMessages] = useState([]);
    const [messageCategory, setMessageCategory] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (response.ok) {
                setMessages([data.message]); // Success message
                setMessageCategory('success');
                // Redirect user or take further action here
            } else {
                setMessages([data.error || 'Login failed.']);
                setMessageCategory('error');
            }
        } catch (error) {
            setMessages(['An error occurred. Please try again.']);
            setMessageCategory('error');
        }
    };

    return (
        <div className="login-container">
            <h1>Login</h1>

            {messages.length > 0 && (
                <div className="flash-messages">
                    {messages.map((message, idx) => (
                        <div key={idx} className={`flash-message ${messageCategory}`}>
                            {message}
                        </div>
                    ))}
                </div>
            )}

            <form onSubmit={handleLogin}>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <button type="submit">Login</button>
            </form>

            <p>
                Don't have an account?{' '}
                <a href="/register">Register here</a> {/* Update the endpoint as required */}
            </p>
        </div>
    );
};

export default LandingCard;