// autoResizeTextarea.js

// Selecciona todos los elementos textarea de la página
const textareas = document.querySelectorAll('textarea');

// Establece un límite mínimo y máximo de filas visibles (opcional)
const minRows = 1;
const maxRows = 30;

// Función para ajustar dinámicamente las filas según el contenido
function autoResizeTextarea() {
    const lines = this.value.split('\n').length;
    this.rows = Math.min(Math.max(lines, minRows), maxRows); // Ajustar dentro de los límites
}

// Agrega el evento de "input" a cada textarea para que se ejecute la función
textareas.forEach(textarea => {
    textarea.addEventListener('input', autoResizeTextarea);
});
