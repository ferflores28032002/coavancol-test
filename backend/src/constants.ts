export const MESSAGES = {
  ERRORS: {
    MISSING_PARAMS: 'Faltan parámetros requeridos: asociadoId y nuevoEstado',
    ASOCIADO_NOT_FOUND: (id: string) => `Asociado con ID ${id} no encontrado`,
    SAME_STATE: 'El estado no ha cambiado',
    INVALID_TRANSITION: (from: string, to: string) => 
      `Transición no válida de "${from}" a "${to}"`,
    PAYMENT_REQUIRED: 'No se puede avanzar a "Pendiente Jurídico" sin el aporte de $49,900 pagado',
    INTERNAL_SERVER: 'Error interno del servidor',
    SEED_DATA: 'Error seeding data',
  },
  SUCCESS: {
    UPDATE_ESTADO: 'Estado actualizado correctamente',
    SEEDED: (count: number) => `Seeded ${count} asociados`,
  },
  INFO: {
    SERVER_RUNNING: (port: number) => `Server running on http://localhost:${port}`,
  },
};

export const HTTP_STATUS = {
  OK: 200,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};

export const API_ENDPOINTS = {
  UPDATE_ESTADO: '/api/updateEstadoPipeline',
  HEALTH: '/health',
};

export const GITHUB_DATA_URL = 
  'https://raw.githubusercontent.com/managerrojo/COAVANCOL-Prueba-T-cnica-/refs/heads/main/IndexAsociados';
