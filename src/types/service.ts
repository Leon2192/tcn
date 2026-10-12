export type Category =
  | "Fotografía y recuerdos"
  | "Experiencias audiovisuales"
  | "Recuerdos emocionales"
  | "Gaming y entretenimiento"
  | "Tecnología y activaciones corporativas";
export type Availability =
  | "prelanzamiento"
  | "consultar"
  | "disponible"
  | "no-disponible";
export interface Service {
  id: string;
  name: string;
  slug: string;
  category: Category;
  tagline: string;
  description: string;
  benefits: string[];
  uses: string[];
  customization: string[];
  image: string;
  gallery: string[];
  availability: Availability;
}
