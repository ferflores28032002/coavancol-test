import { useTranslation } from 'react-i18next';
import type { Asociado } from '../types/asociado';
import { ESTADO_COLORS } from '../types/asociado';
import { EditIcon, CheckCircleIcon, XCircleIcon } from './icons/Icons';
import { LOCALE_CONFIG } from '../constants/config';

interface AsociadoCardProps {
  asociado: Asociado;
  onEdit: (asociado: Asociado) => void;
}

export const AsociadoCard = ({ asociado, onEdit }: AsociadoCardProps) => {
  const { t } = useTranslation();

  return (
    <div className="card p-6 group">
      <div className="flex items-start justify-between mb-5">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
              {asociado.Nombre?.charAt(0) || '?'}
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                {asociado.Nombre}
              </h3>
              <p className="text-xs text-gray-500 font-mono bg-gray-100 px-2 py-0.5 rounded inline-block">
                {asociado.Identificación}
              </p>
            </div>
          </div>
        </div>
        
        <button
          onClick={() => onEdit(asociado)}
          className="p-2.5 rounded-xl bg-gradient-to-br from-blue-50 to-purple-50 text-blue-600 
                     hover:from-blue-100 hover:to-purple-100 transition-all duration-200 
                     transform hover:scale-110 active:scale-95"
          aria-label={t('labels.editAsociado')}
        >
          <EditIcon />
        </button>
      </div>

      <div className="space-y-4">
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-gray-600">{t('labels.state')}</span>
          </div>
          <span className={`badge ${ESTADO_COLORS[asociado.estado_pipeline]}`}>
            {t(`estados.${asociado.estado_pipeline}`)}
          </span>
        </div>

        {asociado.aporte_49900_pagado !== undefined && (
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-gray-600">{t('labels.paymentStatus')}</span>
              {asociado.aporte_49900_pagado ? (
                <div className="flex items-center gap-2 text-green-600 font-bold bg-green-50 px-3 py-1.5 rounded-lg">
                  <CheckCircleIcon />
                  <span className="text-sm">{t('labels.paid')}</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-red-600 font-bold bg-red-50 px-3 py-1.5 rounded-lg">
                  <XCircleIcon />
                  <span className="text-sm">{t('labels.pending')}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {asociado.ultima_actualizacion && (
          <div className="text-xs text-gray-400 pt-3 border-t border-gray-200 flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {t('labels.lastUpdate')} {new Date(asociado.ultima_actualizacion).toLocaleString(LOCALE_CONFIG.DATE_LOCALE)}
          </div>
        )}
      </div>
    </div>
  );
};
