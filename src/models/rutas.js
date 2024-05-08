import { Schema, model } from 'mongoose';
const rutasMetroSchema = new Schema(
  {
    nombre: {
      type: String,
      require: true,
      trim: true,
    },
    sector: {
      type: String,
      require: true,
      trim: true,
    },
    salida: {
      type: String,
      require: true,
      trim: true,
    },
    llegada: {
      type: String,
      require: true,
      trim: true,
    },
    maquinista: {
      type: String,
      require: true,
      trim: true,
    },
    detalles: {
      type: String,
      require: true,
      trim: true,
    },
  },
  { timestamps: true }
);
export default model('rutasMetro', rutasMetroSchema);
