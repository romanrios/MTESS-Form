import "../css/List.css";
import { useEffect, useState } from "react";
import { db } from "../firebase-config";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { showErrorAlert } from "../utils/alerts.js";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { FaMagnifyingGlass } from "react-icons/fa6";

export const List = () => {
  const [users, setUsers] = useState([]); // State to store user data
  const [isLoading, setIsLoading] = useState(true); // State to manage loading status
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Fetch user documents from the 'users' collection
        const querySnapshot = await getDocs(collection(db, "users"));
        const usersData = [];
        const auth = getAuth();
        for (const userDoc of querySnapshot.docs) {
          const userData = userDoc.data();
          // Fetch the corresponding form document for each user
          const formDocRef = doc(db, "formularios", userDoc.id);
          const formDoc = await getDoc(formDocRef);
          const formData = formDoc.exists() ? formDoc.data() : {};
          // Get the user from Firebase Authentication
          const user = await auth.currentUser;
          // Combine user data and form data
          const createdAt = userData.createdAt
            ? new Date(userData.createdAt.seconds * 1000).toLocaleDateString()
            : "N/A";
          usersData.push({
            id: userDoc.id, // Add user ID
            email: userData.email,
            emailVerified: user.emailVerified,
            coord_nombre: formData.coord_nombre || "N/A",
            inst_institucion: formData.inst_institucion || "N/A",
            createdAt: createdAt,
          });
        }
        setUsers(usersData); // Update state with fetched data
      } catch (e) {
        showErrorAlert(e.code); // Log any errors
      } finally {
        setIsLoading(false); // Set loading status to false
      }
    };
    fetchUsers(); // Call the fetch function
  }, []); // Empty dependency array to run effect only once

  const handleShowForm = (userId) => {
    navigate(`/form/${userId}`); // Navigate to the form page with the user ID
  };

  if (isLoading) {
    return <p>Cargando usuarios...</p>; // Show loading message while fetching data
  }

  return (
    <section className="List">
      <h2>Lista de Usuarios</h2>
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
