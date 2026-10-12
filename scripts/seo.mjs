import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { loadEnv } from "vite";
const env = { ...loadEnv("production", process.cwd(), ""), ...process.env };
const base = (env.VITE_SITE_URL || "").replace(/\/$/, "");
if (base && !/^https?:\/\/[^\s]+$/.test(base))
  throw new Error("VITE_SITE_URL debe ser una URL absoluta válida.");
const routes = [
  [
    "/",
    "Experiencias que hacen únicos tus eventos",
    "Tecnología, entretenimiento y recuerdos para eventos sociales y corporativos en CABA y Gran Buenos Aires. TCN en prelanzamiento.",
  ],
  [
    "/experiencias",
    "Nuestras experiencias",
    "Explorá las siete propuestas TCN de fotografía, recuerdos, entretenimiento y activaciones para eventos. Catálogo en prelanzamiento.",
  ],
  [
    "/eventos-sociales",
    "Eventos sociales",
    "Propuestas TCN para casamientos, cumpleaños y celebraciones familiares. Proyecto en prelanzamiento.",
  ],
  [
    "/eventos-corporativos",
    "Eventos corporativos",
    "Tecnología y entretenimiento para activaciones de marca, lanzamientos, ferias y eventos empresariales. Proyecto en prelanzamiento.",
  ],
  [
    "/nosotros",
    "Nosotros",
    "Conocé la visión de The Cabin Nation, una nueva marca argentina de tecnología y entretenimiento para eventos.",
  ],
  [
    "/contacto",
    "Consultanos",
    "Contanos tu evento y prepará una consulta por las experiencias TCN. Disponibilidad a confirmar.",
  ],
  ...Object.entries({
    "totem-fotografico": "Tótem fotográfico",
    "espejo-magico": "Espejo mágico fotográfico",
    "plataforma-360": "Plataforma giratoria 360°",
    "telefono-mensajes": "Teléfono grabador de mensajes",
    "libro-firmas-digital": "Libro de firmas digital",
    "maquina-garra": "Máquina de premios tipo garra",
    "pantallas-eventos": "Pantallas para eventos y activaciones de marca",
  }).map(([slug, name]) => [
    `/experiencias/${slug}`,
    name,
    `${name}: conocé esta propuesta de TCN para tu evento. Proyecto en prelanzamiento, disponibilidad y prestaciones a confirmar.`,
  ]),
];
const escape = (value) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;");
const original = readFileSync("dist/index.html", "utf8");
for (const [route, title, description] of routes) {
  const url = base + route;
  let html = original
    .replace(
      /<title>.*?<\/title>/,
      `<title>${escape(title)} | TCN — The Cabin Nation</title>`,
    )
    .replace(
      /(<meta name="description" content=")[^"]*/,
      `$1${escape(description)}`,
    )
    .replace(
      /(<meta property="og:title" content=")[^"]*/,
      `$1${escape(title)} | TCN — The Cabin Nation`,
    )
    .replace(
      /(<meta property="og:description" content=")[^"]*/,
      `$1${escape(description)}`,
    );
  if (base)
    html = html
      .replace(
        "</head>",
        `<link rel="canonical" href="${escape(url)}"/><meta property="og:url" content="${escape(url)}"/></head>`,
      )
      .replace(
        'content="/assets/social.svg"',
        `content="${escape(base)}/assets/social.svg"`,
      );
  if (route === "/") writeFileSync("dist/index.html", html);
  else {
    const directory = `dist${route}`;
    mkdirSync(directory, { recursive: true });
    writeFileSync(`${directory}/index.html`, html);
  }
}
writeFileSync(
  "dist/robots.txt",
  base
    ? `User-agent: *\nAllow: /\nSitemap: ${base}/sitemap.xml\n`
    : "User-agent: *\nDisallow: /\n# Configurar VITE_SITE_URL y reconstruir antes del lanzamiento.\n",
);
writeFileSync(
  "dist/sitemap.xml",
  `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${base ? routes.map(([route]) => `<url><loc>${escape(base + route)}</loc></url>`).join("") : ""}</urlset>`,
);
if (!base)
  process.stdout.write(
    "SEO: dominio pendiente. Robots bloquea indexación; configurar VITE_SITE_URL para generar sitemap final.\n",
  );
