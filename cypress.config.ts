import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      //
      
    },
    baseUrl: "http://localhost:3000",
  },
  env: {
    auth0_username: "root4",
    auth0_password: "123",
    frontendUrl:  "http://localhost:3000",
    backendUrl:  "http://localhost:3001"
  },
});


