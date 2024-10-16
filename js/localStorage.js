import { fields } from "./fields.js";

// LOCAL STORAGE 

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
            element.value = formData[field] || "";
        });
    }
}


// Cargar los datos guardados cuando se cargue la página
window.onload = loadFormData;

// Guardar los datos del formulario cuando el usuario cambie algún campo
document.getElementById("myForm").addEventListener("input", saveFormData);