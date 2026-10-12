# TCN — The Cabin Nation

Primera versión de la web comercial de TCN, una marca argentina de experiencias para eventos en **prelanzamiento**. Incluye inicio, catálogo filtrable con cinco categorías y siete servicios, siete páginas de detalle, eventos sociales y corporativos, nosotros, contacto y 404. Sin backend, base de datos, analítica ni afirmaciones de equipamiento o disponibilidad confirmada.

## Ejecutar localmente

Requiere Node.js 22 y npm 10 (o versiones compatibles más nuevas).

```bash
npm install
npm run dev
```

Abrí la URL que informa Vite, normalmente `http://localhost:5173`.

```bash
npm run lint
npm run typecheck
npm run build
npm test
npm run preview
```

`npm test` requiere un build previo; verifica validación del formulario, generación de consultas, canales pendientes, catálogo, assets y archivos de rutas. Incluye renderizado de todas las páginas, filtros, preselección de servicio y 404.

## Stack y estructura

React 19, Vite, TypeScript estricto, React Router, Three.js, React Three Fiber 9 y Drei 10, GSAP/ScrollTrigger, Tailwind CSS 4, React Hook Form y Zod. Tipografías Orbitron y Montserrat servidas localmente mediante Fontsource. Lucide para iconos.

```text
src/
  animations/   Revelado y parallax con limpieza GSAP
  components/   Logo, botones, tarjetas, SEO, fallbacks, hero
  config/       Identidad, canales, cobertura y disponibilidad
  data/         Catálogo tipado y categorías derivadas
  hooks/        Preferencia de movimiento reducido
  layouts/      Navegación, menú móvil y footer
  pages/        Páginas y detalle parametrizado
  scenes/       Emblema 3D original en geometría extruida
  styles/       Tokens Tailwind y estilos responsive
  types/        Tipos del catálogo
  utils/        Validación, mensajes, canales y descarga
public/assets/  Ilustraciones conceptuales SVG y marca provisional
scripts/        Generación de assets y SEO por ruta
tests/          Contratos de formulario, catálogo, renderizado y build
```

## Datos comerciales pendientes

Copiá `.env.example` a `.env` y completá únicamente datos confirmados:

- `VITE_WHATSAPP`: número internacional de WhatsApp con código de país; para Argentina, confirmar el formato aplicable con el número real. No hay un número inventado por defecto.
- `VITE_EMAIL`: correo real de consultas.
- `VITE_INSTAGRAM`: URL completa de la cuenta real en Instagram.
- `VITE_SITE_URL`: dominio HTTPS final, sin barra al final. Usado para canonical, Open Graph, robots y sitemap.

También podés editar `src/config/business.ts`: marca, descriptor, cobertura, estado de prelanzamiento y disponibilidad por slug. El catálogo se edita en `src/data/services.ts`; cada servicio tiene categoría, descripción, beneficios, usos, personalización, imagen y galería. Los estados posibles están tipados; no cambiar a disponible sin confirmación comercial.

Las variables `VITE_` son públicas y se incorporan al build. No colocar secretos. Reconstruí luego de cambiarlas.

## Flujo de consultas

El formulario valida nombre, email, teléfono, tipo, localidad y al menos un servicio. Fecha y mensaje son opcionales; no acepta fechas pasadas. Al enviar **prepara** un mensaje revisable, sin enviar datos a un servidor. Si WhatsApp/email están configurados y tienen formato válido, aparecen botones para abrir el mensaje en esas aplicaciones. El usuario confirma el envío en la aplicación externa. Siempre se permite copiar o descargar un TXT.

Con canales pendientes, se explica la situación y se permite guardar la consulta. Para captar consultas de visitantes reales, configurar al menos un canal antes de publicar. No existe una reserva, almacenamiento de consultas ni confirmación de envío.

## Assets provisionales

Todos los visuales son **ilustraciones conceptuales originales**, identificadas en tarjetas, galerías y footer. No son fotos de equipos propios ni de eventos realizados. No hay testimonios, cifras o clientes inventados.

