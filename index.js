import express from 'express';

import dotenv from 'dotenv';
dotenv.config();

const app = express();
const port = 3000;

// Enviar las variables de entorno al cliente
app.get('/config', (req, res) => {
  res.json({
      apiKey: process.env.APIKEY,
      authDomain: process.env.AUTHDOMAIN,
      projectId: process.env.PROJECTID,
      storageBucket: process.env.STORAGEBUCKET,
      messagingSenderId: process.env.MESSAGINGSENDERID,
      appId: process.env.APPID
  });
});

// Middleware para servir archivos estáticos desde la carpeta 'public'
app.use(express.static('public'));


app.get('/', (req, res) => {
  res.send('¡Hola, mundo!');
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
