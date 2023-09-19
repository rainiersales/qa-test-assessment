import { defineConfig } from "cypress";

export default defineConfig({
  defaultCommandTimeout: 10000,
  e2e: {
    baseUrl: "http://localhost:4200/", // Replace with your desired base URL
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});