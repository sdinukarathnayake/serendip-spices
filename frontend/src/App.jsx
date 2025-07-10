import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import "./App.css";

import HomePage         from './pages/HomePage'
import Login            from './pages/Login'
import Register         from './pages/Register'
import BuyerDashboard   from './pages/BuyerDashboard'
import SellerDashboard  from './pages/SellerDashboard'
import AdminDashboard   from './pages/AdminDashboard'

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard/buyer" element={<BuyerDashboard />} />
                <Route path="/dashboard/seller" element={<SellerDashboard />} />
                <Route path="/dashboard/admin" element={<AdminDashboard />} />
            </Routes>
        </Router>
    );
}

export default App;
