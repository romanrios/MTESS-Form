import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase-config';
import { signInWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import '../css/LoginForm.css';

export const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    setError('');
    setMessage('');
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (user.emailVerified) {
        navigate('/form');
      } else {
        setMessage(`Antes de iniciar debes verificar el correo. ¿Deseas que enviemos el correo de verificación a ${email}?`);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSendVerificationEmail = async () => {
    try {
      await sendEmailVerification(auth.currentUser);
      setMessage(`Correo de verificación enviado a ${email}`);
    } catch (error) {
      setError(error.message);
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

      {error && <p id="loginError">{error}</p>}
      {message && (
        <div>
          <p id="loginMessage">{message}</p>
          <button type="button" onClick={handleSendVerificationEmail}>
            Enviar correo de verificación
          </button>
        </div>
      )}
      <p>¿No tienes una cuenta? <Link to="/register">Regístrate aquí</Link></p>
    </form>
  );
};
