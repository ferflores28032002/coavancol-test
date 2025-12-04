import type { Asociado } from '../types/asociado';
import { API_CONFIG } from '../constants/config';

export const asociadosApi = {
  async getAll(): Promise<Asociado[]> {
    const response = await fetch(API_CONFIG.GITHUB_DATA_URL);

    if (!response.ok) {
      throw new Error('Error al cargar los asociados');
    }

    const data = await response.json();
    return data;
  },
};
