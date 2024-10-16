import { auth, db } from './firebaseConfig.js'; // Importa db desde firebaseConfig.js
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-auth.js";
import { collection, doc, setDoc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-firestore.js"; // Importar funciones de Firestore
import './autoResizeTextarea.js';
import './login.js';
import './localStorage.js';
import { fields } from './fields.js';

// Constantes para elementos del DOM
const loginForm = document.getElementById("loginForm");
const myForm = document.getElementById("myForm");
const mensaje = document.getElementById("mensaje");

// FIREBASE FORM DATA SEND

let userId;

// Verificar si el usuario está autenticado
onAuthStateChanged(auth, async (user) => {
    if (user) {
        userId = user.uid;
        console.log("Usuario autenticado:", userId);
        // Verificar si el formulario ya fue completado y cargarlo
        await cargarFormulario(userId);
    } else {
        console.log("Usuario no autenticado");
        loginForm.style.display = "flex";
        myForm.style.display = "none";
    }
});

// Función para cargar el formulario desde Firestore
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

        mensaje.innerText = 'Puedes modificar el formulario si es necesario y volver a enviarlo.';
    } else {
        console.log("No hay formulario previo para este usuario.");
        mensaje.innerText = 'Completa el formulario a continuación.';
    }
}

// Manejo del evento de envío del formulario
myForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = {};
    fields.forEach(field => {
        formData[field] = document.getElementById(field).value;
    });

    try {
        // Verificar si el documento ya existe antes de actualizarlo
        const docRef = doc(db, "formularios", userId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            // Actualizar los datos existentes
            await updateDoc(docRef, formData);
            mensaje.innerText = 'Formulario actualizado correctamente';
            console.log("Formulario actualizado");
        } else {
            // Guardar un nuevo documento
            await setDoc(docRef, formData);
            mensaje.innerText = 'Formulario enviado correctamente';
            console.log("Formulario guardado por primera vez");
        }
    } catch (error) {
        console.error("Error al enviar el formulario:", error);
        mensaje.innerText = 'Error al enviar el formulario';
    }
});
