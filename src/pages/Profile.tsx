import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../contexts/AuthContext';
import { AlertCircle, User, Lock } from 'lucide-react';

type ProfileFormData = {
  name: string;
  email: string;
};

type PasswordFormData = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

const Profile: React.FC = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [updateSuccess, setUpdateSuccess] = useState<string | null>(null);
  const { user, updateProfile, changePassword, error, clearError } = useAuth();
  
  const {
    register: registerProfile,
    handleSubmit: handleProfileSubmit,
    formState: { errors: profileErrors, isSubmitting: profileSubmitting }
  } = useForm<ProfileFormData>({
    defaultValues: {
      name: user?.name || '',
      email: user?.email || ''
    }
  });
  
  const {
    register: registerPassword,
    handleSubmit: handlePasswordSubmit,
    watch,
    reset: resetPasswordForm,
    formState: { errors: passwordErrors, isSubmitting: passwordSubmitting }
  } = useForm<PasswordFormData>();
  
  const newPassword = watch('newPassword');
  
  const onProfileSubmit = async (data: ProfileFormData) => {
    try {
      clearError();
      setUpdateSuccess(null);
      await updateProfile(data.name, data.email);
      setUpdateSuccess('Profile updated successfully');
    } catch (error) {
      // Error is handled by the context
    }
  };
  
  const onPasswordSubmit = async (data: PasswordFormData) => {
    try {
      clearError();
      setUpdateSuccess(null);
      await changePassword(data.currentPassword, data.newPassword);
      resetPasswordForm();
      setUpdateSuccess('Password updated successfully');
    } catch (error) {
      // Error is handled by the context
    }
  };
  
  return (
    <div>
      <h1 className="text-3xl font-bold text-text-primary mb-6">Your Profile</h1>
      
      <div className="bg-background-light rounded-lg shadow-card overflow-hidden">
        <div className="flex border-b border-secondary">
          <button
            className={`px-6 py-4 text-center font-medium flex-1 transition-colors ${
              activeTab === 'profile'
                ? 'text-primary border-b-2 border-primary'
                : 'text-text-secondary hover:text-text-primary'
            }`}
            onClick={() => setActiveTab('profile')}
          >
            <span className="flex items-center justify-center">
              <User size={18} className="mr-2" />
              Profile Info
            </span>
          </button>
          
          <button
            className={`px-6 py-4 text-center font-medium flex-1 transition-colors ${
              activeTab === 'password'
                ? 'text-primary border-b-2 border-primary'
                : 'text-text-secondary hover:text-text-primary'
            }`}
            onClick={() => setActiveTab('password')}
          >
            <span className="flex items-center justify-center">
              <Lock size={18} className="mr-2" />
              Change Password
            </span>
          </button>
        </div>
        
        <div className="p-6">
          {updateSuccess && (
            <div className="bg-success/10 border border-success/30 rounded-md p-3 mb-4">
              <p className="text-success">{updateSuccess}</p>
            </div>
          )}
          
          {error && (
            <div className="bg-error/10 border border-error/30 rounded-md p-3 mb-4 flex items-start">
              <AlertCircle size={20} className="text-error flex-shrink-0 mt-0.5" />
              <p className="ml-3 text-sm text-text-primary">{error}</p>
            </div>
          )}
          
          {activeTab === 'profile' && (
            <form onSubmit={handleProfileSubmit(onProfileSubmit)} className="space-y-4">
              <div>
                <label htmlFor="name" className="form-label">Full Name</label>
                <input
                  id="name"
                  type="text"
                  className="form-input w-full"
                  placeholder="Your name"
                  {...registerProfile('name', {
                    required: 'Name is required',
                    minLength: {
                      value: 2,
                      message: 'Name must be at least 2 characters'
                    }
                  })}
                />
                {profileErrors.name && (
                  <p className="error-message">{profileErrors.name.message}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="email" className="form-label">Email</label>
                <input
                  id="email"
                  type="email"
                  className="form-input w-full"
                  placeholder="your@email.com"
                  {...registerProfile('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address'
                    }
                  })}
                />
                {profileErrors.email && (
                  <p className="error-message">{profileErrors.email.message}</p>
                )}
              </div>
              
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={profileSubmitting}
                  className="btn btn-primary"
                >
                  {profileSubmitting ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          )}
          
          {activeTab === 'password' && (
            <form onSubmit={handlePasswordSubmit(onPasswordSubmit)} className="space-y-4">
              <div>
                <label htmlFor="currentPassword" className="form-label">Current Password</label>
                <input
                  id="currentPassword"
                  type="password"
                  className="form-input w-full"
                  placeholder="••••••••"
                  {...registerPassword('currentPassword', {
                    required: 'Current password is required'
                  })}
                />
                {passwordErrors.currentPassword && (
                  <p className="error-message">{passwordErrors.currentPassword.message}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="newPassword" className="form-label">New Password</label>
                <input
                  id="newPassword"
                  type="password"
                  className="form-input w-full"
                  placeholder="••••••••"
                  {...registerPassword('newPassword', {
                    required: 'New password is required',
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
                {passwordErrors.newPassword && (
                  <p className="error-message">{passwordErrors.newPassword.message}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="confirmPassword" className="form-label">Confirm New Password</label>
                <input
                  id="confirmPassword"
                  type="password"
                  className="form-input w-full"
                  placeholder="••••••••"
                  {...registerPassword('confirmPassword', {
                    required: 'Please confirm your new password',
                    validate: value => value === newPassword || 'Passwords do not match'
                  })}
                />
                {passwordErrors.confirmPassword && (
                  <p className="error-message">{passwordErrors.confirmPassword.message}</p>
                )}
              </div>
              
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={passwordSubmitting}
                  className="btn btn-primary"
                >
                  {passwordSubmitting ? 'Updating...' : 'Update Password'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;