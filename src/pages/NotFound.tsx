import React from 'react';
import { Link } from 'react-router-dom';
import { Clipboard, ArrowLeft } from 'lucide-react';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-background-dark flex flex-col justify-center items-center px-4">
      <div className="text-center">
        <Clipboard size={64} className="text-primary mx-auto mb-6" />
        
        <h1 className="text-4xl font-bold text-text-primary mb-2">404</h1>
        <h2 className="text-2xl font-semibold text-text-primary mb-4">Page Not Found</h2>
        
        <p className="text-text-secondary mb-8 max-w-md">
          The page you are looking for doesn't exist or has been moved.
        </p>
        
        <Link 
          to="/"
          className="btn btn-primary inline-flex items-center"
        >
          <ArrowLeft size={18} className="mr-2" />
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;