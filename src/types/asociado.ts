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

export interface Asociado {
  id: string;
  Nombre: string;
  Identificación: string;
  estado_pipeline: EstadoPipeline;
  aporte_49900_pagado?: boolean;
  ultima_actualizacion?: string;
}

export interface UpdateEstadoRequest {
  asociadoId: string;
  nuevoEstado: EstadoPipeline;
}

export interface UpdateEstadoResponse {
  success: boolean;
  message: string;
  asociado?: Asociado;
}

export const ESTADOS_PIPELINE: EstadoPipeline[] = [
  'Todos',
  'Prospecto',
  'Expediente en Construcción',
  'Pendiente Jurídico',
  'Pendiente Cierre de Crédito',
  'Pendiente Firma y Litivo',
  'Pendiente Revisión Abogado',
  'Cartera Activa',
  'Desembolsado/Finalizado',
];

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

export const ESTADO_COLORS: Record<EstadoPipeline, string> = {
  'Todos': 'bg-gray-100 text-gray-700',
  'Prospecto': 'bg-blue-100 text-blue-700',
  'Expediente en Construcción': 'bg-yellow-100 text-yellow-700',
  'Pendiente Jurídico': 'bg-orange-100 text-orange-700',
  'Pendiente Cierre de Crédito': 'bg-purple-100 text-purple-700',
  'Pendiente Firma y Litivo': 'bg-pink-100 text-pink-700',
  'Pendiente Revisión Abogado': 'bg-indigo-100 text-indigo-700',
  'Cartera Activa': 'bg-green-100 text-green-700',
  'Desembolsado/Finalizado': 'bg-emerald-100 text-emerald-700',
};
