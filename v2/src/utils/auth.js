import { auth, db } from '../firebase-config';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

// Función para registrar usuario
export const registerUser = async (email, password) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Guardar usuario en Firestore
    await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        createdAt: new Date()
    });

    // Enviar correo de verificación
    await sendEmailVerification(user);

    return user;
};

// Función para iniciar sesión
export const loginUser = async (email, password) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
};

// Función para enviar correo de verificación
export const sendVerificationEmail = async (user) => {
    await sendEmailVerification(user);
};


// Función para iniciar sesión con Google
export const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);

    const user = result.user;

    // Guardar usuario en Firestore si es nuevo
    const userDoc = doc(db, "users", user.uid);
    await setDoc(userDoc, {
        email: user.email,
        name: user.displayName,
        photoURL: user.photoURL,
        createdAt: new Date()
    }, { merge: true }); // Usa merge para no sobrescribir datos existentes

    return user;
};
