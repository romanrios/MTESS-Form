import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../firebase-config';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase-config';

// Crear el contexto de autenticación
const AuthContext = createContext();

// Hook para usar el contexto de autenticación
export const useAuth = () => {
    return useContext(AuthContext);
};

// Proveedor del contexto de autenticación
export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);

    // Efecto para suscribirse a los cambios de estado de autenticación
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            setCurrentUser(user);
        });
        return unsubscribe;
    }, []);

    // Función para cerrar sesión
    const logout = async () => {
        await signOut(auth);
        setCurrentUser(null);
    };

    // Función para registrar un nuevo usuario
    const registerUser = async (email, password) => {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        await setDoc(doc(db, "users", user.uid), {
            email: user.email,
            createdAt: new Date()
        });
        await sendEmailVerification(user);
        return user;
    };

    // Función para iniciar sesión con correo y contraseña
    const loginUser = async (email, password) => {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential.user;
    };

    // Función para enviar un correo de verificación
    const sendVerificationEmail = async (user) => {
        await sendEmailVerification(user);
    };

    // Función para iniciar sesión con Google
    const loginWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        const userDoc = doc(db, "users", user.uid);
        await setDoc(userDoc, {
            email: user.email,
            name: user.displayName,
            photoURL: user.photoURL,
            createdAt: new Date()
        }, { merge: true });
        return user;
    };

    // Proveer el contexto de autenticación a los componentes hijos
    return (
        <AuthContext.Provider value={{ currentUser, logout, registerUser, loginUser, sendVerificationEmail, loginWithGoogle }}>
            {children}
        </AuthContext.Provider>
    );
};
