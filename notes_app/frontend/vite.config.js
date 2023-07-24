/* eslint-disable no-undef */
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
  },
  server: {
    port: 3000,
    proxy: {
      "/api": {
        target: "http://localhost:3001",
      }
    }
  }
});
