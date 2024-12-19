import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../utils/auth';
import { showErrorAlert, showSuccessAlert, showVerificationAlert } from '../utils/alerts';
import '../css/LoginForm.css';

export const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginUser(email, password);

      if (user.emailVerified) {
        showSuccessAlert('Inicio de sesión exitoso');
        navigate('/form');
      } else {
        showVerificationAlert(user);
      }
    } catch (error) {
      showErrorAlert(error.message);
    }
  };

  return (
    <form id="loginForm" className='LoginForm' onSubmit={handleLogin}>
      <h2>INICIAR SESIÓN</h2>

      <input
        type="email"
        id="email"
        placeholder="Correo electrónico"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        autoComplete='on'
      />
      <input
        type="password"
        id="password"
        placeholder="Contraseña"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        autoComplete='new-password'
      />

      <button className="button" id="loginButton" type="submit">Iniciar Sesión</button>

    </form>
  );
};
