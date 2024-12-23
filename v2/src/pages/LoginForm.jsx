import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../utils/auth';
import { showErrorAlert, showSuccessAlert, showVerificationAlert } from '../utils/alerts';
import '../css/LoginForm.css';
import { FaRegEyeSlash } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa6";

// Only authorized mail
const ADMIN_EMAIL = 'mtess.sf@gmail.com';

export const LoginForm = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    if (props.checkAdmin && email !== ADMIN_EMAIL) {
      showErrorAlert('Correo no autorizado para acceso de administrador');
      return;
    }
    setIsLoading(true);
    try {
      const user = await loginUser(email, password);

      if (user.emailVerified) {
        showSuccessAlert('Inicio de sesión exitoso');
        navigate(props.targetRoute);
      } else {
        showVerificationAlert(user);
      }
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
    <form id="loginForm" className='LoginForm' onSubmit={handleLogin}>
      <h2>{props.title}</h2>

      <input
        type="email"
        id="email"
        placeholder="Correo electrónico"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        autoComplete='on'
      />
      <div className="password-container">
        <input
          type={showPassword ? "text" : "password"}
          id="password"
          placeholder="Contraseña"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete='new-password'
        />
        <button type="button" className="show-password-button" onClick={toggleShowPassword} >
          {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
        </button>
      </div>
      <button className="button" id="loginButton" type="submit" disabled={isLoading}>
        {isLoading ? 'Iniciando...' : 'Iniciar Sesión'}
      </button>


    </form>
  );
};
