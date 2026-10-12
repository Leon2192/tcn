import { HeroVisual } from "../components/HeroVisual";
import { ContactCTA, SectionHeading } from "../components/UI";
import { SEO } from "../components/SEO";
export default function About() {
  return (
    <>
      <SEO
        title="Nosotros"
        description="Conocé la visión de The Cabin Nation: una nueva marca argentina de tecnología y entretenimiento para eventos, en etapa de prelanzamiento."
      />
      <section className="about-hero container">
        <div>
          <span className="eyebrow">THE CABIN NATION / NUESTRA VISIÓN</span>
          <h1>
            Estamos creando
            <br />
            una nueva forma
            <br />
            <span className="text-steel">de encontrarnos.</span>
          </h1>
          <p>
            TCN nace como una idea: unir tecnología, entretenimiento y
            personalización para que cada evento tenga algo propio.
          </p>
          <span className="prelaunch">
            <i />
            PROYECTO EN PRELANZAMIENTO
          </span>
        </div>
        <HeroVisual />
      </section>
      <section className="section container intro">
        <SectionHeading eyebrow="EL CONCEPTO" title="La experiencia nos une." />
        <div className="intro-copy" data-reveal>
          <p>
            The Cabin Nation es una marca argentina en desarrollo, pensada para
            eventos sociales y corporativos en CABA y Gran Buenos Aires.
          </p>
          <p>
            Queremos crear espacios de participación: lugares donde una foto, un
            mensaje, un desafío o una interacción se conviertan en un recuerdo
            compartido.
          </p>
          <p>
            Esta web presenta nuestro catálogo inicial de propuestas. Estamos
            definiendo equipamiento y condiciones comerciales; cada consulta nos
            ayuda a entender qué experiencias querés vivir.
          </p>
        </div>
      </section>
      <section className="section container">
        <SectionHeading
          eyebrow="LO QUE NOS MUEVE"
          title="Una idea. Tres principios."
        />
        <div className="process-grid">
          {[
            [
              "01",
              "Participación",
              "Pensar experiencias que inviten a las personas a ser protagonistas.",
            ],
            [
              "02",
              "Identidad",
              "Explorar posibilidades para que cada propuesta refleje el carácter del evento.",
            ],
            [
              "03",
              "Claridad",
              "Comunicar el estado del proyecto y confirmar el alcance antes de prometer una experiencia.",
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
