export interface Asociado {
  id: string;
  nombre: string;
  identificacion: string;
  estado_pipeline: EstadoPipeline;
  aporte_49900_pagado: boolean;
  ultima_actualizacion?: string;
}

export type EstadoPipeline =
  | 'Todos'
  | 'Prospecto'
  | 'Expediente en Construcción'
  | 'Pendiente Jurídico'
  | 'Pendiente Cierre de Crédito'
  | 'Pendiente Firma y Litivo'
  | 'Pendiente Revisión Abogado'
  | 'Cartera Activa'
  | 'Desembolsado/Finalizado';

export interface UpdateEstadoRequest {
  asociadoId: string;
  nuevoEstado: EstadoPipeline;
}

export interface UpdateEstadoResponse {
  success: boolean;
  message: string;
  asociado?: Asociado;
}

export const TRANSICIONES_VALIDAS: Record<EstadoPipeline, EstadoPipeline[]> = {
  'Todos': [],
  'Prospecto': ['Expediente en Construcción'],
  'Expediente en Construcción': ['Pendiente Jurídico'],
  'Pendiente Jurídico': ['Pendiente Cierre de Crédito', 'Pendiente Firma y Litivo'],
  'Pendiente Cierre de Crédito': ['Pendiente Jurídico'],
  'Pendiente Firma y Litivo': ['Pendiente Revisión Abogado'],
  'Pendiente Revisión Abogado': ['Cartera Activa'],
  'Cartera Activa': ['Desembolsado/Finalizado'],
  'Desembolsado/Finalizado': [],
};
