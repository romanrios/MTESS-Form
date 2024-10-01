import { db } from './firebaseConfig.js'; // Importa db desde firebaseConfig.js
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-firestore.js"; // Importar funciones de Firestore
import './autoResizeTextarea.js';

const fields = ["inst_institucion",
    "inst_cuit",
    "inst_domicilio",
    "inst_localidad",
    "inst_cp",
    "inst_telefono",
    "inst_mail",
    "coord_nombre",
    "coord_dni",
    "coord_registro",
    "coord_telefono",
    "coord_mail",
    "coord_horario",
    "coord_descripcion"
];


// Función para guardar los datos del formulario en localStorage como un objeto
function saveFormData() {
    console.log("saveFormData")


    const formData = {};

    fields.forEach(field => {
        formData[field] = document.getElementById(field).value;
    });

    // Convertir el objeto a JSON y almacenarlo en localStorage
    localStorage.setItem("formData", JSON.stringify(formData));
}




function loadFormData() {

    const savedData = localStorage.getItem("formData");

    if (savedData) {
        const formData = JSON.parse(savedData);  // Convertir de JSON a objeto        

        fields.forEach(field => {
            const element = document.getElementById(field);
            // if (element) {
                element.value = formData[field] || "";
            // }
        });
    }
}




// Función auxiliar para loadFormData
function setFormData(fieldName, formData) {
    document.getElementById(fieldName).value = formData[fieldName] || "";
}

// Cargar los datos guardados cuando se cargue la página
window.onload = loadFormData;

// Guardar los datos del formulario cuando el usuario cambie algún campo
document.getElementById("myForm").addEventListener("input", saveFormData);





// FIREBASE FORM DATA SEND

// Función para enviar datos a Firestore
async function enviarDatosFormulario(data) {
    try {
        const docRef = await addDoc(collection(db, "nombre_de_tu_colección"), data);
        console.log("Documento escrito con ID: ", docRef.id);
    } catch (e) {
        console.error("Error añadiendo documento: ", e);
    }
}

// Manejar el evento de envío del formulario
document.getElementById('myForm').addEventListener('submit', async function (event) {
    event.preventDefault(); // Evita el envío tradicional

    const formData = {};
    fields.forEach(field => {
        formData[field] = document.getElementById(field).value;
    });

    // Enviar datos a Firestore
    await enviarDatosFormulario(formData);

    // Mostrar mensaje de éxito
    document.getElementById('mensaje').textContent = "Datos enviados exitosamente!";

    // Reiniciar el formulario
    this.reset();
});