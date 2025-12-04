import { useTranslation } from 'react-i18next';
import { ESTADOS_PIPELINE } from '../types/asociado';
import { useAsociadosStore } from '../store/asociadosStore';
import { FilterIcon } from './icons/Icons';

export const FilterBar = () => {
  const { t } = useTranslation();
  const { filtroEstado, setFiltroEstado } = useAsociadosStore();

  return (
    <div className="glass-effect rounded-2xl p-6 mb-8 animate-slide-down">
      <div className="flex items-center gap-3 mb-5">
        <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg text-white">
          <FilterIcon />
        </div>
        <h2 className="text-lg font-bold text-gray-800">
          {t('labels.filterByState')}
        </h2>
      </div>
      
      <div className="flex flex-wrap gap-2.5">
        {ESTADOS_PIPELINE.map((estado, index) => (
          <button
            key={estado}
            onClick={() => setFiltroEstado(estado)}
            style={{ animationDelay: `${index * 50}ms` }}
            className={`
              px-5 py-2.5 rounded-lg font-semibold text-sm transition-all duration-300
              transform hover:scale-105 active:scale-95
              animate-scale-in
              ${
                filtroEstado === estado
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-200 hover:border-blue-300'
              }
            `}
          >
            {t(`estados.${estado}`)}
          </button>
        ))}
      </div>
    </div>
  );
};
