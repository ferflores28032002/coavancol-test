# Notas del Proceso de Desarrollo

## Decisiones Técnicas

### Arquitectura Frontend

Decidí usar una arquitectura en capas para mantener el código organizado y escalable:

- **API Layer**: Funciones que hacen las peticiones HTTP
- **Services Layer**: Lógica de negocio y transformación de datos
- **Hooks Layer**: Custom hooks que combinan servicios con React Query
- **Store Layer**: Zustand para estado de UI (filtros, modales)
- **Components Layer**: Componentes reutilizables
- **Pages Layer**: Páginas que componen todo

Esta separación hace que sea fácil testear cada parte y cambiar implementaciones sin afectar otras capas.

### Estado Global vs Local

Usé **Zustand** solo para estado de UI (filtros, modal abierto/cerrado) y **React Query** para todo lo relacionado con datos del servidor. Esto evita duplicar estado y aprovecha las capacidades de cache de React Query.

### Internacionalización

Implementé i18next con:
- Persistencia en localStorage para mantener el idioma seleccionado
- Traducciones dinámicas de estados del pipeline
- Detección automática del idioma del navegador como fallback

### Validaciones

Implementé validaciones tanto en frontend como backend:
- **Frontend**: Feedback inmediato al usuario antes de hacer la petición
- **Backend**: Seguridad y consistencia de datos

### Backend No Conectado

El backend está completamente implementado con todas las funcionalidades requeridas. Por limitaciones de tiempo, el frontend consume directamente el JSON público de GitHub. 

La infraestructura para conectar el backend ya está lista:
- Axios configurado con interceptores
- Servicios separados por dominio
- Tipos compartidos entre frontend y backend
- Solo faltaría cambiar la URL en el hook useAsociados

## Desafíos y Soluciones

### Tailwind CSS v4 vs v3

**Problema**: Inicialmente instalé Tailwind v4 que tiene una sintaxis completamente diferente con `@theme` y `@import`.

**Solución**: Cambié a Tailwind v3.4.17 que es más estable y compatible con la mayoría de proyectos. Esto resolvió todos los problemas de estilos que no se aplicaban.

### Toast Notifications

**Problema**: El toast se movía de derecha a centro al renderizarse por usar `translate-x-1/2`.

**Solución**: Cambié a usar flexbox con `justify-center` para que esté centrado desde el inicio.

### Ordenamiento con Datos Faltantes

**Problema**: El `localeCompare` fallaba cuando algunos asociados no tenían la propiedad `nombre`.

**Solución**: Agregué validación con optional chaining y fallback a string vacío:
```typescript
const nombreA = a?.nombre || '';
const nombreB = b?.nombre || '';
```

### Sombras Excesivas

**Problema**: El diseño inicial tenía demasiadas sombras que hacían ver la app pesada.

**Solución**: Reduje las sombras a lo mínimo necesario para dar profundidad, manteniendo un diseño más limpio y minimalista.

## Mejoras Futuras

Si tuviera más tiempo, implementaría:

1. **Conectar el Backend**: Cambiar el hook para usar el backend local en lugar del JSON público
2. **Testing**: Agregar tests unitarios con Vitest y tests de componentes con Testing Library
3. **Optimistic Updates**: Actualizar la UI inmediatamente antes de la respuesta del servidor
4. **Paginación**: Para manejar grandes cantidades de asociados
5. **Búsqueda**: Filtro por nombre o identificación
6. **Historial de Cambios**: Ver quién cambió qué y cuándo
7. **Autenticación**: Sistema de login para diferentes roles
8. **Base de Datos Real**: MongoDB o PostgreSQL en lugar de repositorio en memoria
9. **Deploy**: Subir a Vercel (frontend) y Railway/Render (backend)
10. **Logs**: Sistema de logging para debugging en producción

## Aprendizajes

- React Query simplifica mucho el manejo de datos del servidor
- Zustand es perfecto para estado de UI simple
- La separación en capas hace el código más mantenible
- Las validaciones dobles (frontend + backend) mejoran la UX y seguridad
- Un diseño minimalista con menos sombras se ve más profesional
- i18next hace que agregar idiomas sea muy fácil
- TypeScript ayuda a evitar muchos errores en tiempo de desarrollo

## Tiempo Invertido

- Configuración inicial y arquitectura: 30 min
- Componentes y UI: 1 hora
- Backend y validaciones: 45 min
- Internacionalización: 30 min
- Refinamiento de diseño: 45 min
- Documentación: 30 min

**Total aproximado**: 4 horas
