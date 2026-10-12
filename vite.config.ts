import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        onlyExplicitManualChunks: true,
        manualChunks(id) {
          if (
            id.includes("commonjsHelpers") ||
            id.includes("vite/preload-helper")
          )
            return "runtime";
          if (
            /node_modules\/(react|react-dom|react-router|react-router-dom|scheduler)\//.test(
              id,
            )
          )
            return "react";
          if (id.includes("/node_modules/three/")) return "three";
          if (id.includes("/node_modules/@react-three/")) return "three-react";
          if (id.includes("/node_modules/gsap/")) return "animation";
        },
      },
    },
  },
});
