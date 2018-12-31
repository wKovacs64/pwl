declare namespace Cypress {
  interface Chainable<Subject = any> {
    injectAxe(): void;
    checkA11y(): void;
  }
}
