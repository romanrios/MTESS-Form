import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { showSuccessAlert } from "../utils/alerts";
import "../css/Navigation.css";

export const Navigation = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    navigate("/");
    await logout();
    showSuccessAlert("Sesión cerrada");
  };

  return (
    <nav className="Navigation">
      <ul>
        {currentUser ? (
          <>
            {location.pathname.startsWith("/form/") && (
              <li>
                <NavLink to="/admin/list" className="nav-link">
                  Volver a la Lista
                </NavLink>
              </li>
            )}
            <li>
              <button onClick={handleLogout}>Cerrar sesión</button>
            </li>
          </>
        ) : (
          <>
            <li>
              <NavLink to="/" className="nav-link">
                Iniciar sesión
              </NavLink>
            </li>
            <li>
              <NavLink to="/register" className="nav-link">
                Registrarse
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin" className="nav-link">
                Administrador
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};
