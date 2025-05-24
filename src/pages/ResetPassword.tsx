import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Clipboard, AlertCircle, ArrowLeft } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

type ResetPasswordFormData = {
  token: string;
  password: string;
  confirmPassword: string;
};

const ResetPassword: React.FC = () => {
  const [formError, setFormError] = useState<string | null>(null);
  const { resetPassword, error, clearError } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get token from URL query params if available
  const queryParams = new URLSearchParams(location.search);
  const tokenFromUrl = queryParams.get('token') || '';
  
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting }
  } = useForm<ResetPasswordFormData>({
    defaultValues: {
      token: tokenFromUrl
    }
  });
  
  const password = watch('password');
  
  const onSubmit = async (data: ResetPasswordFormData) => {
    try {
      setFormError(null);
      clearError();
      await resetPassword(data.token, data.password);
      navigate('/');
    } catch (error: any) {
      setFormError(error.response?.data?.message || 'Password reset failed');
    }
  };
  
  return (
    <div className="min-h-screen bg-background-dark flex flex-col justify-center items-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center items-center mb-4">
            <Clipboard size={40} className="text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-text-primary">Set New Password</h1>
          <p className="text-text-secondary mt-2">Enter your new password below</p>
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
              <label htmlFor="token" className="form-label">Reset Token</label>
              <input
                id="token"
                type="text"
                className="form-input w-full"
                placeholder="Enter your reset token"
                {...register('token', {
                  required: 'Reset token is required'
                })}
              />
              {errors.token && (
                <p className="error-message">{errors.token.message}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="password" className="form-label">New Password</label>
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
                  },
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z0-9])(?=.*[!@#$%^&*])/,
                    message: 'Password must contain a lowercase letter, an uppercase letter or number, and a special character'
                  }
                })}
              />
              {errors.password && (
                <p className="error-message">{errors.password.message}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="confirmPassword" className="form-label">Confirm New Password</label>
              <input
                id="confirmPassword"
                type="password"
                className="form-input w-full"
                placeholder="••••••••"
                {...register('confirmPassword', {
                  required: 'Please confirm your password',
                  validate: value => value === password || 'Passwords do not match'
                })}
              />
              {errors.confirmPassword && (
                <p className="error-message">{errors.confirmPassword.message}</p>
              )}
            </div>
            
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-primary w-full py-2.5"
            >
              {isSubmitting ? 'Resetting...' : 'Reset Password'}
            </button>
          </form>
        </div>
        
        <div className="text-center mt-6">
          <Link 
            to="/login"
            className="inline-flex items-center text-text-secondary hover:text-primary text-sm"
          >
            <ArrowLeft size={16} className="mr-1" />
            Back to login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;