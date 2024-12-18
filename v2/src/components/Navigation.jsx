import { signOut } from 'firebase/auth';
import { auth } from '../firebase-config';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export const Navigation = () => {
    const { currentUser } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await signOut(auth);
        navigate('/');
    };

    return (
        <nav>
            <ul>
                {currentUser ? (
                    currentUser.emailVerified ? (
                        <>
                            <li><button onClick={handleLogout}>Cerrar sesión</button></li>
                        </>
                    ) : (
                        <>
                            <li>
                                <NavLink
                                    // to="/verify-email"
                                    to="/"
                                    style={({ isActive }) => ({
                                        textDecoration: isActive ? 'underline' : 'none',
                                        textUnderlineOffset: '8px'
                                    })}
                                >
                                    Verificar correo electrónico
                                </NavLink>
                            </li>
                            <li><button onClick={handleLogout}>Cerrar sesión</button></li>
                        </>
                    )
                ) : (
                    <>
                        <li>
                            <NavLink
                                to="/"
                                style={({ isActive }) => ({
                                    textDecoration: isActive ? 'underline' : 'none',
                                    textUnderlineOffset: '8px'
                                })}
                            >
                                Iniciar sesión
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/register"
                                style={({ isActive }) => ({
                                    textDecoration: isActive ? 'underline' : 'none',
                                    textUnderlineOffset: '8px'
                                })}
                            >
                                Registrarse
                            </NavLink>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
};
