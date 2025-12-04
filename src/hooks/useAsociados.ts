import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { asociadosService } from '../services/asociadosService';
import { useAsociadosStore } from '../store/asociadosStore';
import type { UpdateEstadoRequest } from '../types/asociado';
import { QUERY_KEYS, STALE_TIME } from '../constants/config';

export const useAsociados = () => {
  const queryClient = useQueryClient();
  const { setAsociados, updateAsociado } = useAsociadosStore();

  const { data, isLoading, error } = useQuery({
    queryKey: [QUERY_KEYS.ASOCIADOS],
    queryFn: async () => {
      const data = await asociadosService.fetchAsociados();
      setAsociados(data);
      return data;
    },
    staleTime: STALE_TIME.ASOCIADOS,
    refetchOnWindowFocus: false,
  });

  const updateEstadoMutation = useMutation({
    mutationFn: (request: UpdateEstadoRequest) =>
      asociadosService.updateEstadoPipeline(request),
    onSuccess: (response, variables) => {
      if (response.success && response.asociado) {
        updateAsociado(variables.asociadoId, {
          estado_pipeline: variables.nuevoEstado,
          ultima_actualizacion: new Date().toISOString(),
        });
        queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.ASOCIADOS] });
      }
    },
  });

  return {
    asociados: data || [],
    isLoading,
    error: error?.message || null,
    updateEstado: updateEstadoMutation.mutate,
    isUpdating: updateEstadoMutation.isPending,
  };
};
