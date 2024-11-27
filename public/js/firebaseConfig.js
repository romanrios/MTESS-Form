// Archivo: public/firebaseConfig.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-firestore.js";

// Declarar variables para las instancias de Firebase
let app, auth, db;

// Función para obtener las variables de entorno
async function fetchConfig() {
  try {
    const response = await fetch('/config');
    const config = await response.json();
    console.log(config); // Mostrar la configuración en la consola
    
    // Inicializar Firebase con la configuración obtenida
    const firebaseConfig = {
      apiKey: config.apiKey,
      authDomain: config.authDomain,
      projectId: config.projectId,
      storageBucket: config.storageBucket,
      messagingSenderId: config.messagingSenderId,
      appId: config.appId
    };

    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);
  } catch (error) {
    console.error('Error al obtener la configuración:', error);
  }
}

// Llamar a la función para obtener la configuración e inicializar Firebase
await fetchConfig();

// Exportar las instancias de Firebase
export { app, auth, db };
