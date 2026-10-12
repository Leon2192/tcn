import { useSearchParams } from "react-router-dom";
import { categories, services } from "../data/services";
import { ServiceCard } from "../components/ServiceCard";
import { ContactCTA, SectionHeading } from "../components/UI";
import { SEO } from "../components/SEO";
export default function Experiences() {
  const [params, setParams] = useSearchParams();
  const selected = params.get("categoria");
  const valid = categories.find((category) => category === selected);
  const visible = services.filter(
    (service) => !valid || service.category === valid,
  );
  return (
    <>
      <SEO
        title="Nuestras experiencias"
        description="Explorá las siete propuestas TCN de fotografía, recuerdos, entretenimiento y activaciones para eventos. Catálogo en prelanzamiento."
      />
      <section className="page-hero container">
        <span className="eyebrow">EL UNIVERSO TCN / EXPERIENCIAS</span>
        <h1>
          Siete formas de crear
          <br />
          <span className="text-steel">algo inolvidable.</span>
        </h1>
        <p>
          Explorá nuestra propuesta inicial. Estamos en prelanzamiento: los
          detalles y la disponibilidad se confirmarán en cada consulta.
        </p>
      </section>
      <section className="container catalog">
        <div
          className="filters"
          aria-label="Filtrar experiencias por categoría"
        >
          <button
            className={!valid ? "active" : ""}
            onClick={() => setParams({})}
            aria-pressed={!valid}
          >
            Todas las experiencias <span>07</span>
          </button>
          {categories.map((category) => (
            <button
              key={category}
              aria-pressed={valid === category}
              className={valid === category ? "active" : ""}
              onClick={() => setParams({ categoria: category })}
            >
              {category}
            </button>
          ))}
        </div>
        <p role="status" className="results-count">
          {visible.length}{" "}
          {visible.length === 1 ? "experiencia" : "experiencias"} · Visuales
          conceptuales
        </p>
        {categories
          .filter((category) => !valid || category === valid)
          .map((category) => (
            <div className="catalog-category" key={category}>
              <SectionHeading eyebrow="EXPLORÁ" title={category} />
              <div className="service-grid">
                {visible
                  .filter((service) => service.category === category)
                  .map((service) => (
                    <ServiceCard service={service} key={service.slug} />
                  ))}
              </div>
            </div>
          ))}
      </section>
      <ContactCTA />
    </>
  );
}
