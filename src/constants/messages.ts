export const MESSAGES = {
  ERRORS: {
    FETCH_ASOCIADOS: 'Error al cargar los asociados',
    UNKNOWN: 'Error desconocido',
    REQUEST: 'Error en la petición',
    SAME_STATE: 'El estado no ha cambiado',
    INVALID_TRANSITION: (from: string, to: string) => 
      `No se puede cambiar de "${from}" a "${to}"`,
    PAYMENT_REQUIRED: 'No se puede avanzar a "Pendiente Jurídico" sin el aporte de $49,900 pagado',
  },
  SUCCESS: {
    UPDATE_ESTADO: 'Estado actualizado correctamente',
  },
  LABELS: {
    FILTER_BY_STATE: 'Filtrar por Estado',
    EDIT_ASOCIADO: 'Editar asociado',
    STATE: 'Estado:',
    PAYMENT_STATUS: 'Aporte $49,900:',
    PAID: 'Pagado',
    PENDING: 'Pendiente',
    LAST_UPDATE: 'Última actualización:',
    SELECT_NEW_STATE: 'Seleccionar nuevo estado',
    CURRENT_STATE: 'Estado actual:',
    NEW_STATE: 'Nuevo estado:',
    CANCEL: 'Cancelar',
    SAVE: 'Guardar',
    LOADING: 'Cargando...',
    NO_ASOCIADOS: 'No se encontraron asociados',
    ASOCIADOS_LIST: 'Lista de Asociados',
  },
};
