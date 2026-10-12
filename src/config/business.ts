import type { Availability } from "../types/service";
const availability: Record<string, Availability> = {
  "totem-fotografico": "prelanzamiento",
  "espejo-magico": "prelanzamiento",
  "plataforma-360": "prelanzamiento",
  "telefono-mensajes": "prelanzamiento",
  "libro-firmas-digital": "prelanzamiento",
  "maquina-garra": "prelanzamiento",
  "pantallas-eventos": "prelanzamiento",
};
export const business = {
  name: "TCN",
  fullName: "The Cabin Nation",
  descriptor: "Tecnología. Entretenimiento. Experiencias.",
  whatsapp: (import.meta.env.VITE_WHATSAPP ?? "").replace(/\D/g, ""),
  email: import.meta.env.VITE_EMAIL ?? "",
  instagram: import.meta.env.VITE_INSTAGRAM ?? "",
  siteUrl: (import.meta.env.VITE_SITE_URL ?? "").replace(/\/$/, ""),
  coverage: "CABA y Gran Buenos Aires",
  prelaunch: true,
  availability,
};
export const availabilityLabels: Record<Availability, string> = {
  prelanzamiento: "En prelanzamiento",
  consultar: "Consultar disponibilidad",
  disponible: "Disponible para consultas",
  "no-disponible": "No disponible por el momento",
};
