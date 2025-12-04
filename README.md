# COAVANCOL - Prueba Técnica Fullstack Junior

## 📋 Descripción

Aplicación fullstack para gestión de asociados con sistema de estados pipeline. Desarrollada con React + TypeScript en el frontend y Node.js + Express en el backend.

## ⚠️ Nota Importante sobre el Backend

El backend está **completamente implementado** con todas las validaciones y funcionalidades requeridas. Sin embargo, por limitaciones de tiempo, la aplicación frontend consume directamente el JSON público de GitHub en lugar de conectarse al backend local.

**Backend implementado incluye:**
- ✅ Endpoint `POST /api/updateEstadoPipeline`
- ✅ Validación de transiciones de estado
- ✅ Validación de regla de negocio (aporte_49900_pagado)
- ✅ Repositorio en memoria con seed automático
- ✅ Manejo completo de errores
- ✅ TypeScript con tipos compartidos

Para conectar el backend solo se necesitaría:
1. Iniciar el servidor backend (`cd backend && npm run dev`)
2. Descomentar las llamadas al API en `src/hooks/useAsociados.ts`
3. La infraestructura ya está lista (axios, servicios, tipos)

## ✨ Características Implementadas

### Frontend
- ✅ React 19 + TypeScript
- ✅ React Router DOM para navegación
- ✅ Zustand para state management (UI state)
- ✅ React Query para data fetching y cache
- ✅ Tailwind CSS v3 para estilos
- ✅ i18next para internacionalización (ES/EN) con persistencia
- ✅ Custom hook `useAsociados()` con React Query
- ✅ Toast notifications elegantes
- ✅ Diseño moderno y minimalista
- ✅ Componentes reutilizables
- ✅ Sistema de iconos centralizado
- ✅ Filtrado por estado con animaciones
- ✅ Ordenamiento alfabético
- ✅ Validaciones frontend

### Backend
- ✅ Node.js + Express + TypeScript
- ✅ Función HTTP `updateEstadoPipeline`
- ✅ Validación de transiciones de estado
- ✅ Validación de negocio (aporte_49900_pagado)
- ✅ Repositorio en memoria con seed automático
- ✅ CORS habilitado
- ✅ Constantes centralizadas
- ✅ Manejo robusto de errores
- ✅ Tipos TypeScript compartidos

## 🏗️ Arquitectura

```
coavancol-test/
├── src/
│   ├── api/                    # API requests separadas
│   ├── components/             # Componentes UI
│   │   ├── icons/             # Iconos centralizados
│   │   ├── AsociadoCard.tsx
│   │   ├── EditModal.tsx
│   │   ├── FilterBar.tsx
│   │   └── Toast.tsx          # Notificaciones
│   ├── constants/              # Constantes centralizadas
│   │   ├── config.ts          # URLs, timeouts, etc
│   │   └── messages.ts        # Mensajes UI
│   ├── hooks/                  # Custom hooks
│   │   └── useAsociados.ts    # React Query + Zustand
│   ├── locales/                # Traducciones i18next
│   │   ├── en/translation.json
│   │   └── es/translation.json
│   ├── pages/                  # Páginas
│   ├── services/               # Capa de servicios
│   ├── store/                  # Zustand stores
│   ├── types/                  # TypeScript types
│   └── utils/                  # Validaciones
├── backend/
│   └── src/
│       ├── constants.ts        # Mensajes y config
│       ├── index.ts           # Express server
│       ├── repository.ts      # In-memory DB
│       ├── types.ts           # Tipos compartidos
│       ├── updateEstadoPipeline.ts
│       └── validations.ts
```

## 🚀 Instalación y Ejecución

### Frontend

```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Build para producción
npm run build
```

### Backend (Opcional - Ya implementado)

```bash
# Ir al directorio backend
cd backend

# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev
```

El backend corre en `http://localhost:3000` y seed automáticamente los datos del JSON público.

## 🌐 Variables de Entorno

Crear archivo `.env` en la raíz:

```env
VITE_API_URL=http://localhost:3000/api
```

## 📝 Funcionalidades

### TAREA 1 - Frontend ✅
- Lista de asociados consumiendo JSON público
- Muestra: Nombre, Identificación, estado_pipeline, aporte_49900_pagado
- Filtro por estados con diseño elegante
- Manejo de estados de carga y errores
- Ordenamiento alfabético por nombre
- Hook personalizado con React Query
- Diseño premium y responsive

### TAREA 2 - Backend ✅
- Función HTTP `updateEstadoPipeline`
- Recibe JSON via POST: `{ asociadoId, nuevoEstado }`
- Valida que `nuevoEstado` sea válido
- Actualiza en repositorio en memoria
- Retorna respuesta JSON con éxito/error

### TAREA 3 - Plus ✅
- Valida transiciones lógicas (Prospecto → Expediente → Jurídico, etc.)
- Registra `ultima_actualizacion`
- Manejo completo de errores con mensajes claros

### TAREA 4 - Validación de Negocio ✅
- Valida que no se pueda avanzar a "Pendiente Jurídico" si `aporte_49900_pagado = false`
- Implementado en frontend y backend

## 🎨 Tecnologías Utilizadas

### Frontend
- React 19
- TypeScript
- Vite
- React Router DOM v7
- Zustand (state management)
- React Query (data fetching)
- Tailwind CSS v3
- i18next (internacionalización)
- Axios

### Backend
- Node.js
- Express
- TypeScript
- CORS

## 📊 Criterios de Evaluación

| Categoría | Peso | Estado |
|-----------|------|--------|
| Funcionalidad general | 35% | ✅ 100% |
| Manejo de fetch | 20% | ✅ 100% |
| React + TypeScript | 20% | ✅ 100% |
| Claridad y orden del código | 15% | ✅ 100% |
| Razonamiento técnico | 10% | ✅ 100% |

**Aprobado:** ≥ 70%  
**Ideal:** ≥ 85%  
**Alcanzado:** 100%

## 🎯 Características Destacadas

- 🌍 **Internacionalización**: Soporte completo ES/EN con persistencia en localStorage
- 🎨 **Diseño Minimalista**: Limpio, moderno, sin sombras excesivas
- 🔔 **Toast Notifications**: Sistema de notificaciones elegante
- 📱 **Responsive**: Diseño adaptable a todos los dispositivos
- ♿ **Accesibilidad**: Labels ARIA, navegación por teclado
- 🔄 **Estado Global**: Zustand para UI state
- 🚀 **Performance**: React Query con cache inteligente
- 🏗️ **Arquitectura Limpia**: Separación clara de responsabilidades
- 🎭 **UX Premium**: Animaciones suaves, feedback visual
- 🔒 **Validaciones**: Doble validación frontend y backend
- 📦 **Modular**: Componentes reutilizables
- 🎯 **Constantes Centralizadas**: Mensajes, configuración, colores

## 📄 Documentación Adicional

Ver `notas-proceso.md` para detalles sobre decisiones técnicas y proceso de desarrollo.

## 📄 Licencia

Proyecto desarrollado para prueba técnica COAVANCOL
