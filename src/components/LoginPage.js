import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css'; // Ensure your CSS file is properly linked

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault(); // Prevent the form from submitting and refreshing the page
    // Check if the credentials are correct
    if (username === 'test' && password === 'test') {
      navigate('/home'); // Navigate to the home page if credentials match
    } else {
      alert('Incorrect username or password!'); // Alert the user if credentials do not match
    }
  };

  return (
    <div className="login-container">
      <div className="card">
        <div className="card-body">
          <h2 className="card-title text-center">Virtabot Login</h2>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label htmlFor="username" className="form-label">Username</label>
              <input
                type="text" // Changed from 'email' to 'text'
                className="form-control"
                id="username"
                value={username}
                onChange={e => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                placeholder=""
              />
            </div>

            <div className="d-grid">
              <button type="submit" className="btn btn-primary">Sign in</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
