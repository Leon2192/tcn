import { useParams, Link } from "react-router-dom";
import { Check, ArrowLeft } from "lucide-react";
import { services } from "../data/services";
import { availabilityLabels } from "../config/business";
import { Button, SectionHeading } from "../components/UI";
import { ServiceCard } from "../components/ServiceCard";
import { SEO } from "../components/SEO";
import NotFound from "./NotFound";
export default function ServiceDetail() {
  const { slug } = useParams();
  const service = services.find((item) => item.slug === slug);
  if (!service) return <NotFound />;
  const related = services
    .filter((item) => item.slug !== slug)
    .sort(
      (a, b) =>
        Number(b.category === service.category) -
        Number(a.category === service.category),
    )
    .slice(0, 3);
  return (
    <>
      <SEO
        title={service.name}
        description={`${service.description} Propuesta TCN en prelanzamiento; disponibilidad a confirmar.`}
      />
      <section className="detail-hero container">
        <div>
          <Link className="back-link" to="/experiencias">
            <ArrowLeft size={16} /> Todas las experiencias
          </Link>
          <span className="eyebrow">
            {service.id} / {service.category}
          </span>
          <h1>
            {service.name}
            <span className="red-dot">.</span>
          </h1>
          <p className="detail-tagline">{service.tagline}</p>
          <p>{service.description}</p>
          <span className="availability">
            <i />
            {availabilityLabels[service.availability]}
          </span>
          <Button to={`/contacto?servicio=${service.slug}`}>
            Consultar por esta experiencia
          </Button>
        </div>
        <figure className="detail-image">
          <img
            src={service.image}
            alt={`Ilustración conceptual de ${service.name}`}
            width="800"
            height="680"
          />
          <figcaption>
            Visual conceptual. No representa equipamiento propio de TCN.
          </figcaption>
        </figure>
      </section>
      <section className="detail-columns section container">
        <div data-reveal>
          <span className="eyebrow">LA EXPERIENCIA</span>
          <h2>Lo que puede sumar.</h2>
          <ul className="benefits">
            {service.benefits.map((benefit) => (
              <li key={benefit}>
                <Check size={18} />
                {benefit}
              </li>
            ))}
          </ul>
        </div>
        <div data-reveal>
          <span className="eyebrow">DÓNDE IMAGINARLA</span>
          <h2>Momentos ideales.</h2>
          <div className="tags">
            {service.uses.map((use) => (
              <span key={use}>{use}</span>
            ))}
          </div>
        </div>
        <div data-reveal>
          <span className="eyebrow">TU IDENTIDAD</span>
          <h2>A tu manera.</h2>
          <ul className="plain-list">
            {service.customization.map((option) => (
              <li key={option}>{option}</li>
            ))}
          </ul>
          <p className="small-copy">
            Opciones a evaluar y confirmar según cada proyecto.
          </p>
        </div>
      </section>
      <section className="container section">
        <SectionHeading
          eyebrow="EXPLORACIÓN VISUAL"
          title="Una idea de lo que imaginamos."
        />
        <div className="gallery">
          {service.gallery.map((image, i) => (
            <figure key={image} data-reveal>
              <img
                src={image}
                alt={`${service.name}: ${i ? "detalle de la ilustración" : "vista conceptual"}`}
                loading="lazy"
                width="800"
                height="680"
              />
              <figcaption>
                {i ? "Estudio de detalle" : "Estudio de concepto"} · Ilustración
                provisional
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
      <section className="service-consult container" data-reveal>
        <div>
          <h2>¿La imaginás en tu evento?</h2>
          <p>
            Contanos la fecha estimada, la localidad y tu idea. La propuesta
            está en desarrollo y no implica una reserva ni disponibilidad
            confirmada.
          </p>
        </div>
        <Button to={`/contacto?servicio=${service.slug}`}>
          Preparar consulta
        </Button>
      </section>
      <section className="container section">
        <SectionHeading
          eyebrow="SEGUÍ EXPLORANDO"
          title="Más experiencias para combinar."
        />
        <div className="service-grid featured">
          {related.map((item) => (
            <ServiceCard service={item} key={item.slug} />
          ))}
        </div>
      </section>
    </>
  );
}
