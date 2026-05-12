import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/client';
import AuthLayout from '../components/auth/AuthLayout';
import FormInput from '../components/auth/FormInput';
import PasswordInput from '../components/auth/PasswordInput';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    nickname: '',
    email: '',
    password: '',
    password2: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(''); // Clear global errors on typing
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Inline Validation
    if (formData.password !== formData.password2) {
      setError('Passwords do not match');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      await api.post('/register/', {
        username: formData.username,
        nickname: formData.nickname || '',
        email: formData.email,
        password: formData.password,
        password2: formData.password2
      });      // Assuming successful registration should redirect to login or auto-login
      navigate('/login');
    } catch (err) {
      setError(
        err.response?.data?.error || 
        err.response?.data?.detail ||
        'Registration failed. Please check your inputs and try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout title="Join the Community">
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="bg-red-900/30 border border-red-500/50 text-red-400 p-3 rounded-lg text-sm text-center mb-6">
            {error}
          </div>
        )}

        <FormInput
          id="username"
          name="username"
          label="Username"
          value={formData.username}
          onChange={handleChange}
          required
          autoComplete="username"
        />

        <FormInput
          id="nickname"
          name="nickname"
          label="Nickname (Optional)"
          value={formData.nickname}
          onChange={handleChange}
        />

        <FormInput
          id="email"
          name="email"
          type="email"
          label="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
          autoComplete="email"
        />

        <PasswordInput
          id="password"
          name="password"
          label="Password"
          value={formData.password}
          onChange={handleChange}
          required
          autoComplete="new-password"
        />

        <PasswordInput
          id="password2"
          name="password2"
          label="Confirm Password"
          value={formData.password2}
          onChange={handleChange}
          required
          autoComplete="new-password"
          error={formData.password && formData.password2 && formData.password !== formData.password2 ? 'Passwords do not match' : undefined}
        />

        <div className="pt-4">
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full bg-neon-violet text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-neon-violet focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-300 ${
              isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-violet-500 hover:shadow-[0_0_15px_rgba(167,139,250,0.4)]'
            }`}
          >
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </button>
        </div>

        <p className="text-center text-gray-400 mt-6 text-sm">
          Already have an account?{' '}
          <Link to="/login" className="text-neon-violet hover:text-violet-400 font-semibold transition-colors">
            Sign In
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
};

export default Register;
