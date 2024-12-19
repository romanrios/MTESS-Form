import { useState } from 'react';
import { registerUser } from '../utils/auth';
import { showErrorAlert, showSuccessAlert } from '../utils/alerts';
import '../css/RegisterForm.css';

export const RegisterForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async (event) => {
        event.preventDefault();
        try {
            const user = await registerUser(email, password);
            showSuccessAlert(`Para completar el registro debes confirmar el correo enviado a ${email}`);
        } catch (error) {
            showErrorAlert(error.message);
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

        </form>
    );
};
