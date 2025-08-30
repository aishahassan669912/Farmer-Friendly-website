import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Layout from "./components/Layout";

import Home from "./pages/Home";
import About from "./pages/About";
import DroughtAwareness from "./pages/DroughtAwareness";
import Tips from "./pages/FarmingTips";
import Contact from "./pages/Contact";
import RoleSelection from "./pages/RoleSelection";
import SignupFarmer from "./pages/SignupFarmer";
import SignupNGO from "./pages/SignupNGO";
import Login from "./pages/Login";
import AdminLogin from "./pages/AdminLogin";
import FarmerDashboard from "./pages/FarmerDashboard";
import NGODashboard from "./pages/NGODashboard";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/drought-awareness" element={<DroughtAwareness />} />
            <Route path="/farming-tips" element={<Tips />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/signup" element={<RoleSelection />} />
            <Route path="/signup-farmer" element={<SignupFarmer />} />
            <Route path="/signup-ngo" element={<SignupNGO />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/farmer-dashboard" element={<FarmerDashboard />} />
            <Route path="/ngo-dashboard" element={<NGODashboard />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
}

export default App;
