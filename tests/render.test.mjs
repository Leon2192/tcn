import { build } from "esbuild";
import { mkdirSync, unlinkSync } from "node:fs";
import { pathToFileURL } from "node:url";
import { resolve } from "node:path";
const output = resolve("node_modules/.cache/tcn-render.mjs");
mkdirSync("node_modules/.cache", { recursive: true });
try {
  await build({
    entryPoints: ["tests/render.fixture.mjs"],
    outfile: output,
    bundle: true,
    platform: "node",
    format: "esm",
    packages: "external",
    jsx: "automatic",
    define: { "import.meta.env": "{}" },
  });
  await import(pathToFileURL(output).href);
} finally {
  unlinkSync(output);
}
