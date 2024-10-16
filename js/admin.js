// Importar las dependencias de Firebase necesarias
import { db, auth } from './firebaseConfig.js';
import { collection, getDocs, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-firestore.js";
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-auth.js";

const ADMIN_EMAIL = "romanrios@live.com";

// Referencia al formulario de inicio de sesión y otros elementos de la página
const loginForm = document.getElementById('loginForm');
const loginButton = document.getElementById('loginButton');
const loginError = document.getElementById('loginError');
const formListTable = document.getElementById('formList');
const logoutButton = document.getElementById('logoutButton');
const myForm = document.getElementById("myForm");

// Inicialmente, ocultar la tabla de formularios
formListTable.style.display = 'none';

// Evento para manejar el inicio de sesión cuando se presiona el botón "Iniciar Sesión"
loginButton.addEventListener('click', (event) => {
    event.preventDefault(); // Evita que el formulario se envíe automáticamente

    // Obtener los valores de email y contraseña del formulario
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Autenticar al usuario con Firebase Authentication
    if (email == ADMIN_EMAIL) {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Inicio de sesión exitoso
                console.log("Inicio de sesión exitoso");
                loginError.textContent = ''; // Limpia cualquier mensaje de error anterior

                // Mostrar la tabla y cargar los formularios de Firestore
                cargarFormularios();
                formListTable.style.display = 'table';
                logoutButton.style.display = 'block';

                // Limpiar los campos del formulario
                document.getElementById('email').value = '';
                document.getElementById('password').value = '';
            })
            .catch((error) => {
                // Error de inicio de sesión
                console.error("Error de inicio de sesión:", error);
                loginError.textContent = 'Error de inicio de sesión. Verifica las credenciales.';

                // Limpiar los campos del formulario
                document.getElementById('email').value = '';
                document.getElementById('password').value = '';
            });
    }
});

// Función para cargar los formularios desde Firestore y mostrarlos en la tabla
async function cargarFormularios() {
    try {
        loginForm.style.display = 'none';

        // Referencia a la colección "formularios"
        const formulariosCollection = collection(db, 'formularios');
        const snapshot = await getDocs(formulariosCollection);

        // Obtener la referencia al <tbody> de la tabla
        const formListBody = formListTable.getElementsByTagName('tbody')[0];
        formListBody.innerHTML = ''; // Limpia las filas anteriores, si las hubiera

        // Iterar sobre cada documento en la colección y crear una fila en la tabla
        snapshot.forEach((doc) => {
            const formulario = doc.data();
            const row = document.createElement('tr');

            // Crear las celdas para cada campo
            row.innerHTML = `
        <td>${formulario.inst_cuit}</td>
        <td>${formulario.inst_institucion}</td>
        <td>${formulario.inst_mail}</td>
        <td><button class="view-button" data-id="${doc.id}"><i class="fas fa-search"></i></button></td>
        <td><button class="edit-button" data-id="${doc.id}"><i class="fas fa-pencil-alt"></i></button></td>
        <td><button class="delete-button" data-id="${doc.id}"><i class="fas fa-trash"></i></button></td>
        `;

            // Añadir la fila a la tabla
            formListBody.appendChild(row);
        });

         // Añadir los eventos a los botones
         addButtonEventListeners();

    } catch (error) {
        console.error("Error al leer los formularios:", error);
    }
}


// Función para agregar Listeners a los botones Ver Editar Eliminar
function addButtonEventListeners() {
    // Seleccionar todos los botones de vista
    const viewButtons = document.querySelectorAll('.view-button');
    viewButtons.forEach((button) => {
        button.addEventListener('click', (event) => {
            const formId = event.target.closest('button').dataset.id;
            verFormulario(formId);
        });
    });

    // Seleccionar todos los botones de edición
    const editButtons = document.querySelectorAll('.edit-button');
    editButtons.forEach((button) => {
        button.addEventListener('click', (event) => {
            const formId = event.target.closest('button').dataset.id;
            editarFormulario(formId);
        });
    });

    // Seleccionar todos los botones de eliminación
    const deleteButtons = document.querySelectorAll('.delete-button');
    deleteButtons.forEach((button) => {
        button.addEventListener('click', (event) => {
            const formId = event.target.closest('button').dataset.id;
            eliminarFormulario(formId);
        });
    });
}






// Funciones Ver Editar Eliminar Formulario

async function verFormulario(id) {
    // Obtener el formulario de Firestore con el id correspondiente
    await cargarFormulario(id);
    myForm.style.display = "block";
    console.log("Mostrando detalles del formulario con ID:", id);
    // Aquí puedes obtener el documento y mostrar la información en una modal o en una sección específica de la página
}

function editarFormulario(id) {
    // Lógica para cargar los datos del formulario y permitir su edición
    console.log("Editando formulario con ID:", id);
    // Aquí puedes obtener el documento, rellenar un formulario de edición, y luego permitir al usuario guardarlo
}

function eliminarFormulario(id) {
    // Lógica para eliminar el documento de Firestore
    console.log("Eliminando formulario con ID:", id);
    // Aquí puedes agregar la lógica para eliminar el documento de Firestore usando el id
}




// Función para cargar el formulario principal desde Firestore. Igual al de script.js
async function cargarFormulario(userId) {
    const docRef = doc(db, "formularios", userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        const datosFormulario = docSnap.data();
        console.log("Datos del formulario recuperados:", datosFormulario);

        for (const field in datosFormulario) {
            const element = document.getElementById(field);
            if (element) {
                element.value = datosFormulario[field] || ""; // Autocompletar con el valor del formulario si existe
            }
        }

        document.getElementById("mensaje").innerText = 'Formulario de usuario cargado correctamente.';
    } else {
        console.log("No hay formulario previo para este usuario.");
        document.getElementById("mensaje").innerText = 'No hay formulario previo para este usuario.';
    }
}










// Escuchar el estado de autenticación para mostrar la tabla si el usuario ya está autenticado
onAuthStateChanged(auth, (user) => {
    if (user) {
        // Si ya hay un usuario autenticado, mostrar la tabla y cargar los formularios
        cargarFormularios();
        formListTable.style.display = 'table';
        logoutButton.style.display = 'block';
    } else {
        // Si no hay usuario autenticado, esconder la tabla
        formListTable.style.display = 'none';
    }
});



// Lógica para Cerrar Sesión
logoutButton.addEventListener('click', () => {
    signOut(auth)
        .then(() => {
            console.log("Cierre de sesión exitoso");
            loginForm.style.display = 'flex'; // Muestra el formulario de inicio de sesión
            logoutButton.style.display = 'none'; // Oculta el botón de cerrar sesión
            formListTable.style.display = 'none'; // Innecesario?
        })
        .catch((error) => {
            console.error("Error al cerrar sesión:", error);
        });
});






