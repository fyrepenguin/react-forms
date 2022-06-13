import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import loginDetails from '../data/loginDetails.json';
import { useAuth } from '../AuthContext';

const Login = () => {
  let navigate = useNavigate();
  let location = useLocation();
  let auth = useAuth();

  let from = location.state?.from?.pathname || "/";

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const { email, password } = formData;

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = e => {
    e.preventDefault();
    if (loginDetails.email === email && loginDetails.password === password) {
      let formData = new FormData(e.currentTarget);
      let email = formData.get("email");

      auth.login(email, () => {
        navigate(from, { replace: true });
      });
      return;
    }
  }

  return (
    <div>

      <form onSubmit={handleSubmit} className="login-form">
        <h3>Login</h3>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" name="email" id="email" onChange={handleChange} value={email} />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" name="password" id="password" onChange={handleChange} value={password} />
        </div>
        <button type="submit">Login</button>

      </form>
    </div>
  )
}

export default Login