import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import ts from "typescript";
function loadModule(path) {
  const source = readFileSync(path, "utf8");
  const code = ts
    .transpileModule(source, {
      compilerOptions: {
        module: ts.ModuleKind.ESNext,
        target: ts.ScriptTarget.ES2022,
      },
    })
    .outputText.replace(
      /from ['"]zod['"]/,
      `from '${new URL("../node_modules/zod/index.js", import.meta.url).href}'`,
    );
  return import(
    `data:text/javascript;base64,${Buffer.from(code).toString("base64")}`
  );
}
const contact = await loadModule("src/utils/contact.ts");
const valid = {
  name: "Ana Pérez",
  email: "ana@example.com",
  phone: "+54 11 1234 5678",
  eventType: "Casamiento",
  date: "",
  location: "CABA",
  services: ["telefono-mensajes"],
  message: "Una idea & algo más",
};
test("Formulario rechaza datos inválidos y experiencias vacías", () => {
  assert.equal(contact.contactSchema.safeParse(valid).success, true);
  for (const values of [
    { ...valid, email: "incorrecto" },
    { ...valid, name: "" },
    { ...valid, phone: "abc" },
    { ...valid, services: [] },
    { ...valid, date: "2000-01-01" },
    { ...valid, eventType: "" },
  ])
    assert.equal(contact.contactSchema.safeParse(values).success, false);
});
test("Consulta mantiene datos, caracteres y fecha a definir", () => {
  const message = contact.formatInquiry(valid, [
    "Teléfono grabador de mensajes",
  ]);
  assert.match(message, /Ana Pérez/);
  assert.match(message, /Fecha estimada: A definir/);
  assert.match(message, /Teléfono grabador/);
  assert.match(message, /Una idea & algo más/);
  assert.match(message, /prelanzamiento/);
});
test("Canales pendientes no producen enlaces rotos", () => {
  assert.equal(contact.whatsappUrl("", "hola"), null);
  assert.equal(contact.emailUrl("", "hola"), null);
  assert.equal(contact.emailUrl("mal", "hola"), null);
  const message = "Hola & gracias\nTCN";
  const url = new URL(contact.whatsappUrl("5491112345678", message));
  assert.equal(url.searchParams.get("text"), message);
  assert.match(contact.emailUrl("consultas@example.com", message), /^mailto:/);
});
test("Catálogo contiene siete servicios con assets propios", () => {
  const source = readFileSync("src/data/services.ts", "utf8");
  const slugs = [...source.matchAll(/slug:\s*['"]([^'"]+)['"]/g)].map(
    (match) => match[1],
  );
  assert.equal(slugs.length, 7);
  assert.equal(new Set(slugs).size, 7);
  for (const slug of slugs) {
    assert.ok(existsSync(`public/assets/${slug}.svg`));
    assert.ok(existsSync(`public/assets/${slug}-detail.svg`));
    assert.ok(existsSync(`dist/experiencias/${slug}/index.html`));
  }
});
test("Build contiene todas las rutas y metadata semántica", () => {
  for (const route of [
    "",
    "experiencias",
    "eventos-sociales",
    "eventos-corporativos",
    "nosotros",
    "contacto",
  ]) {
    const html = readFileSync(
      `dist/${route ? route + "/" : ""}index.html`,
      "utf8",
    );
    assert.match(html, /lang="es-AR"/);
    assert.match(html, /property="og:title"/);
    assert.doesNotMatch(html, /lorem ipsum/i);
  }
  assert.ok(existsSync("dist/robots.txt"));
  assert.ok(existsSync("dist/sitemap.xml"));
});
