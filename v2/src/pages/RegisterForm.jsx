import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase-config';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import '../css/RegisterForm.css';

export const RegisterForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (event) => {
        event.preventDefault();
        setError('');
        setMessage('');
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Save user to Firestore
            await setDoc(doc(db, "users", user.uid), {
                email: user.email,
                createdAt: new Date()
            });

            // Send email verification
            await sendEmailVerification(user);
            setMessage(`Para completar el registro debes confirmar el correo enviado a ${email}`);

            // Optionally redirect to another page
            // navigate('/form');
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <form className='RegisterForm' id="registerForm" onSubmit={handleRegister}>
            <h2>REGISTRAR NUEVO USUARIO</h2>

            <input
                type="email"
                id="registerEmail"
                placeholder="Correo electrónico"
                autoComplete='off'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                id="registerPassword"
                placeholder='Contraseña'
                autoComplete='new-password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <button className="button" id="registerButton" type="submit">Registrarse</button>

            {error && <p id="registerError">{error}</p>}
            {message && <p id="registerMessage">{message}</p>}

            <p>¿Ya tienes cuenta? <Link to='/'>Ingresa aquí</Link></p>
        </form>
    );
};
