import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; 


const Home = () => {
  const images = ["/hero-image1.jpg", "/hero-image2.jpg", "/hero-image3.jpg"];
  const [currentImage, setCurrentImage] = useState(0);
  const navigate = useNavigate(); // ✅ Define navigate

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // ✅ Fix: Define handlePlantClick to navigate properly
  const handlePlantClick = () => {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      navigate("/customerdashboard");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="font-sans">
      {/* Navbar
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
      </nav> */}
      
      {/* Hero Section with Slider and Black Opacity */}
      <header className="relative text-center text-white py-32 bg-cover bg-center transition-all duration-1000" 
        style={{ backgroundImage: `url(${images[currentImage]})` }}>
        <div className="absolute inset-0 bg-black bg-opacity-10"></div>
        <div className="relative z-10">
          <h1 className="text-4xl font-bold">Welcome to Aqua Plants Export</h1>
          <h3 className="text-lg mt-2">Order Fresh Aquatic Plants Online</h3>
          <button className="mt-4 px-6 py-2 bg-red-500 rounded text-white">Explore Now</button>
        </div>
      </header>
      
      {/* Video Section */}
      <section className="text-center py-10">
        <h2 className="text-2xl font-bold">Discover Our Aquatic Beauty</h2>
        <p className="text-gray-600 mt-2">Watch our showcase of beautiful aquatic plants.</p>
        <div className="mt-6 flex justify-center">
          <video controls className="w-[600px] h-[350px] rounded-xl shadow-lg object-cover">
            <source src="/promo-video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </section>
      
      {/* Featured Plants */}
      <section className="py-10">
        <h2 className="text-center text-3xl font-bold text-green-700">Featured Plants</h2>
        <div className="flex justify-center p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full">
            {[1, 2, 3].map((item) => (
              <div 
                key={item} 
                className="border rounded-lg p-3 shadow-lg text-center w-60 h-80 flex flex-col items-center justify-between bg-white cursor-pointer hover:shadow-xl transition"
                onClick={handlePlantClick} // Redirect when clicking
              >
                <img src={`/plant${item}.jpg`} alt={`Plant ${item}`} className="w-full h-40 object-cover rounded-md" />
                <h3 className="text-md font-bold mt-3">Plant {item}</h3>
                <p className="text-gray-600">$20.00</p>
                <button className="mt-2 px-3 py-1 bg-green-500 text-white rounded text-sm">View Details</button>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Customer Reviews */}
      <section className="py-10 bg-gray-100">
        <h2 className="text-center text-3xl font-bold text-gray-800">Hear from our awesome users!</h2>
        <div className="flex justify-center p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full">
            {["Emily Thompson", "James Anderson", "Sophia Martinez"].map((name, index) => (
              <div key={index} className="border rounded-lg p-5 shadow-lg text-center bg-white">
                <img src={`/user${index + 1}.jpg`} alt={name} className="w-16 h-16 rounded-full mx-auto" />
                <h3 className="text-md font-bold mt-2">{name}</h3>
                <p className="text-yellow-500">★★★★★</p>
                <p className="text-gray-600 mt-2">{index === 0 ? "I love the quality of plants I received! Will order again." : index === 1 ? "Fast delivery and excellent service. Highly recommend!" : "Vibrant plants, exceeded expectations."}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Discount Banner */}
      <section className="bg-green-500 text-white text-center p-6 text-lg font-bold">
        Sign up today and get 10% off your first order!
      </section>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white p-10 text-center">
        <div className="grid grid-cols-4 gap-6 px-10 text-left">
          <div>
            <h3 className="text-lg font-bold">Quick Links</h3>
            <p>Privacy Policy</p>
            <p>Terms of Use</p>
            <p>FAQs</p>
            <p>Shipping Policy</p>
          </div>
          <div>
            <h3 className="text-lg font-bold">Contact Us</h3>
            <p>📧 support@aquaplants.com</p>
            <p>📞 (555) 123-4567</p>
          </div>
          <div>
            <h3 className="text-lg font-bold">Follow Us</h3>
            <div className="flex space-x-4 mt-2">
              <a href="#"><img src="/facebook-icon.png" alt="Facebook" className="h-6" /></a>
              <a href="#"><img src="/instagram-icon.png" alt="Instagram" className="h-6" /></a>
              <a href="#"><img src="/twitter-icon.png" alt="Twitter" className="h-6" /></a>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-bold">Newsletter</h3>
            <div className="flex mt-2">
              <input type="email" placeholder="Your email" className="p-2 rounded-l bg-gray-800 text-white w-full" />
              <button className="bg-green-500 px-4 py-2 rounded-r text-white">Subscribe</button>
            </div>
          </div>
        </div>
        <p className="mt-6">&copy; 2025 AquaPlants. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
