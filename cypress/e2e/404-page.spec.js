describe('404 Page', () => {
  beforeEach(() => {
    cy.visit('/404/');
  });

  it('contains 404', () => {
    cy.get('main').within(() => {
      cy.getByText('404').should('exist');
    });
  });

  it('contains a back link', () => {
    cy.get('main').within(() => {
      cy.getByText(/back/i).should('exist');
    });
  });
});
