import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export const ProtectedRoute = ({ element }) => {
    const { currentUser } = useAuth();
    return currentUser ? element : <Navigate to="/" />;
};