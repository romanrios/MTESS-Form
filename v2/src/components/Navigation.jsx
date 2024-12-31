import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { showSuccessAlert } from '../utils/alerts';

export const Navigation = () => {
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        navigate('/');
        await logout();
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
                        <li><button onClick={handleLogout}>Cerrar sesión</button></li>
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
