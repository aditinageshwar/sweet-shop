import React from 'react';
import AuthForm from '../components/AuthForm';

const Login = ({ setIsLoggedIn, setIsAdmin }) => (
  <div className="flex items-center justify-center min-h-screen">
    <AuthForm setIsLoggedIn={setIsLoggedIn} setIsAdmin={setIsAdmin}/>
  </div>
);

export default Login;