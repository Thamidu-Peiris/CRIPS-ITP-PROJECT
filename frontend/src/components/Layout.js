import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Layout = ({ children }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const username = userInfo ? userInfo.username : null;

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    navigate('/');
    window.location.reload(); // Reloads the page to update the state
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
          <Link to="/customerdashboard" className="text-gray-600">Shop</Link>
          <Link to="/staff" className="text-gray-600">Staff</Link>
          <Link to="/about" className="text-gray-600">About</Link>
          <Link to="/contact" className="text-gray-600">Contact Us</Link>
        </div>

        {username ? (
          <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center bg-gray-200 px-4 py-2 rounded-full"
          >
            <span className="mr-2">{username}</span>
            <img src="/profile-icon.png" alt="Profile" className="h-8 w-8 rounded-full" />
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 bg-white rounded-lg shadow-lg w-48 z-50">
            <Link to="/customerdashboard" className="block px-4 py-2 hover:bg-gray-100">Dashboard</Link>
            <Link to="/dashboard/orders" className="block px-4 py-2 hover:bg-gray-100">Orders</Link>
            <Link to="/dashboard/tracking" className="block px-4 py-2 hover:bg-gray-100">Tracking</Link>
            <Link to="/dashboard/support" className="block px-4 py-2 hover:bg-gray-100">Support</Link>
            <Link to="/dashboard/settings" className="block px-4 py-2 hover:bg-gray-100">Settings</Link>
            <button onClick={handleLogout} className="block px-4 py-2 hover:bg-red-100 text-red-600">Logout</button>
          </div>
          
          )}
        </div>
        
        ) : (
          <div className="space-x-4">
            <Link to="/customerregister" className="border px-4 py-2 rounded text-green-600">
              Sign Up
            </Link>
            <Link to="/login" className="bg-green-600 text-white px-4 py-2 rounded">
              Login
            </Link>
          </div>
        )}
      </nav>

      <main>{children}</main>
    </div>
  );
};

export default Layout;
