import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-background-dark">
      <Navbar />
      <main className="flex-grow container-custom py-8">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;