import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Clipboard, AlertCircle, ArrowLeft, Check } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

type ForgotPasswordFormData = {
  email: string;
};

const ForgotPassword: React.FC = () => {
  const [formError, setFormError] = useState<string | null>(null);
  const [resetToken, setResetToken] = useState<string | null>(null);
  const [emailSent, setEmailSent] = useState(false);
  const { forgotPassword, clearError } = useAuth();
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<ForgotPasswordFormData>();
  
  const onSubmit = async (data: ForgotPasswordFormData) => {
    try {
      setFormError(null);
      clearError();
      const token = await forgotPassword(data.email);
      setResetToken(token);
      setEmailSent(true);
    } catch (error: any) {
      setFormError(error.response?.data?.message || 'Failed to send reset email');
    }
  };
  
  return (
    <div className="min-h-screen bg-background-dark flex flex-col justify-center items-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center items-center mb-4">
            <Clipboard size={40} className="text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-text-primary">Reset Password</h1>
          <p className="text-text-secondary mt-2">We'll send you a reset link</p>
        </div>
        
        <div className="bg-background-light rounded-lg shadow-card p-8">
          {emailSent ? (
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-success/20 mb-4">
                <Check size={24} className="text-success" />
              </div>
              <h3 className="text-xl font-medium text-text-primary mb-2">Email sent</h3>
              <p className="text-text-secondary mb-4">
                Check your email for a password reset link.
              </p>
              <div className="mt-6">
                <Link to="/login" className="btn btn-primary w-full">
                  Back to login
                </Link>
              </div>
              
              {/* In a real production app, we would not show this token to the user */}
              {resetToken && (
                <div className="mt-4 p-4 bg-secondary rounded-md">
                  <p className="text-xs text-text-secondary mb-1">Demo Mode: Copy this reset token</p>
                  <p className="text-xs text-primary break-all">{resetToken}</p>
                </div>
              )}
            </div>
          ) : (
            <>
              {formError && (
                <div className="bg-error/10 border border-error/30 rounded-md p-3 mb-4 flex items-start">
                  <AlertCircle size={20} className="text-error flex-shrink-0 mt-0.5" />
                  <p className="ml-3 text-sm text-text-primary">{formError}</p>
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
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary w-full py-2.5"
                >
                  {isSubmitting ? 'Sending...' : 'Send reset link'}
                </button>
              </form>
            </>
          )}
        </div>
        
        {!emailSent && (
          <div className="text-center mt-6">
            <Link 
              to="/login"
              className="inline-flex items-center text-text-secondary hover:text-primary text-sm"
            >
              <ArrowLeft size={16} className="mr-1" />
              Back to login
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;