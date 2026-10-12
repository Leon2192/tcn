import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import type { Service } from "../types/service";
import { availabilityLabels } from "../config/business";
export function ServiceCard({ service }: { service: Service }) {
  return (
    <Link
      className="service-card"
      to={`/experiencias/${service.slug}`}
      data-reveal
    >
      <div className="service-image">
        <img
          src={service.image}
          alt={`Ilustración conceptual de ${service.name.toLowerCase()}`}
          loading="lazy"
          width="800"
          height="680"
        />
        <span className="card-number">{service.id} / TCN</span>
        <span className="card-arrow">
          <ArrowUpRight size={22} />
        </span>
        <span className="illustration-note">VISUAL CONCEPTUAL</span>
      </div>
      <div className="card-copy">
        <span className="eyebrow">{service.category}</span>
        <h3>{service.name}</h3>
        <p>{service.tagline}</p>
        <small className="availability">
          <i />
          {availabilityLabels[service.availability]}
        </small>
      </div>
    </Link>
  );
}
