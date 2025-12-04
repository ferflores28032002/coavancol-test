export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  TIMEOUT: 10000,
  GITHUB_DATA_URL: 'https://raw.githubusercontent.com/managerrojo/COAVANCOL-Prueba-T-cnica-/refs/heads/main/IndexAsociados',
};

export const ENDPOINTS = {
  UPDATE_ESTADO_PIPELINE: '/updateEstadoPipeline',
};

export const QUERY_KEYS = {
  ASOCIADOS: 'asociados',
};

export const STALE_TIME = {
  ASOCIADOS: 5 * 60 * 1000,
};

export const LOCALE_CONFIG = {
  DEFAULT_LANGUAGE: 'es',
  SUPPORTED_LANGUAGES: ['es', 'en'] as const,
  DATE_LOCALE: 'es-CO',
};
