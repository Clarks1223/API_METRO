import { Router } from 'express';
import {
  createRuta,
  mostrarRuta,
  listarRutas,
  eliminarRuta,
  actualizarRuta,
} from '../controllers/metro.controllers.js';

const router = Router();

router.route('/metro').post(createRuta).get(listarRutas);
router
  .route('/metro/:id')
  .get(mostrarRuta)
  .delete(eliminarRuta)
  .put(actualizarRuta);
export default router;
