import React from 'react';
import { GoogleLogin } from '@react-oauth/google';

const LoginPage = () => {
  const handleLoginSuccess = async (response) => {
    const { credential } = response;

    try {
      const res = await fetch('http://localhost:5000/signup', { // Updated URL
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: credential }),
      });

      const data = await res.json();
      console.log('Login Successful:', data);

      localStorage.setItem('authToken', data.token); // Store JWT token
    } catch (err) {
      console.error('Login failed', err);
    }
  };

  return (
    <div>
      <GoogleLogin
        onSuccess={handleLoginSuccess}
        onError={() => console.error('Google Login Error')}
      />
    </div>
  );
};

export default LoginPage;
