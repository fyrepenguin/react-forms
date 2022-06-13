import React from 'react'
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';

const AuthStatus = () => {
  let auth = useAuth();
  let navigate = useNavigate();

  if (!auth.user) {
    return <p className='auth-status-message'>You are not logged in.  <button
      onClick={() => {
        navigate("/login");
      }}
    >
      Login
    </button></p>;
  }

  return (
    <p className='auth-status-message'>
      Welcome {auth.user}!{" "}
      <button
        onClick={() => {
          auth.logout(() => navigate("/login"));
        }}
      >
        logout
      </button>
    </p>
  );
}

export default AuthStatus