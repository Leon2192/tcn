import { useEffect, useRef, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { Logo } from "../components/Logo";
import { business } from "../config/business";
import { useReveal } from "../animations/useReveal";
const links = [
  ["/experiencias", "Experiencias"],
  ["/eventos-sociales", "Sociales"],
  ["/eventos-corporativos", "Corporativos"],
  ["/nosotros", "Nosotros"],
];
export default function SiteLayout() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const main = useRef<HTMLElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  const menu = useRef<HTMLDivElement>(null);
  useReveal(main, location.pathname);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    main.current?.focus({ preventScroll: true });
  }, [location.pathname]);
  useEffect(() => {
    if (!open) return;
    const old = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    menu.current?.querySelector<HTMLAnchorElement>("a")?.focus();
    const key = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
      if (event.key === "Tab") {
        const elements = [
          toggle.current,
          ...Array.from(
            menu.current?.querySelectorAll<HTMLAnchorElement>("a") ?? [],
          ),
        ].filter((el): el is HTMLButtonElement | HTMLAnchorElement =>
          Boolean(el),
        );
        const first = elements[0],
          last = elements[elements.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
    };
    document.addEventListener("keydown", key);
    return () => {
      document.body.style.overflow = old;
      document.removeEventListener("keydown", key);
    };
  }, [open]);
  return (
    <>
      <a className="skip-link" href="#contenido">
        Saltar al contenido
      </a>
      <header className="navbar">
        <div className="nav-inner container">
          <Link to="/" aria-label="TCN, inicio" onClick={() => setOpen(false)}>
            <Logo />
          </Link>
          <nav className="desktop-nav" aria-label="Navegación principal">
            {links.map(([to, label]) => (
              <NavLink key={to} to={to}>
                {label}
              </NavLink>
            ))}
          </nav>
          <Link className="nav-contact" to="/contacto">
            Hablemos de tu evento <ArrowUpRight size={16} />
          </Link>
          <button
            ref={toggle}
            className="menu-toggle"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            onClick={() => setOpen(!open)}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
        {open && (
          <div id="mobile-menu" ref={menu} className="mobile-menu">
            <nav aria-label="Navegación móvil">
              {[...links, ["/contacto", "Contacto"]].map(([to, label]) => (
                <NavLink key={to} to={to} onClick={() => setOpen(false)}>
                  {label}
                  <ArrowUpRight />
                </NavLink>
              ))}
            </nav>
            <small>THE CABIN NATION · PRELANZAMIENTO</small>
          </div>
        )}
      </header>
      <main id="contenido" ref={main} tabIndex={-1}>
        <Outlet />
      </main>
      <footer className="footer container">
        <div className="footer-top">
          <Link to="/">
            <Logo />
          </Link>
          <p>
            Tecnología, entretenimiento y recuerdos.
            <br />
            Una nueva forma de vivir tus eventos.
          </p>
          <span className="prelaunch">
            <i />
            EN PRELANZAMIENTO
          </span>
        </div>
        <div className="footer-links">
          <nav aria-label="Navegación del pie">
            <Link to="/experiencias">Experiencias</Link>
            <Link to="/nosotros">Nosotros</Link>
            <Link to="/contacto">Contacto</Link>
          </nav>
          <span>{business.coverage}, Argentina</span>
          {business.instagram &&
            /^https:\/\/(www\.)?instagram\.com\//.test(business.instagram) && (
              <a
                href={business.instagram}
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram <ArrowUpRight size={14} />
              </a>
            )}
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} TCN — The Cabin Nation.</span>
          <span>Imágenes conceptuales. Disponibilidad a confirmar.</span>
          <a href="#contenido">Volver arriba ↑</a>
        </div>
      </footer>
    </>
  );
}
