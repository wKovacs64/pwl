describe('Index Page', () => {
  const EXPOSURE_ROUTE = 'https://api.pwnedpasswords.com/range/*';

  beforeEach(() => {
    cy.server();
    cy.route('GET', EXPOSURE_ROUTE, '');
    cy.visit('/');
  });

  it('only shows results section with input', () => {
    cy.getByLabelText('Password').should('be.empty');
    cy.queryByTestId('lense-output').should('not.exist');

    cy.getByLabelText('Password')
      .click()
      .type('password');

    cy.queryByTestId('lense-output').should('exist');
  });

  it('includes link to source', () => {
    cy.getByLabelText(/View source/);
  });

  describe('Legend', () => {
    it('exists in results section', () => {
      cy.getByLabelText('Password')
        .click()
        .type('anything');

      cy.getByTestId('lense-output').within(() => {
        cy.getByTestId('legend').within(() => {
          cy.getByText(/Number/).should('exist');
          cy.getByText(/Uppercase Letter/).should('exist');
          cy.getByText(/Lowercase Letter/).should('exist');
          cy.getByText(/Special/).should('exist');
        });
      });
    });
  });

  describe('Public Exposure', () => {
    it('shows loading state', () => {
      cy.getByLabelText('Password')
        .click()
        .type('anything');

      cy.getByTestId('lense-output').within(() => {
        cy.getByTestId('pwned-info').within(() => {
          cy.getByText(/Loading/).should('exist');
        });
      });
    });

    it('shows positive feedback for clean passwords', () => {
      cy.fixture('clean-password.txt').then(cleanPassword => {
        cy.route('GET', EXPOSURE_ROUTE, 'fixture:clean-password-response.txt');

        cy.getByLabelText('Password')
          .click()
          .type(cleanPassword);

        cy.getByTestId('lense-output').within(() => {
          cy.getByText(/Congratulations/).should('exist');
        });
      });
    });

    it('shows cautionary feedback for exposed passwords', () => {
      cy.fixture('exposed-password.txt').then(exposedPassword => {
        cy.fixture('exposed-password-count.txt').then(exposedPasswordCount => {
          cy.route(
            'GET',
            EXPOSURE_ROUTE,
            'fixture:exposed-password-response.txt',
          );

          cy.getByLabelText('Password')
            .click()
            .type(exposedPassword);

          cy.getByTestId('lense-output').within(() => {
            cy.getByText(/Uh-oh/).should('exist');
            cy.getByText(exposedPasswordCount.trim()).should('exist');
          });
        });
      });
    });

    it('indicates when public exposure information is unavailable', () => {
      cy.route('GET', EXPOSURE_ROUTE, new Error('API Unavailable'));

      cy.getByLabelText('Password')
        .click()
        .type('anything');

      cy.getByTestId('lense-output').within(() => {
        cy.getByText(/unavailable/).should('exist');
      });
    });
  });
});
