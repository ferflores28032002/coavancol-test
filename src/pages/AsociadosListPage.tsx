import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAsociados } from '../hooks/useAsociados';
import { useAsociadosStore } from '../store/asociadosStore';
import type { Asociado } from '../types/asociado';
import { FilterBar } from '../components/FilterBar';
import { AsociadoCard } from '../components/AsociadoCard';
import { EditModal } from '../components/EditModal';
import { LoadingIcon, UsersIcon } from '../components/icons/Icons';

export const AsociadosListPage = () => {
  const { t, i18n } = useTranslation();
  const { asociados, isLoading, error, updateEstado, isUpdating } = useAsociados();
  const { filtroEstado } = useAsociadosStore();
  const [selectedAsociado, setSelectedAsociado] = useState<Asociado | null>(null);

  const asociadosFiltrados =
    filtroEstado === 'Todos'
      ? asociados
      : asociados.filter((a) => a.estado_pipeline === filtroEstado);

  const sortedAsociados = [...asociadosFiltrados].sort((a, b) => {
    const nombreA = a?.Nombre || '';
    const nombreB = b?.Nombre || '';
    return nombreA.localeCompare(nombreB);
  });

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'es' ? 'en' : 'es');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="text-center">
          <div className="inline-flex p-4 bg-white/10 rounded-2xl backdrop-blur-sm mb-4">
            <LoadingIcon />
          </div>
          <p className="mt-4 text-white text-xl font-semibold">{t('labels.loading')}</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-md w-full text-center animate-scale-in">
          <div className="text-red-500 mb-6">
            <svg className="w-20 h-20 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Error</h2>
          <p className="text-gray-600 text-lg">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12 text-center animate-slide-down relative">
          <button
            onClick={toggleLanguage}
            className="absolute top-0 right-0 px-6 py-3 bg-white/20 backdrop-blur-md rounded-xl
                     text-white font-bold hover:bg-white/30 transition-all duration-300
                     transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl
                     border border-white/30"
          >
            {i18n.language === 'es' ? '🇬🇧 EN' : '🇪🇸 ES'}
          </button>

          <div className="inline-flex items-center justify-center gap-4 mb-6">
            <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-md shadow-xl border border-white/30">
              <UsersIcon />
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-white drop-shadow-2xl">
              {t('labels.asociadosList')}
            </h1>
          </div>
          <p className="text-white/95 text-xl font-medium tracking-wide">
            {t('labels.systemTitle')}
          </p>
          
          <div className="mt-8 inline-flex items-center gap-3 bg-white/10 backdrop-blur-md px-6 py-3 rounded-full border border-white/20">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-white font-semibold">
              {sortedAsociados.length} {sortedAsociados.length === 1 ? 'Asociado' : 'Asociados'}
            </span>
          </div>
        </header>

        <FilterBar />

        {sortedAsociados.length === 0 ? (
          <div className="glass-effect rounded-3xl p-16 text-center animate-scale-in">
            <div className="text-gray-400 mb-4">
              <svg className="w-24 h-24 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
            </div>
            <p className="text-gray-600 text-xl font-semibold">{t('labels.noAsociados')}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedAsociados.map((asociado, index) => (
              <div
                key={asociado.id}
                style={{ animationDelay: `${index * 50}ms` }}
                className="animate-slide-up"
              >
                <AsociadoCard
                  asociado={asociado}
                  onEdit={setSelectedAsociado}
                />
              </div>
            ))}
          </div>
        )}

        {selectedAsociado && (
          <EditModal
            asociado={selectedAsociado}
            onClose={() => setSelectedAsociado(null)}
            onSave={(id, nuevoEstado) => {
              updateEstado({ asociadoId: id, nuevoEstado });
              setSelectedAsociado(null);
            }}
            isUpdating={isUpdating}
          />
        )}
      </div>
    </div>
  );
};
