import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { showInfoAlert, showVerificationAlert } from '../utils/alerts';

export const ProtectedRoute = ({ element, checkAdmin }) => {
    const { currentUser, logout, sendVerificationEmail } = useAuth();
    const [redirect, setRedirect] = useState(null);

    useEffect(() => {
        const handleLogoutAndRedirect = async (message) => {
            showInfoAlert(message);
            await logout();
            setRedirect(<Navigate to="/" />);
        };

        if (!currentUser) {
            setRedirect(<Navigate to="/" replace state={{ message: 'Debes iniciar sesión para acceder a esta página.' }} />);
        } else if (!currentUser.emailVerified) {
            showVerificationAlert(currentUser, sendVerificationEmail);
            handleLogoutAndRedirect('Debes verificar tu correo electrónico.');
        } else if (checkAdmin && currentUser.email !== process.env.ADMIN_EMAIL) {
            handleLogoutAndRedirect('No tienes permisos para acceder a esta página.');
        }
    }, [currentUser, checkAdmin, logout]);

    if (redirect) {
        return redirect;
    }

    return element;
};
