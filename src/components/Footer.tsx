import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="py-6 bg-background-light border-t border-secondary">
      <div className="container-custom mx-auto px-4 text-center">
        <p className="text-text-secondary text-sm">
          © 2025 Copyright TaskNest. All rights reserved | Designed and developed by {" "}
          <span className="text-primary ">Dhiraj Sah</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;