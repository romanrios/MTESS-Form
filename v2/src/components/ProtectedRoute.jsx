import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export const ProtectedRoute = ({ element }) => {
    const { currentUser } = useAuth();

    if (!currentUser) {
        return <Navigate to="/" />;
    }

    if (!currentUser.emailVerified) {
        return <Navigate to="/" />;
    }

    // if (!currentUser.emailVerified) {
    //     return <Navigate to="/verify-email" />;
    // }

    return element;
};
