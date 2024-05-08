import express from 'express';
import dotenv from 'dotenv';
import routerMetro from './routes/rutasMetro.routes.js';
dotenv.config();
const app = express();
//middlewares
app.use(express.json());
//importo las rutas
app.use('/api', routerMetro);
//en caso de que no encuentre las rutas
app.use((req, res) => {
  res.status(400).send('Endpoint no encontrado 404');
});
export default app;
