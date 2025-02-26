import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Staff from "./pages/Staff"; 
import CustomerLogin from './components/CustomerLogin';
import CustomerRegister from "./pages/CustomerRegister";
import CustomerDashboard from './components/CustomerDashboard';
import Layout from './components/Layout';
import Cart from "./components/Cart";
import OrdersPage from "./pages/OrdersPage"; 


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/login" element={<CustomerLogin />} />
        <Route path="/shop" element={<div>Shop Page</div>} />
        <Route path="/staff" element={<Staff />} />
        <Route path="/customerregister" element={<CustomerRegister />} />
        <Route path="/customerdashboard" element={<CustomerDashboard />} />
        <Route path="/login" element={<CustomerLogin />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="dashboard/orders" element={<OrdersPage />} />

      </Routes>
    </Router>
  );
}

export default App;