- `src/components/Logo.tsx`: versiones principal, horizontal, monocromática e isotipo. Emblema SVG provisional; reemplazar con identidad oficial.
- `src/scenes/EmblemScene.tsx`: monograma extruido y anillos 3D. Actualizar al confirmar el emblema oficial.
- `public/assets/<slug>.svg`: visual principal de cada servicio.
- `public/assets/<slug>-detail.svg`: segundo estudio conceptual de cada servicio.
- `src/data/services.ts`: reemplazar rutas de imágenes y galerías por assets oficiales, optimizados a WebP/AVIF y con textos alternativos revisados en los componentes.
- `public/assets/favicon.svg`: isotipo provisional.
- `public/assets/social.svg`: pieza Open Graph provisional. Reemplazar por un JPG/PNG de 1200×630 y actualizar `index.html`, `src/components/SEO.tsx` y `scripts/seo.mjs` para compatibilidad con plataformas que no aceptan SVG.
- `scripts/create-assets.mjs`: fuente de las ilustraciones. Ejecutarlo sobrescribe los SVG conceptuales; no ejecutarlo sobre assets oficiales que usen los mismos nombres.

No se necesita descargar fotos externas ni cargar fuentes desde terceros.

## Performance y accesibilidad

Páginas y escena 3D con lazy loading y Suspense, chunks separados para Three y GSAP, imágenes vectoriales pequeñas y lazy loading fuera del hero. Escena con DPR limitado a 1.5 y render detenido fuera de pantalla. Reduced motion desactiva GSAP, flotación y seguimiento del cursor; WebGL no disponible o error de escena muestra un emblema vectorial. Las animaciones GSAP se limpian al cambiar de ruta. Geometrías se liberan al desmontar. Navegación con teclado, enlace de salto, foco visible, menú móvil con Escape y foco contenido, formulario con errores asociados a sus campos.

## SEO

El build genera HTML con títulos, descripciones y Open Graph para las 13 rutas públicas, además de robots y sitemap. React actualiza los metadatos al navegar. No es un prerender completo: el contenido principal necesita JavaScript. Vercel sirve archivos estáticos de rutas existentes antes del fallback SPA. Confirmar dominio y una pieza OG rasterizada antes de indexar.

Sin `VITE_SITE_URL`, robots bloquea indexación y el sitemap queda vacío deliberadamente para no inventar un dominio. Con dominio configurado, un nuevo build habilita robots y genera las URLs absolutas.

## Vercel

1. Subí el repositorio al proveedor Git elegido.
2. Importalo en Vercel como proyecto Vite.
3. Install command: `npm ci`. Build command: `npm run build`. Output directory: `dist`.
4. Configurá las variables públicas confirmadas y Node.js 22.
5. Publicá solo con autorización del propietario.

`vercel.json` incluye fallback SPA y caché de assets. Los HTML por ruta permiten metadata específica en accesos directos. Para fotos con nombres estables, quitar caché inmutable o versionar el nombre al reemplazarlas. No se efectuó ningún despliegue.

## Revisión antes del lanzamiento

Confirmar contactos, dominio, disponibilidad, prestaciones, identidad y assets oficiales. Revisar el formulario con los canales reales. No se incorporan especificaciones, dimensiones, precios, entrega de contenidos ni características no confirmadas. Una revisión en dispositivos reales de baja potencia sigue siendo recomendable para dimensionar el rendimiento 3D.

## Validación realizada

Ver [VALIDATION.md](VALIDATION.md) para resultados y límites de la revisión en este entorno.

Referencias de integración: [React Three Fiber y versiones de React](https://r3f.docs.pmnd.rs/getting-started/installation), [Tailwind con Vite](https://tailwindcss.com/docs/installation/using-vite), [configuración y precedencia de rutas en Vercel](https://vercel.com/docs/project-configuration/vercel-json).
