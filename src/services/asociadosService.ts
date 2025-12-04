import { asociadosApi } from '../api/asociados.api';
import { estadoPipelineApi } from '../api/estadoPipeline.api';
import type { Asociado, UpdateEstadoRequest, UpdateEstadoResponse } from '../types/asociado';

export const asociadosService = {
  async fetchAsociados(): Promise<Asociado[]> {
    return asociadosApi.getAll();
  },

  async updateEstadoPipeline(request: UpdateEstadoRequest): Promise<UpdateEstadoResponse> {
    return estadoPipelineApi.update(request);
  },
};
