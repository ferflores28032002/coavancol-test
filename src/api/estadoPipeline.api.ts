import { apiClient } from '../lib/axios';
import type { UpdateEstadoRequest, UpdateEstadoResponse } from '../types/asociado';
import { ENDPOINTS } from '../constants/config';

export const estadoPipelineApi = {
  async update(request: UpdateEstadoRequest): Promise<UpdateEstadoResponse> {
    const response = await apiClient.post<UpdateEstadoResponse>(
      ENDPOINTS.UPDATE_ESTADO_PIPELINE,
      request
    );
    return response.data;
  },
};
