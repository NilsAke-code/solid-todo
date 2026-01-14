import { defineConfig } from "@solidjs/start/config";
// @ts-ignore
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  vite: {
    plugins: [
        tailwindcss(),
    ],
  },
});
