import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: "@components", replacement: "/src/components" },
      { find: "@pages", replacement: "/src/pages" },
      { find: "@contexts", replacement: "/src/contexts" },
      { find: "@firebaseApp", replacement: "/src/firebaseApp" },
      { find: "@", replacement: "/src" },
    ],
  },
});
