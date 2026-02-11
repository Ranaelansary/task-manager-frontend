import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

const SignupForm = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const response = await api.post('/auth/signup', { fullName, email, password });
      if (response.data.success) {
        alert('Signup successful! Please sign in.');
        navigate('/signin'); // redirect to signin
      } else {
        setError(response.data.message || 'Signup failed');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Network error');
    }
  };

  return (
    <div className="login-container">
      <h1>Sign Up</h1>
      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Full Name</label>
          <input
            type="text"
            placeholder="Enter your full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>
      <div className="footer">
        Already have an account? <a href="/signin">Sign In</a>
      </div>
    </div>
  );
};

export default SignupForm;
