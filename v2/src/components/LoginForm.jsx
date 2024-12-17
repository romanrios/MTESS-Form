import '../css/LoginForm.css';

export const LoginForm = () => {
    return <form id="loginForm" className='LoginForm'>

        <h2>INICIAR SESIÓN</h2>

        <input type="email" id="email" placeholder="usuario@gmail.com" required />
        <input type="password" id="password" placeholder="123456" required />

        <button class="button" id="loginButton">Iniciar Sesión</button>

        <p id="loginError"></p>
        <p>¿No tienes una cuenta? <a id="showRegisterForm">Regístrate aquí</a></p>
    </form>
}