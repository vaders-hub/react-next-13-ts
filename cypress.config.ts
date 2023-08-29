import { defineConfig } from 'cypress';

export default defineConfig({
  projectId: 'next-13',
  component: {
    specPattern: './src/app/**/*.cy.{js,jsx,ts,tsx}',
    devServer: {
      framework: 'next',
      bundler: 'webpack',
    },
  },
  e2e: {
    specPattern: './src/cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    baseUrl: 'http://localhost:8081/',
    supportFile: false,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
