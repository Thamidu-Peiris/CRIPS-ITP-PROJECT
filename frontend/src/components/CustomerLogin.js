import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const CustomerLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/users/login', formData);
      alert(response.data.message);
      if (response.data.success) {
        // Save user info to local storage
        localStorage.setItem('userInfo', JSON.stringify(response.data.user));
        navigate('/customerdashboard');
      }
    } catch (error) {
      alert('Login failed. Please check your credentials.');
    }
  };
  
  
  

  return (
    <div className="font-sans">
      {/* Navbar */}
      <nav className="flex justify-between items-center p-5 bg-white shadow-md">
        <div className="text-lg font-bold flex items-center">
          <img src="/logo.png" alt="Logo" className="h-10 mr-2" />
        </div>
        <div className="space-x-6">
          <Link to="/" className="text-green-600 font-medium">Home</Link>
          <Link to="/shop" className="text-gray-600">Shop</Link>
          <Link to="/staff" className="text-gray-600">Staff</Link>
          <Link to="/about" className="text-gray-600">About</Link>
          <Link to="/contact" className="text-gray-600">Contact Us</Link>
        </div>
        <div className="space-x-4">
          <Link to="/customerregister" className="border px-4 py-2 rounded text-green-600">
            Sign Up
          </Link>
          <Link to="/login" className="bg-green-600 text-white px-4 py-2 rounded">
            Login
          </Link>
        </div>
      </nav>

      {/* Login Form */}
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-center text-green-600 mb-8">Customer Login</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              className="w-full p-3 border rounded-lg bg-gray-100 mb-4"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              className="w-full p-3 border rounded-lg bg-gray-100 mb-4"
              required
            />
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 transition duration-300"
            >
              Login
            </button>
          </form>
          <p className="text-center mt-4">
            Don't have an account? <Link to="/customerregister" className="text-green-600">Register here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CustomerLogin;
