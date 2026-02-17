import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Register.css"; // Import the CSS

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/users/register", form);
      alert("Registration successful!");
      navigate("/login");
    } catch (err) {
      alert("Registration failed!");
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h2>Create an Account 📝</h2>
        <p className="subtitle">Join DocSpot to book appointments easily</p>
        <form onSubmit={handleSubmit}>
          <input
            name="name"
            type="text"
            placeholder="Your full name"
            required
            onChange={handleChange}
          />
          <input
            name="email"
            type="email"
            placeholder="Email address"
            required
            onChange={handleChange}
          />
          <input
            name="password"
            type="password"
            placeholder="Create a password"
            required
            onChange={handleChange}
          />
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
}
