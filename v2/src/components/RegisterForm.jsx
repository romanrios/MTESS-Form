import '../css/RegisterForm.css';

export const RegisterForm = () => {
    return <form className='RegisterForm' id="registerForm">

        <h2>REGISTRAR NUEVO USUARIO</h2>

        <input type="email" id="registerEmail" placeholder="Correo electrónico" />
        <input type="password" id="registerPassword" placeholder="Contraseña" />

        <button class="button" id="registerButton">Registrarse</button>

        <p id="registerError"></p>

        <p>¿Ya tienes cuenta? <a id="showLoginForm">Ingresa aquí</a></p>
    </form>
}