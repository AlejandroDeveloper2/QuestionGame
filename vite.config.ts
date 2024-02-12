import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: "@assets", replacement: "/src/assets" },
      { find: "@components", replacement: "/src/components" },
      { find: "@pages", replacement: "/src/pages" },
      { find: "@hooks", replacement: "/src/hooks" },
      { find: "@routes", replacement: "/src/routes" },
      { find: "@utils", replacement: "/src/utils" },
      { find: "@models", replacement: "/src/models" },
      { find: "@services", replacement: "/src/services" },
      { find: "@zustand", replacement: "/src/zustand" },
      { find: "@config", replacement: "/src/config" },
      { find: "@layout", replacement: "/src/layout" },
      { find: "@styles", replacement: "/src/styles" },
      { find: "@constants", replacement: "/src/constants" },
    ],
  },
});
