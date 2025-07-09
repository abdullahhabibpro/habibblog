import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login as loginAction } from '../../store/authSlice';
import { Button, Input, Logo } from '../index';
import { useForm } from 'react-hook-form';
import authService from '../../appwrite/auth';

function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [error, setError] = useState('');

  const signUp = async (data) => {
    setError('');
    try {
      const newUser = await authService.createAccount(data);
      if (newUser) {
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(loginAction({ userData }));
          navigate('/');
        }
      }
    } catch (error) {
      setError('Signup failed. Please try again.');
      console.error('Signup error:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-center mb-6">
          <Logo width="100px" />
        </div>
        <h2 className="text-2xl font-bold text-center mb-4">Sign up for your account</h2>
        <p className="text-center mb-6">
          Already have an account? <Link to="/login" className="text-blue-600 hover:underline">Sign in</Link>
        </p>
        {error && <p className="text-red-600 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit(signUp)} className="space-y-6">
          <Input
            label="Name"
            type="text"
            placeholder="Enter your full name"
            {...register('name', {
              required: 'Name is required',
              minLength: {
                value: 2,
                message: 'Name must be at least 2 characters',
              },
            })}
          />
          {errors.name && <p className="text-red-600 text-sm">{errors.name.message}</p>}
          <Input
            label="Email"
            type="email"
            placeholder="Enter your email"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Invalid email format',
              },
            })}
          />
          {errors.email && <p className="text-red-600 text-sm">{errors.email.message}</p>}
          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters',
              },
            })}
          />
          {errors.password && <p className="text-red-600 text-sm">{errors.password.message}</p>}
          <Button type="submit" className="w-full bg-blue-600 text-white hover:bg-blue-700">
            Sign Up
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Signup;