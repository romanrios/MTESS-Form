import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase-config';
import { signInWithEmailAndPassword } from 'firebase/auth';
import '../css/LoginForm.css';

export const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/form');
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
      <p>¿No tienes una cuenta? <Link to="/register">Regístrate aquí</Link></p>
    </form>
  );
};
