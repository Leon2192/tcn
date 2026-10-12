import { Component, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { Logo } from "./Logo";
export function Button({
  to,
  children,
  secondary = false,
}: {
  to: string;
  children: ReactNode;
  secondary?: boolean;
}) {
  return (
    <Link className={`button ${secondary ? "button-secondary" : ""}`} to={to}>
      {children}
      <ArrowUpRight size={18} />
    </Link>
  );
}
export function SectionHeading({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <div className="section-heading" data-reveal>
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {children && <p>{children}</p>}
    </div>
  );
}
export function Loading() {
  return (
    <div className="loading" role="status">
      <Logo variant="icon" />
      <span>Preparando la experiencia…</span>
    </div>
  );
}
export class ErrorBoundary extends Component<
  { children: ReactNode; fallback?: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed
      ? (this.props.fallback ?? (
          <div className="error-state">
            <h2>No pudimos cargar esta experiencia.</h2>
            <p>Podés volver a intentar recargando la página.</p>
            <button className="button" onClick={() => window.location.reload()}>
              Volver a intentar
            </button>
          </div>
        ))
      : this.props.children;
  }
}
export function ContactCTA() {
  return (
    <section className="contact-cta container" data-reveal>
      <div>
        <span className="eyebrow">EL PRÓXIMO GRAN MOMENTO</span>
        <h2>
          Tu evento.
          <br />
          <span className="text-steel">Una nueva dimensión.</span>
        </h2>
        <p>
          Contanos qué imaginás. Estamos construyendo TCN y queremos conocer tu
          próximo evento.
        </p>
      </div>
      <Link
        className="circle-link"
        to="/contacto"
        aria-label="Contanos sobre tu evento"
      >
        <ArrowUpRight size={46} />
      </Link>
      <span className="cta-note">PROYECTO EN PRELANZAMIENTO · CABA + GBA</span>
    </section>
  );
}
export function TextLink({
  to,
  children,
}: {
  to: string;
  children: ReactNode;
}) {
  return (
    <Link className="text-link" to={to}>
      {children}
      <ArrowRight size={17} />
    </Link>
  );
}
