import { signOut } from 'firebase/auth';
import { auth } from '../firebase-config';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { showSuccessAlert } from '../utils/alerts';

export const Navigation = () => {
    const { currentUser } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        navigate('/');
        await signOut(auth);
        showSuccessAlert('Sesión cerrada');
    };

    const navLinkStyle = ({ isActive }) => ({
        textDecoration: isActive ? 'underline' : 'none',
        textUnderlineOffset: '8px'
    });

    return (
        <nav>
            <ul>
                {currentUser ? (
                    <>
                        {currentUser.emailVerified ? (
                            <li><button onClick={handleLogout}>Cerrar sesión</button></li>
                        ) : (
                            <li>
                                <NavLink to="/" style={navLinkStyle}>
                                    Verificar correo electrónico
                                </NavLink>
                            </li>
                        )}
                    </>
                ) : (
                    <>
                        <li>
                            <NavLink to="/" style={navLinkStyle}>
                                Iniciar sesión
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/register" style={navLinkStyle}>
                                Registrarse
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/admin" style={navLinkStyle}>
                                Administrador
                            </NavLink>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
};
