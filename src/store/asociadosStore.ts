import { create } from 'zustand';
import type { Asociado, EstadoPipeline } from '../types/asociado';

interface AsociadosState {
  asociados: Asociado[];
  filtroEstado: EstadoPipeline;
  setAsociados: (asociados: Asociado[]) => void;
  setFiltroEstado: (estado: EstadoPipeline) => void;
  updateAsociado: (id: string, updates: Partial<Asociado>) => void;
}

export const useAsociadosStore = create<AsociadosState>((set) => ({
  asociados: [],
  filtroEstado: 'Todos',
  
  setAsociados: (asociados) => set({ asociados }),
  
  setFiltroEstado: (estado) => set({ filtroEstado: estado }),
  
  updateAsociado: (id, updates) =>
    set((state) => ({
      asociados: state.asociados.map((a) =>
        a.id === id ? { ...a, ...updates } : a
      ),
    })),
}));
