import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowUpRight,
  Copy,
  Download,
  MapPin,
  Mail,
  Check,
} from "lucide-react";
import { services } from "../data/services";
import { business } from "../config/business";
import { SEO } from "../components/SEO";
import {
  contactSchema,
  type ContactValues,
  localDate,
  formatInquiry,
  whatsappUrl,
  emailUrl,
  downloadInquiry,
} from "../utils/contact";
export default function Contact() {
  const [params] = useSearchParams();
  const initial = services.find(
    (service) => service.slug === params.get("servicio"),
  )?.slug;
  const type = params.get("tipo");
  const [message, setMessage] = useState("");
  const [copyStatus, setCopyStatus] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      eventType:
        type === "corporativo"
          ? "Evento corporativo"
          : type === "social"
            ? "Evento social"
            : "",
      date: "",
      location: "",
      services: initial ? [initial] : [],
      message: "",
    },
    shouldFocusError: true,
  });
  const whatsapp = whatsappUrl(business.whatsapp, message);
  const email = emailUrl(business.email, message);
  const prepare = (values: ContactValues) => {
    setCopyStatus("");
    setMessage(
      formatInquiry(
        values,
        services
          .filter((service) => values.services.includes(service.slug))
          .map((service) => service.name),
      ),
    );
    setTimeout(() => document.getElementById("inquiry-result")?.focus(), 0);
  };
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(message);
      setCopyStatus("Consulta copiada. Todavía no fue enviada.");
    } catch {
      setCopyStatus(
        "No pudimos copiar automáticamente. Seleccioná el texto de la consulta o descargalo.",
      );
    }
  };
  const error = (field: keyof ContactValues) =>
    errors[field] ? (
      <span id={`${field}-error`} className="field-error" role="alert">
        {errors[field]?.message}
      </span>
    ) : null;
  const attrs = (field: keyof ContactValues) => ({
    "aria-invalid": Boolean(errors[field]),
    "aria-describedby": errors[field] ? `${field}-error` : undefined,
  });
  return (
    <>
      <SEO
        title="Consultanos"
        description="Prepará tu consulta para TCN. Contanos el evento, la localidad y las experiencias que te interesan. Disponibilidad a confirmar en prelanzamiento."
      />
      <section className="contact-page container">
        <div className="contact-intro">
          <span className="eyebrow">EL PRIMER PASO / CONTACTO</span>
          <h1>
            Las grandes
            <br />
            experiencias
            <br />
            <span className="text-steel">
              empiezan con
              <br />
              una idea.
            </span>
          </h1>
          <p>
            Contanos la tuya. Prepará tu consulta y elegí cómo compartirla con
            TCN.
          </p>
          <div className="contact-info">
            <MapPin size={19} />
            <span>
              {business.coverage}
              <small>Zona de cobertura inicial</small>
            </span>
          </div>
          <div className="contact-status">
            <span className="prelaunch">
              <i />
              EN PRELANZAMIENTO
            </span>
            <p>
              Estamos definiendo nuestra propuesta. Completar este formulario no
              confirma disponibilidad ni constituye una reserva.
            </p>
          </div>
          <p className="contact-pending">
            {!whatsapp && !email
              ? "Los canales de contacto todavía están pendientes de configuración. Podés preparar, copiar o descargar tu consulta."
              : "La consulta se comparte a través del canal que elijas. Tus datos no se envían a un servidor desde este formulario."}
          </p>
        </div>
        <div>
          <form
            className="contact-form"
            onSubmit={handleSubmit(prepare)}
            noValidate
          >
            <div className="form-heading">
              <h2>Hablemos de tu evento</h2>
              <span>* Campos obligatorios</span>
            </div>
            <div className="form-grid">
              <div className="field">
                <label htmlFor="name">Nombre *</label>
                <input
                  id="name"
                  autoComplete="name"
                  placeholder="Tu nombre"
                  {...register("name")}
                  {...attrs("name")}
                />
                {error("name")}
              </div>
              <div className="field">
                <label htmlFor="email">Email *</label>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="vos@ejemplo.com"
                  {...register("email")}
                  {...attrs("email")}
                />
                {error("email")}
              </div>
              <div className="field">
                <label htmlFor="phone">Teléfono *</label>
                <input
                  id="phone"
                  type="tel"
                  autoComplete="tel"
                  placeholder="Código de área + número"
                  {...register("phone")}
                  {...attrs("phone")}
                />
                {error("phone")}
              </div>
              <div className="field">
                <label htmlFor="eventType">Tipo de evento *</label>
                <select
                  id="eventType"
                  {...register("eventType")}
                  {...attrs("eventType")}
                >
                  <option value="">Elegí una opción</option>
                  {[
                    "Casamiento",
                    "Cumpleaños de 15",
                    "Cumpleaños de adultos",
                    "Fiesta privada",
                    "Celebración familiar",
                    "Evento social",
                    "Evento corporativo",
                    "Activación de marca",
                    "Lanzamiento",
                    "Feria o exposición",
                    "Evento institucional",
                    "Otro",
                  ].map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </select>
                {error("eventType")}
              </div>
              <div className="field">
                <label htmlFor="date">Fecha estimada</label>
                <input
                  id="date"
                  type="date"
                  min={localDate()}
                  {...register("date")}
                  {...attrs("date")}
                />
                {error("date")}
              </div>
              <div className="field">
                <label htmlFor="location">Localidad *</label>
                <input
                  id="location"
                  autoComplete="address-level2"
                  placeholder="¿Dónde es el evento?"
                  {...register("location")}
                  {...attrs("location")}
                />
                {error("location")}
              </div>
            </div>
            <fieldset
              className="service-options"
              aria-describedby={errors.services ? "services-error" : undefined}
            >
              <legend>Experiencias que te interesan *</legend>
              {services.map((service) => (
                <label key={service.slug}>
                  <input
                    type="checkbox"
                    defaultChecked={initial === service.slug}
                    value={service.slug}
                    {...register("services")}
                  />
                  <span>{service.name}</span>
                </label>
              ))}
              {error("services")}
            </fieldset>
            <div className="field">
              <label htmlFor="message">Tu idea o mensaje</label>
              <textarea
                id="message"
                rows={4}
                placeholder="Contanos qué imaginás para tu evento…"
                {...register("message")}
                {...attrs("message")}
              />
              {error("message")}
            </div>
            <p className="form-privacy">
              Usamos estos datos únicamente para armar tu mensaje. No se guardan
              en un servidor. Revisá la consulta antes de compartirla.
            </p>
            <button className="button" type="submit">
              Preparar mi consulta <ArrowUpRight size={18} />
            </button>
          </form>
          {message && (
            <section
              className="inquiry-result"
              id="inquiry-result"
              tabIndex={-1}
            >
              <span className="eyebrow">
                <Check size={15} /> CONSULTA PREPARADA
              </span>
              <h2>Revisá tu mensaje</h2>
              <p>Todavía no se envió. Elegí un canal o guardá el texto.</p>
              <textarea
                aria-label="Mensaje de consulta preparado"
                readOnly
                value={message}
                rows={12}
              />
              <div className="result-actions">
                {whatsapp && (
                  <a
                    className="button"
                    href={whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Abrir WhatsApp <ArrowUpRight size={17} />
                  </a>
                )}
                {email && (
                  <a className="button button-secondary" href={email}>
                    Abrir correo <Mail size={17} />
                  </a>
                )}
                <button
                  className="button button-secondary"
                  type="button"
                  onClick={copy}
                >
                  Copiar <Copy size={17} />
                </button>
                <button
                  className="button button-secondary"
                  type="button"
                  onClick={() => downloadInquiry(message)}
                >
                  Descargar <Download size={17} />
                </button>
              </div>
              <p role="status">{copyStatus}</p>
            </section>
          )}
        </div>
      </section>
    </>
  );
}
