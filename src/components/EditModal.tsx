import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { Asociado, EstadoPipeline } from '../types/asociado';
import { ESTADOS_PIPELINE, ESTADO_COLORS } from '../types/asociado';
import { CloseIcon, SaveIcon, LoadingIcon } from './icons/Icons';
import { validarTransicion, validarAportePagado } from '../utils/validations';
import { Toast } from './Toast';

interface EditModalProps {
  asociado: Asociado;
  onClose: () => void;
  onSave: (asociadoId: string, nuevoEstado: EstadoPipeline) => void;
  isUpdating: boolean;
}

export const EditModal = ({ asociado, onClose, onSave, isUpdating }: EditModalProps) => {
  const { t } = useTranslation();
  const [nuevoEstado, setNuevoEstado] = useState<EstadoPipeline>(asociado.estado_pipeline);
  const [error, setError] = useState<string | null>(null);

  const handleSave = () => {
    setError(null);

    const validacionTransicion = validarTransicion(asociado.estado_pipeline, nuevoEstado);
    if (!validacionTransicion.valido) {
      setError(validacionTransicion.mensaje || '');
      return;
    }

    if (asociado.aporte_49900_pagado !== undefined) {
      const validacionAporte = validarAportePagado(nuevoEstado, asociado.aporte_49900_pagado);
      if (!validacionAporte.valido) {
        setError(validacionAporte.mensaje || '');
        return;
      }
    }

    onSave(asociado.id, nuevoEstado);
  };

  const estadosDisponibles = ESTADOS_PIPELINE.filter((e) => e !== 'Todos');

  return (
    <>
      {error && <Toast message={error} type="error" onClose={() => setError(null)} />}
      
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-6 animate-fade-in">
        <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto animate-scale-in">
          <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-t-2xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold">{t('labels.selectNewState')}</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg transition-all duration-200 transform hover:scale-110 active:scale-95"
              disabled={isUpdating}
            >
              <CloseIcon />
            </button>
          </div>

          <div className="p-6 space-y-6">
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-5 border border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl">
                  {asociado.Nombre?.charAt(0) || '?'}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{asociado.Nombre}</h3>
                  <p className="text-xs text-gray-600 font-mono bg-white px-2 py-0.5 rounded inline-block mt-0.5">
                    ID: {asociado.Identificación}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wide">
                  {t('labels.currentState')}
                </label>
                <div className={`badge ${ESTADO_COLORS[asociado.estado_pipeline]} text-sm px-5 py-2`}>
                  {t(`estados.${asociado.estado_pipeline}`)}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-3 uppercase tracking-wide">
                  {t('labels.newState')}
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {estadosDisponibles.map((estado, index) => (
                    <button
                      key={estado}
                      onClick={() => setNuevoEstado(estado)}
                      disabled={isUpdating}
                      style={{ animationDelay: `${index * 30}ms` }}
                      className={`
                        p-4 rounded-xl font-semibold text-sm transition-all duration-300
                        transform hover:scale-105 active:scale-95 text-left
                        animate-scale-in
                        ${
                          nuevoEstado === estado
                            ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                            : 'bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-200 hover:border-blue-300'
                        }
                        disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
                      `}
                    >
                      {t(`estados.${estado}`)}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="sticky bottom-0 bg-gray-50 p-6 rounded-b-2xl flex gap-3 border-t border-gray-200">
            <button
              onClick={onClose}
              disabled={isUpdating}
              className="btn-secondary flex-1"
            >
              {t('labels.cancel')}
            </button>
            <button
              onClick={handleSave}
              disabled={isUpdating || nuevoEstado === asociado.estado_pipeline}
              className="btn-primary flex-1 flex items-center justify-center gap-2"
            >
              {isUpdating ? (
                <>
                  <LoadingIcon />
                  {t('labels.loading')}
                </>
              ) : (
                <>
                  <SaveIcon />
                  {t('labels.save')}
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
