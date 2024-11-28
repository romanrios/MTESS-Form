import express from 'express';

const app = express();
const port = 3000;

// Middleware para servir archivos estáticos desde la carpeta 'public'
app.use(express.static('public'));


app.get('/', (req, res) => {
  res.send('¡Hola, mundo!');
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
