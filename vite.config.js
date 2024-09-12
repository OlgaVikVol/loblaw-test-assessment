import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [{ find: '@', replacement: '/src'}]
  },
  test: {
    setupFiles: './vitest.setup.js', // Specify the path to your setup file
    globals: true, // Enable global mode, which gives access to `describe`, `it`, `expect`, etc.
    environment: 'jsdom', // Use jsdom for React component testing
    coverage: {
      reporter:['text', 'json', 'html'] // change this property to the desired output
    },
  },
});
