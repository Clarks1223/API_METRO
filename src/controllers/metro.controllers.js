import rutasMetro from '../models/rutas.js';
import mongoose from 'mongoose';

const createRuta = async (req, res) => {
  //verifica que todos los datos esten completos antes de guardar los datos en la bd
  if (Object.values(req.body).includes(''))
    return res.status(400).json({ msg: 'Debe completar todos los campos' });
  //crear el objeto con la estructura de BD definida
  const nuevaRuta = new rutasMetro(req.body);
  //guarda el objeto en la BD
  await nuevaRuta.save();
  //muestra un mensaje de exito
  res.status(200).json({ msg: 'se ha creado una nueva ruta', data: nuevaRuta });
};
const mostrarRuta = async (req, res) => {
  //recupera el id
  const { id } = req.params;
  //verifica que el ID ingresado sea correcto
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ msg: 'Id invalido' });
  //busca la ruta con el id, descarta de la busqueda los parametros dentro de select.
  const rutaMetro = await rutasMetro
    .findById(id)
    .select('-createdAt -updatedAt -__v');
  //en caso de no encontrar la ruta con el ID muestra un mensaje de error
  if (!rutaMetro)
    return res
      .status(404)
      .json({ msg: `no existe una ruta con el ID:  ${id}` });
  //muestra un mensaje de busqueda exitosa
  res.status(200).json({ msg: 'Ruta encontrada', data: rutaMetro });
};
const listarRutas = async (req, res) => {
  //realiza la busqueda, select elimina los campos innecesarios de cada elemento
  const rutasRegistradas = await rutasMetro
    .find()
    .select('-createdAt -updatedAt -__v');
  //en caso de no encontrar rutas registradas devuelve un mensaje de error
  if (!rutasRegistradas)
    return res
      .status(400)
      .json({ msg: 'No se han encontrado datos registrados' });
  //mensaje de busqueda completa
  res.status(200).json({ msg: 'Rutas encontradas', data: rutasRegistradas });
};
const eliminarRuta = async (req, res) => {
  //capturo el id
  const { id } = req.params;
  //verificar que el id sea valido
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ msg: 'El ID no es valido' });
  //verifica que exista el usuario
  const rutaFind = await rutasMetro.findById(id);
  if (!rutaFind)
    return res.status(400).json({
      msg: 'No se ha encontrado ningun usuario con el ID proporcionado',
    });
  //eliminar la ruta
  const eliminarRuta = await rutasMetro.findByIdAndDelete(id);
  res
    .status(200)
    .json({ msg: 'Usuario eliminado con exito', data: eliminarRuta });
};
const actualizarRuta = async (req, res) => {
  //capturo el id
  const { id } = req.params;
  //verifico que el id sea valido
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ msg: 'El ID proporcionado no es valido' });
  //verifico que exista una ruta con el id
  const rutaFind = await rutasMetro.findById(id);
  if (!rutaFind)
    return res.status(404).json({ msg: 'No se ha localizado al usuario' });
  //verifico que los datos lleguen completos
  if (Object.values(req.body).includes(''))
    return res.status(400).json({ msg: 'Debe completar todos los campos' });
  //realiza la actualizacion
  const udpateRuta = await rutasMetro.findByIdAndUpdate(id, req.body);
  //muestro un mensaje de aprobacion
  res.status(200).json({ msg: 'Ruta actualizada' });
};
export { createRuta, mostrarRuta, listarRutas, eliminarRuta, actualizarRuta };
