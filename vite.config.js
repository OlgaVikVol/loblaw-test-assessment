import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [{ find: '@', replacement: '/src'}]
  },
  test: {
    environment: "jsdom",
    setupFiles: ["/src/test/vitest.setup.js"],
  },
});
