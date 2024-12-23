import { useState } from 'react';
import { registerUser } from '../utils/auth';
import { auth } from '../firebase-config';
import { showErrorAlert, showSuccessAlert } from '../utils/alerts';
import '../css/RegisterForm.css';
import { FaRegEyeSlash } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';

export const RegisterForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const handleRegister = async (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            showErrorAlert('Las contraseñas no coinciden');
            return;
        }
        setIsLoading(true);
        try {
            const user = await registerUser(email, password);
            showSuccessAlert(`Para completar el registro debes confirmar el correo enviado a ${email}`);

            // Cerrar la sesión después de registrar el usuario
            await auth.signOut();
            navigate('/');
        } catch (error) {
            showErrorAlert(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
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
            <div className="password-container">
                <input
                    type={showPassword ? "text" : "password"}

                    id="registerPassword"
                    placeholder='Contraseña'
                    autoComplete='new-password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="button" className="show-password-button" onClick={toggleShowPassword} >
                    {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                </button>
            </div>
            <div className="password-container">
                <input
                    type={showPassword ? "text" : "password"}
                    id="confirmPassword"
                    placeholder='Confirmar Contraseña'
                    autoComplete='new-password'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button type="button" className="show-password-button" onClick={toggleShowPassword} >
                    {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                </button>
            </div>

            <button className="button" id="registerButton" type="submit" disabled={isLoading}>
                {isLoading ? 'Registrando...' : 'Registrarse'}
            </button>

        </form>
    );
};
