import { auth } from "./firebaseConfig.js";
import { signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword, sendEmailVerification } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-auth.js";

// Almacena los elementos en constantes
const loginButton = document.getElementById('loginButton');
const logoutButton = document.getElementById('logoutButton');
const showRegisterForm = document.getElementById('showRegisterForm');
const showLoginForm = document.getElementById('showLoginForm');
const registerButton = document.getElementById('registerButton');
const registerForm = document.getElementById('registerForm');
const loginForm = document.getElementById('loginForm');
const myForm = document.getElementById('myForm');
const loginError = document.getElementById('loginError');
const registerEmailInput = document.getElementById('registerEmail');
const registerPasswordInput = document.getElementById('registerPassword');
const loginEmailInput = document.getElementById('email');
const loginPasswordInput = document.getElementById('password');
const registerError = document.getElementById('registerError');

// Lógica para Iniciar Sesión
loginButton.addEventListener('click', (e) => {
  e.preventDefault();

  const email = loginEmailInput.value;
  const password = loginPasswordInput.value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;

      if (!user.emailVerified) {
        sendEmailVerification(user)
          .then(() => {
            console.log("Correo de verificación enviado");
            alert("Por favor, revisa tu correo y verifica tu dirección antes de continuar.");
          })
          .catch((error) => {
            console.error("Error al enviar correo de verificación:", error);
          });
      } else {
        console.log("Login exitoso");
        loginForm.style.display = 'none';
        myForm.style.display = 'block';
        logoutButton.style.display = 'block';

        loginEmailInput.value = '';
        loginPasswordInput.value = '';
      }
    })
    .catch((error) => {
      console.error("Error al iniciar sesión:", error);
      loginError.innerText = "Error al iniciar sesión. Detalles: " + error.message;

      loginEmailInput.value = '';
      loginPasswordInput.value = '';
    });
});

// Lógica para Cerrar Sesión
logoutButton.addEventListener('click', () => {
  signOut(auth)
    .then(() => {
      console.log("Cierre de sesión exitoso");
      loginForm.style.display = 'flex';
      myForm.style.display = 'none';
      logoutButton.style.display = 'none';
    })
    .catch((error) => {
      console.error("Error al cerrar sesión:", error);
    });
});

// Mostrar el formulario de registro
showRegisterForm.addEventListener('click', (e) => {
  e.preventDefault();
  loginForm.style.display = 'none';
  registerForm.style.display = 'flex';
});

// Mostrar el formulario de Login
showLoginForm.addEventListener('click', (e) => {
  e.preventDefault();
  loginForm.style.display = 'flex';
  registerForm.style.display = 'none';
});

// Lógica para Registrarse
registerButton.addEventListener('click', (e) => {
  e.preventDefault();

  const email = registerEmailInput.value;
  const password = registerPasswordInput.value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;

      sendEmailVerification(user)
        .then(() => {
          console.log("Correo de verificación enviado");
          loginError.innerText = "Registro exitoso. Por favor, verifica tu correo electrónico antes de iniciar sesión.";
          registerEmailInput.value = '';
          registerPasswordInput.value = '';

          // Ocultar Register mostrar Login
          loginForm.style.display = 'flex';
          registerForm.style.display = 'none';

        })
        .catch((error) => {
          console.error("Error al enviar correo de verificación:", error);
        });
    })
    .catch((error) => {
      console.error("Error al registrarse: ", error);
      registerError.innerText = "Error al registrarse: "+ error.message;
      registerEmailInput.value = '';
      registerPasswordInput.value = '';
    });
});
