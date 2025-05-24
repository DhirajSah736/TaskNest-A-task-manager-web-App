import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Clipboard, AlertCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

type LoginFormData = {
  email: string;
  password: string;
};

const Login: React.FC = () => {
  const [formError, setFormError] = useState<string | null>(null);
  const { login, error, clearError } = useAuth();
  const navigate = useNavigate();
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<LoginFormData>();
  
  const onSubmit = async (data: LoginFormData) => {
    try {
      setFormError(null);
      clearError();
      await login(data.email, data.password);
      navigate('/');
    } catch (error: any) {
      setFormError(error.response?.data?.message || 'Login failed');
    }
  };
  
  return (
    <div className="min-h-screen bg-background-dark flex flex-col justify-center items-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center items-center mb-4">
            <Clipboard size={40} className="text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-text-primary">Welcome to TaskNest</h1>
          <p className="text-text-secondary mt-2">Login to access your tasks</p>
        </div>
        
        <div className="bg-background-light rounded-lg shadow-card p-8">
          {(error || formError) && (
            <div className="bg-error/10 border border-error/30 rounded-md p-3 mb-4 flex items-start">
              <AlertCircle size={20} className="text-error flex-shrink-0 mt-0.5" />
              <p className="ml-3 text-sm text-text-primary">{error || formError}</p>
            </div>
          )}
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label htmlFor="email" className="form-label">Email</label>
              <input
                id="email"
                type="email"
                className="form-input w-full"
                placeholder="your@email.com"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address'
                  }
                })}
              />
              {errors.email && (
                <p className="error-message">{errors.email.message}</p>
              )}
            </div>
            
            <div>
              <div className="flex justify-between items-center">
                <label htmlFor="password" className="form-label">Password</label>
                <Link to="/forgot-password" className="text-xs text-primary hover:text-primary-hover">
                  Forgot Password?
                </Link>
              </div>
              <input
                id="password"
                type="password"
                className="form-input w-full"
                placeholder="••••••••"
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters'
                  }
                })}
              />
              {errors.password && (
                <p className="error-message">{errors.password.message}</p>
              )}
            </div>
            
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-primary w-full py-2.5"
            >
              {isSubmitting ? 'Signing in...' : 'Sign in'}
            </button>
          </form>
        </div>
        
        <div className="text-center mt-6">
          <p className="text-text-secondary">
            Don't have an account?{' '}
            <Link to="/register" className="text-primary hover:text-primary-hover font-medium">
              Create account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;