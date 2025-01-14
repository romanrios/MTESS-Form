import "../css/List.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase-config";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { useAuth } from "../contexts/AuthContext";
import { showErrorAlert } from "../utils/alerts.js";
import { FaMagnifyingGlass } from "react-icons/fa6";

export const List = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Fetch user documents from the 'users' collection
        const querySnapshot = await getDocs(collection(db, "users"));
        const usersData = [];
        for (const userDoc of querySnapshot.docs) {
          const userData = userDoc.data();
          // Fetch the corresponding form document for each user
          const formDocRef = doc(db, "formularios", userDoc.id);
          const formDoc = await getDoc(formDocRef);
          const formData = formDoc.exists() ? formDoc.data() : {};
          // Combine user data and form data
          const createdAt = userData.createdAt
            ? new Date(userData.createdAt.seconds * 1000)
            : null; // Mantén la fecha como objeto Date
          usersData.push({
            id: userDoc.id, // Add user ID
            email: userData.email,
            emailVerified: currentUser?.emailVerified || false, // Usar currentUser del contexto
            coord_nombre: formData.coord_nombre || "N/A",
            inst_institucion: formData.inst_institucion || "N/A",
            createdAt: createdAt,
          });
        }

        // Ordenar usuarios por fecha de creación (más reciente a más antigua)
        usersData.sort((a, b) => b.createdAt - a.createdAt); // Ordenar fechas como objetos Date

        // Formatear las fechas para la tabla después de ordenar
        const formattedUsersData = usersData.map((user) => ({
          ...user,
          createdAt: user.createdAt
            ? user.createdAt.toLocaleDateString("es-AR", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              })
            : "N/A",
        }));

        setUsers(formattedUsersData); // Update state with fetched and sorted data
      } catch (e) {
        showErrorAlert(e.code); // Log any errors
      } finally {
        setIsLoading(false);
      }
    };
    fetchUsers(); // Call the fetch function
  }, [currentUser]); // Agregar currentUser como dependencia por si cambia

  const handleShowForm = (userId) => {
    navigate(`/form/${userId}`);
  };

  if (isLoading) {
    return <p>Cargando usuarios...</p>;
  }

  return (
    <section className="List">
      <h2>Lista de Usuarios Registrados</h2>
      <div className="List_table_container">
        <table>
          <thead>
            <tr>
              <th>
                Fecha de
                <br />
                Registro
              </th>
              <th>Email</th>
              <th>Coordinador</th>
              <th>Institución</th>
              <th>
                Email
                <br />
                Verificado
              </th>
              <th>Ver</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td>{user.createdAt}</td>
                <td>{user.email}</td>
                <td>{user.coord_nombre}</td>
                <td>{user.inst_institucion}</td>
                <td>{user.emailVerified ? "Sí" : "No"}</td>
                <td className="List_td_ver">
                  <button onClick={() => handleShowForm(user.id)}>
                    <FaMagnifyingGlass />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};
