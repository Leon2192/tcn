import { Link } from "react-router-dom";
import {
  ArrowDown,
  ArrowUpRight,
  Camera,
  AudioLines,
  Gamepad2,
  Monitor,
  Aperture,
} from "lucide-react";
import { HeroVisual } from "../components/HeroVisual";
import { Button, ContactCTA, SectionHeading, TextLink } from "../components/UI";
import { ServiceCard } from "../components/ServiceCard";
import { SEO } from "../components/SEO";
import { categories, services } from "../data/services";
const icons = [Camera, Aperture, AudioLines, Gamepad2, Monitor];
export default function Home() {
  return (
    <>
      <SEO
        title="Experiencias que hacen únicos tus eventos"
        description="Conocé TCN: tecnología, entretenimiento y recuerdos para eventos sociales y corporativos en CABA y GBA. Proyecto en prelanzamiento."
      />
      <section className="hero container">
        <div className="hero-copy">
          <span className="eyebrow hero-eyebrow">
            <i />
            THE CABIN NATION · EN PRELANZAMIENTO
          </span>
          <h1>
            EXPERIENCIAS
            <br />
            QUE HACEN
            <br />
            <span className="hero-outline">ÚNICOS</span>
            <br />
            TUS EVENTOS<span className="red-dot">.</span>
          </h1>
          <p>
            Tecnología, entretenimiento y recuerdos para eventos sociales y
            corporativos.
          </p>
          <div className="hero-actions">
            <Button to="/experiencias">Explorá nuestras experiencias</Button>
            <Button to="/contacto" secondary>
              Consultanos
            </Button>
          </div>
        </div>
        <HeroVisual />
        <div className="hero-bottom">
          <a href="#universo" className="scroll-hint">
            <ArrowDown size={16} /> DESCUBRÍ EL UNIVERSO TCN
          </a>
          <span>
            BUENOS AIRES, ARGENTINA
            <span className="blue-line" />
          </span>
        </div>
      </section>
      <div className="ticker" aria-hidden="true">
        <span>TECNOLOGÍA</span>
        <i>✦</i>
        <span>ENTRETENIMIENTO</span>
        <i>✦</i>
        <span>RECUERDOS</span>
        <i>✦</i>
        <span>EXPERIENCIAS</span>
        <i>✦</i>
      </div>
      <section id="universo" className="intro section container">
        <div data-reveal>
          <span className="eyebrow">01 / BIENVENIDO AL UNIVERSO TCN</span>
          <h2>
            El evento termina.
            <br />
            <span className="text-steel">La experiencia queda.</span>
          </h2>
        </div>
        <div className="intro-copy" data-reveal>
          <p>
            Hay momentos que merecen algo más. Más conexión. Más diversión. Más
            formas de recordarlos.
          </p>
          <p>
            Estamos creando The Cabin Nation: una propuesta que une tecnología y
            entretenimiento para convertir cada celebración en una experiencia
            con personalidad propia.
          </p>
          <TextLink to="/nosotros">Conocé lo que estamos construyendo</TextLink>
        </div>
      </section>
      <section className="section container">
        <div className="section-top">
          <SectionHeading
            eyebrow="02 / EL CATÁLOGO"
            title="Elegí cómo sorprender."
          >
            Distintas experiencias. Una misma idea: que todos sean parte del
            momento.
          </SectionHeading>
          <TextLink to="/experiencias">Ver las 7 experiencias</TextLink>
        </div>
        <div className="service-grid featured">
          {services.slice(0, 3).map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
        <p className="asset-notice">
          Ilustraciones conceptuales. Equipamiento, prestaciones y
          disponibilidad sujetos a confirmación.
        </p>
      </section>
      <section className="categories-section section container">
        <SectionHeading
          eyebrow="03 / UN UNIVERSO DE POSIBILIDADES"
          title="Cada evento tiene su energía."
        />
        <div className="category-list">
          {categories.map((category, i) => {
            const Icon = icons[i];
            return (
              <Link
                key={category}
                to={`/experiencias?categoria=${encodeURIComponent(category)}`}
                data-reveal
              >
                <span className="category-index">0{i + 1}</span>
                <Icon size={28} />
                <h3>{category}</h3>
                <ArrowUpRight size={23} />
              </Link>
            );
          })}
        </div>
      </section>
      <section className="event-split container">
        <Link to="/eventos-sociales" className="event-panel social" data-reveal>
          <span className="eyebrow">PARA CELEBRAR</span>
          <div className="event-art" aria-hidden="true">
            ✦
          </div>
          <h2>
            Momentos tuyos.
            <br />
            Recuerdos de todos.
          </h2>
          <p>
            Casamientos, cumpleaños y celebraciones que merecen su propia
            experiencia.
          </p>
          <span className="text-link">
            Eventos sociales <ArrowUpRight size={20} />
          </span>
        </Link>
        <Link
          to="/eventos-corporativos"
          className="event-panel corporate"
          data-reveal
        >
          <span className="eyebrow">PARA CONECTAR</span>
          <div className="event-art" aria-hidden="true">
            ▧
          </div>
          <h2>
            Tu marca.
            <br />
            En primera persona.
          </h2>
          <p>
            Activaciones, lanzamientos y encuentros donde la participación hace
            la diferencia.
          </p>
          <span className="text-link">
            Eventos corporativos <ArrowUpRight size={20} />
          </span>
        </Link>
      </section>
      <section className="personalization section container">
        <div className="personal-art" data-parallax aria-hidden="true">
          <div className="personal-ring" />
          <span>
            YOUR
            <br />
            EVENT.
            <br />
            <b>
              YOUR
              <br />
              IDENTITY.
            </b>
          </span>
        </div>
        <div data-reveal>
          <span className="eyebrow">04 / HECHO A TU MANERA</span>
          <h2>
            La tecnología es el medio.
            <br />
            <span className="text-steel">Tu identidad, el centro.</span>
          </h2>
          <p>
            Colores, mensajes, gráficas y ambientación: pensamos las
            posibilidades de personalización para que la experiencia converse
            con tu evento.
          </p>
          <p>
            Las opciones se evaluarán según el servicio, la propuesta y la
            disponibilidad al momento de tu consulta.
          </p>
          <Button to="/contacto">Imaginemos tu experiencia</Button>
        </div>
      </section>
      <ContactCTA />
    </>
  );
}
