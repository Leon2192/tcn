import { useLocation } from "react-router-dom";
import { Button, ContactCTA, SectionHeading } from "../components/UI";
import { ServiceCard } from "../components/ServiceCard";
import { SEO } from "../components/SEO";
import { services } from "../data/services";
export default function Events() {
  const corporate = useLocation().pathname === "/eventos-corporativos";
  const occasions = corporate
    ? [
        "Activaciones de marca",
        "Lanzamientos",
        "Ferias",
        "Exposiciones",
        "Celebraciones empresariales",
        "Eventos institucionales",
      ]
    : [
        "Casamientos",
        "Cumpleaños de 15",
        "Cumpleaños de adultos",
        "Fiestas privadas",
        "Celebraciones familiares",
      ];
  const selected = corporate
    ? [services[6], services[5], services[2]]
    : [services[0], services[3], services[4]];
  return (
    <>
      <SEO
        title={`Eventos ${corporate ? "corporativos" : "sociales"}`}
        description={`Propuestas de tecnología y entretenimiento para ${occasions.join(", ").toLowerCase()} en CABA y Gran Buenos Aires. TCN en prelanzamiento.`}
      />
      <section
        className={`page-hero event-page container ${corporate ? "corporate" : "social"}`}
      >
        <span className="eyebrow">
          TCN / EVENTOS {corporate ? "CORPORATIVOS" : "SOCIALES"}
        </span>
        <h1>
          {corporate ? (
            <>
              Tu marca se vive.
              <br />
              <span className="text-steel">No solo se mira.</span>
            </>
          ) : (
            <>
              La mejor parte:
              <br />
              <span className="text-steel">vivirlo juntos.</span>
            </>
          )}
        </h1>
        <p>
          {corporate
            ? "Imaginamos experiencias participativas que conecten tu mensaje con las personas. Tecnología y entretenimiento al servicio de la identidad de tu marca."
            : "Cada celebración tiene una historia. Imaginamos experiencias para que tus invitados participen, se diviertan y sean parte de los recuerdos."}
        </p>
        <Button to={`/contacto?tipo=${corporate ? "corporativo" : "social"}`}>
          Contanos sobre tu evento
        </Button>
      </section>
      <section className="container occasion-section">
        <SectionHeading
          eyebrow="EL ESCENARIO LO PONÉS VOS"
          title={
            corporate ? "Encuentros con propósito." : "Hay mucho para celebrar."
          }
        />
        <div className="occasions">
          {occasions.map((occasion, i) => (
            <article key={occasion} data-reveal>
              <span>0{i + 1}</span>
              <h3>{occasion}</h3>
              <p>
                {corporate
                  ? "Una oportunidad para generar participación y expresar la identidad de tu organización."
                  : "Un momento para encontrarse, compartir y crear recuerdos con las personas que más importan."}
              </p>
            </article>
          ))}
        </div>
      </section>
      <section className="container section">
        <SectionHeading
          eyebrow="PENSADAS PARA ESTE MOMENTO"
          title="Experiencias para imaginar."
        >
          Las propuestas finales se evaluarán según el evento, el espacio y la
          disponibilidad.
        </SectionHeading>
        <div className="service-grid featured">
          {selected.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
      </section>
      <section className="container process section">
        <SectionHeading
          eyebrow="DE LA IDEA AL PROYECTO"
          title="Empecemos por tu visión."
        />
        <div className="process-grid">
          {[
            [
              "01",
              "Te escuchamos",
              "Contanos qué evento imaginás, dónde y cuándo.",
            ],
            [
              "02",
              "Exploramos opciones",
              "Revisamos las experiencias y posibilidades de personalización.",
            ],
            [
              "03",
              "Definimos el alcance",
              "Equipamiento, condiciones y disponibilidad se confirman antes de cualquier contratación.",
            ],
          ].map(([number, title, text]) => (
            <article key={number} data-reveal>
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>
      <ContactCTA />
    </>
  );
}
