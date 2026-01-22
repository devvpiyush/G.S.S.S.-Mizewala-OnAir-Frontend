import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@utils": path.resolve(__dirname, "./src/utils"),
      "@public": path.resolve(__dirname, "../public"),
      "@icons": path.resolve(__dirname, "./src/assets/Icons"),
      "@social": path.resolve(__dirname, "./src/assets/Icons/Social"),
      "@graphics": path.resolve(__dirname, "./src/assets/Graphics"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@hooks": path.resolve(__dirname, "./src/hooks"),
      "@page": path.resolve(__dirname, "./src/pages"),
      "@styles": path.resolve(__dirname, "./src/styles"),
      "@ui": path.resolve(__dirname, "./src/components/UI"),
    },
  },
});
