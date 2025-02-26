import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaShoppingCart, FaUserCircle, FaSearch } from "react-icons/fa";

const CustomerDashboard = () => {
  const [username, setUsername] = useState("Guest");
  const [email, setEmail] = useState("");
  const [plants, setPlants] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const [categories] = useState(["All", "Aquatic", "Flowering", "Green"]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo) {
      setUsername(userInfo.username);
      setEmail(userInfo.email);
    } else {
      navigate("/login");
    }

    const fetchPlants = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/plants");
        setPlants(data);
      } catch (error) {
        console.error("Error fetching plants:", error);
      }
    };

    fetchPlants();

    // Load cart from local storage
    const storedCart = JSON.parse(localStorage.getItem("cart"));
    if (storedCart) {
      setCart(storedCart);
    }
  }, [navigate]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    navigate("/login");
  };

  const addToCart = (plant) => {
    const updatedCart = [...cart, plant];
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart)); // Save cart immediately
    alert(`${plant.name} added to cart!`);
  };

  return (
    <div className="font-sans">
      {/* Navbar */}
      <nav className="flex justify-between items-center p-5 bg-white shadow-md">
        <div className="text-lg font-bold flex items-center">
          <img src="/logo.png" alt="Logo" className="h-10 mr-2" />
        </div>

        {/* Search & Categories */}
        <div className="flex items-center space-x-4">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="p-2 border rounded-lg bg-gray-100"
          >
            {categories.map((category, index) => (
              <option key={index} value={category}>{category}</option>
            ))}
          </select>

          <div className="relative">
            <input
              type="text"
              placeholder="Search plants..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="p-2 border rounded-lg bg-gray-100 pl-10 w-64"
            />
            <FaSearch className="absolute left-3 top-3 text-gray-500" />
          </div>
        </div>

        {/* Navigation Links */}
        <div className="space-x-6">
          <Link to="/" className="text-green-600 font-medium">Home</Link>
          <Link to="/customerdashboard" className="text-gray-600">Shop</Link>
          <Link to="/staff" className="text-gray-600">Staff</Link>
          <Link to="/about" className="text-gray-600">About</Link>
          <Link to="/contact" className="text-gray-600">Contact Us</Link>
        </div>

        {/* Cart & Profile */}
        <div className="flex items-center space-x-4">
          {/* Cart Icon */}
          <Link to="/cart" className="relative">
            <FaShoppingCart className="text-gray-600 text-xl cursor-pointer" />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {cart.length}
              </span>
            )}
          </Link>

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center bg-gray-200 px-4 py-2 rounded-full"
            >
              <span className="mr-2">{username}</span>
              <FaUserCircle className="text-gray-600 text-xl" />
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 bg-white rounded-lg shadow-lg w-48 z-10">
                <Link to="/customerdashboard" className="block px-4 py-2 hover:bg-gray-100">Dashboard</Link>
                <Link to="/dashboard/orders" className="block px-4 py-2 hover:bg-gray-100">Orders</Link>
                <Link to="/dashboard/tracking" className="block px-4 py-2 hover:bg-gray-100">Tracking</Link>
                <Link to="/dashboard/support" className="block px-4 py-2 hover:bg-gray-100">Support</Link>
                <Link to="/dashboard/settings" className="block px-4 py-2 hover:bg-gray-100">Settings</Link>
                <button onClick={handleLogout} className="block px-4 py-2 hover:bg-red-100 text-red-600">Logout</button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Plants Section */}
      <section className="py-10">
        <h2 className="text-center text-3xl font-bold text-green-700">All Plants</h2>
        <div className="flex justify-center p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-6xl w-full">
            {plants
              .filter((plant) =>
                (selectedCategory === "All" || plant.category === selectedCategory) &&
                (plant.name.toLowerCase().includes(searchTerm.toLowerCase()))
              )
              .map((plant, index) => (
                <div key={index} className="border rounded-lg p-3 shadow-lg text-center">
                  <img src={plant.image} alt={plant.name} className="w-full h-60 object-cover rounded-md" />
                  <h3 className="text-md font-bold mt-3">{plant.name}</h3>
                  <p className="text-gray-600">${plant.price}</p>
                  <button 
                    onClick={() => addToCart(plant)} 
                    className="mt-2 px-3 py-1 border rounded text-green-600 text-sm"
                  >
                    Add to Cart
                  </button>
                </div>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default CustomerDashboard;
