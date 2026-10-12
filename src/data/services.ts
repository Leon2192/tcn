import { business } from "../config/business";
import type { Service, Category } from "../types/service";
const entries = [
  {
    id: "01",
    name: "Tótem fotográfico",
    slug: "totem-fotografico",
    category: "Fotografía y recuerdos",
    tagline: "Un instante. Un recuerdo para siempre.",
    description:
      "Un punto de encuentro para posar, divertirse y crear recuerdos fotográficos. Una propuesta para sumar interacción y una identidad visual propia a tu celebración.",
    benefits: [
      "Una experiencia para compartir entre invitados",
      "Recuerdos con la identidad de tu evento",
      "Un espacio que invita a participar",
    ],
    uses: ["Casamientos", "Cumpleaños de 15", "Celebraciones empresariales"],
    customization: [
      "Identidad gráfica del evento",
      "Propuesta de fondo y ambientación",
      "Diseño de la experiencia a coordinar",
    ],
  },
  {
    id: "02",
    name: "Espejo mágico fotográfico",
    slug: "espejo-magico",
    category: "Fotografía y recuerdos",
    tagline: "El reflejo de una noche increíble.",
    description:
      "Una experiencia fotográfica con presencia escénica. El concepto de espejo invita a los invitados a interactuar y convertir su paso por el evento en un recuerdo.",
    benefits: [
      "Un punto visual protagonista",
      "Participación espontánea y compartida",
      "Una propuesta adaptable a la celebración",
    ],
    uses: ["Casamientos", "Fiestas privadas", "Cumpleaños de adultos"],
    customization: [
      "Ambientación visual",
      "Gráfica del evento",
      "Estilo de la propuesta fotográfica",
    ],
  },
  {
    id: "03",
    name: "Plataforma giratoria 360°",
    slug: "plataforma-360",
    category: "Experiencias audiovisuales",
    tagline: "Todos los ángulos. Toda la energía.",
    description:
      "Una propuesta audiovisual que pone a tus invitados en el centro de la escena. Movimiento, expresión y una mirada diferente para recordar la energía de tu evento.",
    benefits: [
      "Un momento que invita a ser protagonista",
      "Contenido audiovisual con personalidad",
      "Interacción para grupos de invitados",
    ],
    uses: ["Cumpleaños de 15", "Lanzamientos", "Celebraciones empresariales"],
    customization: [
      "Identidad visual del contenido",
      "Concepto y ambientación",
      "Propuesta creativa a coordinar",
    ],
  },
  {
    id: "04",
    name: "Teléfono grabador de mensajes",
    slug: "telefono-mensajes",
    category: "Recuerdos emocionales",
    tagline: "Hay recuerdos que se escuchan.",
    description:
      "Un concepto de libro de visitas en voz: palabras, anécdotas y buenos deseos de las personas que forman parte de tu evento. Un recuerdo personal para volver a escuchar.",
    benefits: [
      "Mensajes con la voz de tus invitados",
      "Un espacio para expresarse sin apuro",
      "Recuerdos cargados de emoción",
    ],
    uses: ["Casamientos", "Celebraciones familiares", "Cumpleaños de adultos"],
    customization: [
      "Mensaje de bienvenida",
      "Ambientación del rincón",
      "Presentación del recuerdo a coordinar",
    ],
  },
  {
    id: "05",
    name: "Libro de firmas digital",
    slug: "libro-firmas-digital",
    category: "Recuerdos emocionales",
    tagline: "Una historia escrita entre todos.",
    description:
      "Una forma contemporánea de reunir dedicatorias y mensajes de tus invitados. Una propuesta digital para crear un recuerdo colectivo con la identidad de tu celebración.",
    benefits: [
      "Dedicatorias reunidas en una experiencia",
      "Participación personal de los invitados",
      "Un recuerdo con identidad propia",
    ],
    uses: [
      "Casamientos",
      "Eventos institucionales",
      "Celebraciones familiares",
    ],
    customization: [
      "Diseño de bienvenida",
      "Identidad gráfica",
      "Formato de presentación a confirmar",
    ],
  },
  {
    id: "06",
    name: "Máquina de premios tipo garra",
    slug: "maquina-garra",
    category: "Gaming y entretenimiento",
    tagline: "El desafío que nadie quiere perderse.",
    description:
      "Un clásico del entretenimiento convertido en punto de interacción para tu evento. Una propuesta lúdica para invitar a participar y generar momentos de diversión.",
    benefits: [
      "Un desafío simple y reconocible",
      "Interacción entre participantes",
      "Una oportunidad creativa para tu marca",
    ],
    uses: ["Activaciones de marca", "Ferias", "Fiestas privadas"],
    customization: [
      "Gráfica de la activación",
      "Concepto de premios a coordinar",
      "Dinámica de participación",
    ],
  },
  {
    id: "07",
    name: "Pantallas para eventos y activaciones de marca",
    slug: "pantallas-eventos",
    category: "Tecnología y activaciones corporativas",
    tagline: "Tu mensaje ocupa el centro de la escena.",
    description:
      "Una propuesta de comunicación visual para acompañar contenidos, presentaciones e identidad de marca en eventos. El formato y la solución se definirán según cada proyecto.",
    benefits: [
      "Presencia visual para tus contenidos",
      "Una experiencia alineada con tu marca",
      "Un punto de comunicación en el evento",
    ],
    uses: ["Exposiciones", "Lanzamientos", "Eventos institucionales"],
    customization: [
      "Contenido visual de marca",
      "Diseño de presentaciones",
      "Integración creativa con la ambientación",
    ],
  },
] satisfies Omit<Service, "image" | "gallery" | "availability">[];
export const services: Service[] = entries.map((entry) => ({
  ...entry,
  image: `/assets/${entry.slug}.svg`,
  gallery: [`/assets/${entry.slug}.svg`, `/assets/${entry.slug}-detail.svg`],
  availability: business.availability[entry.slug],
}));
export const categories: Category[] = [
  ...new Set(services.map((service) => service.category)),
];
