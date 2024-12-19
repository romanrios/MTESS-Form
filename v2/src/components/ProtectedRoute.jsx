import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { showInfoAlert, showVerificationAlert } from '../utils/alerts';

export const ProtectedRoute = ({ element }) => {
    const { currentUser } = useAuth();

    if (!currentUser) {
        showInfoAlert('Debes iniciar sesión para acceder a esta página.');
        return <Navigate to="/" />;
    }

    if (!currentUser.emailVerified) {
        showVerificationAlert(currentUser);
        return <Navigate to="/" />;
    }

    return element;
};
