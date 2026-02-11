import React from 'react';
import { Link } from 'react-router-dom';
import SigninForm from '../components/Auth/SigninForm';

const SigninPage = () => {
  return (
    <div className="login-container">
      <h1> Welcome to Task Manager </h1>
      <p style={{ textAlign: 'center', marginBottom: '20px' }}>
        Sign in to organize your tasks 
      </p>

      <SigninForm />

      <div className="footer">
        <p>
          Don’t have an account?{' '}
          <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default SigninPage;
