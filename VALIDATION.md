# Validación de la primera versión

Fecha: 12 de octubre de 2026. Entorno: Node.js 22.2.0 / npm 10.7.0, Linux con sandbox restrictivo.

## Ejecutado

- `npm install --cache /tmp/tcn-npm-cache`: instalación completada; lockfile generado. Auditoría de instalación final: cero vulnerabilidades reportadas.
- `npm run lint`: sin errores ni advertencias.
- `npm run typecheck`: TypeScript estricto sin errores.
- `npm run build`: producción compilada, páginas divididas en chunks y metadata HTML para las trece rutas públicas; sitemap y robots generados.
- `npm test`: dos suites aprobadas, con 21 casos internos entre contratos y renderizado React.
- `node tests/contracts.test.mjs`: validación del formulario, mensajes, canales configurables, siete servicios con sus assets y archivos de rutas.
- `node tests/render.test.mjs`: las trece páginas renderizan con un H1; detalles enlazan al formulario correcto; filtro de recuerdos emocionales devuelve dos servicios; formulario refleja preselección; slug desconocido muestra 404.
- Inspección de imports del build: Three.js y React Three Fiber quedan fuera de las dependencias estáticas del entrypoint. Se cargan al solicitar la escena.

## Advertencias del build

Three.js genera un chunk de aproximadamente 704 KB sin comprimir (181 KB gzip). Se carga de forma diferida junto con el renderer; no se silenció la advertencia de tamaño. Revisar en dispositivos reales antes de lanzar. Rollup elimina dos anotaciones de comentarios de Zod que no reconoce; no son errores de TypeScript ni de compilación.

## Límites de verificación

Se intentó `npm run dev`, pero el sandbox impide escuchar en el puerto 5173 (`listen EPERM`). Se intentó iniciar Chrome headless con Playwright temporalmente instalado fuera del proyecto; Chrome fue bloqueado por el sandbox (`setsockopt: operación no permitida`). No se publicaron sitios ni se solicitaron cambios de permisos.

Por esa razón **no se realizó revisión visual en navegador**, ni interacción real de teclado, menú, formulario, descarga, clipboard, responsive o WebGL. Las pruebas de renderizado y lógica cubren rutas, contenido y preparación de consultas, pero no sustituyen esas pruebas de navegador.

## Revisión local pendiente

1. Ejecutar `npm run dev` fuera del sandbox y abrir la URL indicada por Vite.
2. Revisar inicio y escena 3D en desktop, tablet y mobile; confirmar ausencia de scroll horizontal y errores de consola.
3. Probar menú móvil, Escape, Tab y navegación a todas las páginas.
4. Consultar desde un detalle y comprobar servicio preseleccionado; probar errores y mensaje válido.
5. Probar copia y descarga; luego configurar contactos reales y verificar WhatsApp/email.
6. Activar movimiento reducido y revisar fallback en un navegador sin WebGL.
7. Completar dominio y generar un nuevo build; revisar canonical, sitemap, robots y metadatos al desplegar con autorización.

Los contactos, el dominio y los assets comerciales definitivos siguen pendientes. Sin dominio configurado, robots bloquea la indexación y el sitemap no inventa URLs.
