import React, { useState } from "react";
import {api} from "../services/api";
import { useNavigate } from "react-router-dom";

function Register_page() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/register', form); // Send form data to the API
  console.log(response,"login res");
  
    //   if (response.data.status) {
    //     alert(response.data.message); // Display success message
    //     window.location.href = '/login'; // Redirect to login page
    //   }
    } catch (error) {
        console.log(error);
        
    //   console.error(error.response ? error.response.data : error); // Log any errors
    //   alert('Registration failed');
    }
  };
  

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Name" onChange={handleChange} />
      <input name="email" type="email" placeholder="Email" onChange={handleChange} />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} />
      <input name="password_confirmation" type="password" placeholder="Confirm Password" onChange={handleChange} />
      <button type="submit">Register</button>
    </form>
  );
}

export default Register_page;
