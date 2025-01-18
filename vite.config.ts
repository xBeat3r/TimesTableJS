import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import glsl from "vite-plugin-glsl";

export default defineConfig({
    // https://github.com/verekia/three-gpu-ecosystem-tests?tab=readme-ov-file#vite
    optimizeDeps: { esbuildOptions: { target: "esnext" } },
    build: { target: "esnext" },
    plugins: [glsl(), react()],
});
