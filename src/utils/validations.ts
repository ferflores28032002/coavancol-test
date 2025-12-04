import type { EstadoPipeline } from '../types/asociado';
import { TRANSICIONES_VALIDAS } from '../types/asociado';
import { MESSAGES } from '../constants/messages';

export const validarTransicion = (
  estadoActual: EstadoPipeline,
  nuevoEstado: EstadoPipeline
): { valido: boolean; mensaje?: string } => {
  if (estadoActual === nuevoEstado) {
    return { valido: false, mensaje: MESSAGES.ERRORS.SAME_STATE };
  }

  const transicionesPermitidas = TRANSICIONES_VALIDAS[estadoActual];
  
  if (!transicionesPermitidas.includes(nuevoEstado)) {
    return {
      valido: false,
      mensaje: MESSAGES.ERRORS.INVALID_TRANSITION(estadoActual, nuevoEstado),
    };
  }

  return { valido: true };
};

export const validarAportePagado = (
  nuevoEstado: EstadoPipeline,
  aportePagado: boolean
): { valido: boolean; mensaje?: string } => {
  if (nuevoEstado === 'Pendiente Jurídico' && !aportePagado) {
    return {
      valido: false,
      mensaje: MESSAGES.ERRORS.PAYMENT_REQUIRED,
    };
  }

  return { valido: true };
};
