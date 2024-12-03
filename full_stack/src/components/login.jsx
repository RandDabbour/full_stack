import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {api} from "../services/api";

function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/login', form);
      alert(`Login successful. Token: ${response.data.token}`);
      localStorage.setItem("token", response.data.token); // Store the token
      navigate('/profile'); // Redirect to profile page after successful login
    } catch (error) {
      // Check for error.response
      if (error.response) {
        // Handle known API error responses
        console.error("API error:", error.response);
        alert(error.response.data.message || 'Login failed');
      } else if (error.request) {
        // Handle if no response was received
        console.error("Request error:", error.request);
        alert('No response from server');
      } else {
        // Handle other errors (like setup errors)
        console.error("Error:", error.message);
        alert('An unexpected error occurred during login');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="email" type="email" placeholder="Email" onChange={handleChange} />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} />
      <button type="submit">Login</button>
    </form>
  );
}

export default Login;
