import { services as catalogServices } from "../src/data/services.ts";
import detail from "../src/pages/ServiceDetail.tsx";
import Home from "../src/pages/Home.tsx";
import catalog from "../src/pages/Experiences.tsx";
import Events from "../src/pages/Events.tsx";
import About from "../src/pages/About.tsx";
import contact from "../src/pages/Contact.tsx";
const pageModules = {
  "/src/pages/Home.tsx": Home,
  "/src/pages/Experiences.tsx": catalog,
  "/src/pages/Events.tsx": Events,
  "/src/pages/About.tsx": About,
  "/src/pages/Contact.tsx": contact,
};
import { test } from "node:test";
import assert from "node:assert/strict";

import React from "react";
import { renderToString } from "react-dom/server";
import { MemoryRouter, Routes, Route } from "react-router-dom";
const paths = [
  ["/", "/src/pages/Home.tsx"],
  ["/experiencias", "/src/pages/Experiences.tsx"],
  ["/eventos-sociales", "/src/pages/Events.tsx"],
  ["/eventos-corporativos", "/src/pages/Events.tsx"],
  ["/nosotros", "/src/pages/About.tsx"],
  ["/contacto", "/src/pages/Contact.tsx"],
];
{
  const services = catalogServices;
  const render = (Component, path, route = path.split("?")[0]) =>
    renderToString(
      React.createElement(
        MemoryRouter,
        { initialEntries: [path] },
        React.createElement(
          Routes,
          null,
          React.createElement(Route, {
            path: route,
            element: React.createElement(Component),
          }),
        ),
      ),
    );
  for (const [path, source] of paths) {
    const Component = pageModules[source];
    const html = render(Component, path);
    test(`Render semántico de ${path}`, () => {
      assert.equal((html.match(/<h1[ >]/g) || []).length, 1);
      assert.ok(html.includes("TCN") || html.includes("evento"));
    });
  }
  for (const service of services) {
    const html = render(
      detail,
      `/experiencias/${service.slug}`,
      "/experiencias/:slug",
    );
    test(`Detalle y CTA de ${service.slug}`, () => {
      assert.ok(html.includes(service.name));
      assert.ok(html.includes(`/contacto?servicio=${service.slug}`));
      assert.ok(html.includes("Visual conceptual"));
      assert.ok(html.includes("En prelanzamiento"));
    });
  }
  const filtered = render(
    catalog,
    "/experiencias?categoria=Recuerdos%20emocionales",
  );
  test("Filtro por query agrupa exactamente dos recuerdos emocionales", () => {
    assert.equal((filtered.match(/class="service-card"/g) || []).length, 2);
  });
  const preselected = render(contact, "/contacto?servicio=telefono-mensajes");
  test("Formulario preselecciona servicio y no genera canales pendientes", () => {
    assert.match(
      preselected,
      /type="checkbox"[^>]*checked=""[^>]*value="telefono-mensajes"/,
    );
    assert.doesNotMatch(preselected, /href="https:\/\/wa.me\//);
    assert.match(preselected, /no confirma disponibilidad/);
  });
  test("Slug desconocido muestra 404", () => {
    const html = render(
      detail,
      "/experiencias/desconocido",
      "/experiencias/:slug",
    );
    assert.ok(html.includes("404"));
  });
}
