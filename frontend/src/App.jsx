import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import About from "./pages/About";
import DroughtAwareness from "./pages/DroughtAwareness"; 
import Tips from "./pages/FarmingTips";
import Contact from "./pages/Contact";
import Signup from "./pages/Signup"; 
import Login from "./pages/Login";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/drought-awareness" element={<DroughtAwareness />} />
            <Route path="/farming-tips" element={<Tips />} />
            <Route path="/contact" element={<Contact />} />  
            <Route path="/signup" element={<Signup />} /> 
            <Route path="/login" element={<Login />} /> 
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
