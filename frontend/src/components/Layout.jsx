import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children }) => {
  const location = useLocation();
  
  // Check if current route is a dashboard
  const isDashboard = location.pathname.includes('-dashboard');
  
  if (isDashboard) {
    // For dashboard pages, render only the children (no navbar/footer)
    return <>{children}</>;
  }
  
  // For regular pages, render with navbar and footer
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
