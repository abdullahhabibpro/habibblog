import React from 'react';
import { useDispatch } from 'react-redux';
import { logout as logoutAction } from '../../store/authSlice';
import authService from '../../appwrite/auth';
import Button from '../Button';

function Logout() {
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await authService.logout();
      dispatch(logoutAction());
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <Button
      className="bg-red-600 text-white hover:bg-red-700"
      onClick={handleLogout}
    >
      Logout
    </Button>
  );
}

export default Logout;