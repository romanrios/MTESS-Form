import { Link } from 'react-router-dom';
import '../css/RegisterForm.css';

export const RegisterForm = () => {
    return <form className='RegisterForm' id="registerForm">

        <h2>REGISTRAR NUEVO USUARIO</h2>

        <input
            type="email"
            id="registerEmail"
            placeholder="Correo electrónico"
            autoComplete='off'
        />
        <input
            type="password"
            id="registerPassword"
            placeholder="Contraseña"
            autoComplete='new-password'
        />

        <button className="button" id="registerButton">Registrarse</button>

        <p id="registerError"></p>

        <p>¿Ya tienes cuenta? <Link to='/'>Ingresa aquí</Link></p>
    </form>
}