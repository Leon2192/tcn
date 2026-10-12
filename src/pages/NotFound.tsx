import { Button } from "../components/UI";
import { SEO } from "../components/SEO";
export default function NotFound() {
  return (
    <section className="container not-found">
      <SEO
        title="Página no encontrada"
        description="Esta página no existe. Volvé a explorar el universo TCN."
      />
      <span className="eyebrow">FUERA DE ÓRBITA / 404</span>
      <h1>
        Esta experiencia
        <br />
        todavía no existe.
      </h1>
      <p>Podés volver al inicio o descubrir nuestro catálogo.</p>
      <div className="hero-actions">
        <Button to="/">Volver al inicio</Button>
        <Button secondary to="/experiencias">
          Explorar experiencias
        </Button>
      </div>
    </section>
  );
}
