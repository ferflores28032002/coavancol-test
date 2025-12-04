import { Asociado, EstadoPipeline } from './types.js';

const asociadosDB: Map<string, Asociado> = new Map();

export const asociadosRepository = {
  findById(id: string): Asociado | undefined {
    return asociadosDB.get(id);
  },

  update(id: string, updates: Partial<Asociado>): Asociado | undefined {
    const asociado = asociadosDB.get(id);
    if (!asociado) return undefined;

    const updated = { ...asociado, ...updates };
    asociadosDB.set(id, updated);
    return updated;
  },

  seed(asociados: Asociado[]): void {
    asociados.forEach((asociado) => {
      asociadosDB.set(asociado.id, asociado);
    });
  },
};
