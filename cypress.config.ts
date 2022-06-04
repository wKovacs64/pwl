import { defineConfig } from 'cypress';

export default defineConfig({
  chromeWebSecurity: false,
  video: false,
  viewportHeight: 1024,
  viewportWidth: 1132,
  e2e: {
    baseUrl: 'http://localhost:3000',
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
  },
});
