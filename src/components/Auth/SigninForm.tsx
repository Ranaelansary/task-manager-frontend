import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { signin } from '../../services/authService';

const SigninForm = () => {
  const navigate = useNavigate();
  const { setUser, login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const data = await signin(email, password);
      // use context login helper to set token, user and navigate
      if (login) {
        login(data.fullName, data.token);
      } else {
        localStorage.setItem('token', data.token);
        localStorage.setItem('userName', data.fullName);
        setUser(data.fullName);
        navigate('/tasks');
      }
    } catch (err: any) {
      const resp = err.response;
      let errorMsg = 'Signin failed';
      if (resp) {
        const status = resp.status;
        const serverMessage = resp.data?.message;
        const validationErrors = resp.data?.errors;
        errorMsg = `${status} - ${serverMessage || ''}`;
        if (validationErrors) {
          const details = validationErrors.map((e: any) => `${e.field}: ${e.messages.join(', ')}`).join(' | ');
          errorMsg += ` (${details})`;
        }
      } else if (err.message) {
        errorMsg = err.message;
      }
      setError(errorMsg);
      alert(errorMsg);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">Sign In</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
};

export default SigninForm;
