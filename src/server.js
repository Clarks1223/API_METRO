import express from 'express';
import dotenv from 'dotenv';
import routerMetro from './routes/rutasMetro.routes.js';
import cors from "cors";

dotenv.config();
const app = express();
//configuracion del puerto
//Configuraciones
app.set('port', process.env.PORT || 3000);
//permite que las solicitudes se hagan desde otros dominios
app.use(cors());
//middlewares
app.use(express.json());
//importo las rutas

app.use('/api', routerMetro);
//en caso de que no encuentre las rutas
app.use((req, res) => {
  res.status(400).send('Endpoint no encontrado 404');
});
export default app;
