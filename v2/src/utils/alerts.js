import Swal from 'sweetalert2';
import { sendVerificationEmail } from './auth';

export const showErrorAlert = (message) => {
    Swal.fire({
        icon: 'error',
        title: 'Error',
        text: getFriendlyErrorMessage(message),
    });
};

export const showSuccessAlert = (message) => {
    Swal.fire({
        icon: 'success',
        title: 'Éxito',
        text: message,
    });
};

export const showInfoAlert = (message) => {
    Swal.fire({
        icon: 'info',
        title: 'Información',
        text: message,
    });
};

export const showVerificationAlert = (user) => {
    Swal.fire({
        icon: 'info',
        title: 'Verificación necesaria',
        text: 'Debes verificar tu correo electrónico.',
        footer: '<a href="#" id="send-verification-link">Enviar correo de verificación nuevamente</a>',
        didRender: () => {
            const sendVerificationLink = document.querySelector('#send-verification-link');
            sendVerificationLink.addEventListener('click', async (event) => {
                event.preventDefault();
                try {
                    await sendVerificationEmail(user);
                    showSuccessAlert('Se ha enviado un nuevo correo de verificación.');
                } catch (error) {
                    showErrorAlert(error.message);
                }
            });
        }
    });
};




const errorMessages = {
    'auth/email-already-in-use': 'Este correo ya está registrado. Por favor, usa otro correo o inicia sesión.',
    'auth/invalid-email': 'El correo electrónico no es válido. Verifícalo e inténtalo de nuevo.',
    'auth/operation-not-allowed': 'La operación no está permitida. Contacta al soporte para más información.',
    'auth/weak-password': 'La contraseña es demasiado débil. Usa una combinación de letras, números y símbolos.',
    'auth/user-disabled': 'La cuenta de usuario ha sido deshabilitada. Contacta al soporte para más información.',
    'auth/user-not-found': 'No se encontró un usuario con este correo electrónico. Verifica e inténtalo de nuevo.',
    'auth/wrong-password': 'La contraseña es incorrecta. Verifica e inténtalo de nuevo.',
    'auth/account-exists-with-different-credential': 'Ya existe una cuenta con estas credenciales. Intenta iniciar sesión con otro método.',
    'auth/invalid-credential': 'Las credenciales proporcionadas no son válidas. Verifica e inténtalo de nuevo.',
    'auth/invalid-verification-code': 'El código de verificación no es válido. Verifica e inténtalo de nuevo.',
    'auth/invalid-verification-id': 'El ID de verificación no es válido. Verifica e inténtalo de nuevo.',
    'auth/credential-already-in-use': 'Estas credenciales ya están en uso. Por favor, usa otras credenciales.',
    'auth/timeout': 'La operación ha expirado. Por favor, inténtalo de nuevo.',
    'auth/too-many-requests': 'Se han realizado demasiados intentos. Por favor, espera un momento e inténtalo de nuevo.',
    'auth/popup-closed-by-user': 'El popup fue cerrado antes de completar la operación. Inténtalo de nuevo.',
    'auth/popup-blocked': 'El popup fue bloqueado por el navegador. Permite los popups e inténtalo de nuevo.',
    'auth/unauthorized-domain': 'El dominio no está autorizado para realizar esta operación.',
    'auth/network-request-failed': 'La solicitud de red falló. Por favor, verifica tu conexión e inténtalo de nuevo.',
    'auth/requires-recent-login': 'Esta operación requiere que hayas iniciado sesión recientemente. Por favor, inicia sesión de nuevo e inténtalo.',
    'auth/missing-email': 'El correo electrónico es obligatorio. Proporciónalo e inténtalo de nuevo.',
    'auth/missing-password': 'La contraseña es obligatoria. Proporciónala e inténtalo de nuevo.',
    'auth/quota-exceeded': 'Se ha excedido la cuota. Inténtalo de nuevo más tarde.',
};

const getFriendlyErrorMessage = (errorCode) => {
    const matchedKey = Object.keys(errorMessages).find(key => errorCode.includes(key));
    return errorMessages[matchedKey] || `Ocurrió un error. Por favor, intenta de nuevo. (${errorCode})`;
};

