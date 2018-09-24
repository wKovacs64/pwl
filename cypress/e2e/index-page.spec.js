import colorString from 'color-string';
import classifyCharacters from '../../src/utils/classify-characters';
import colors from '../../src/legend/colors';
import labels from '../../src/legend/labels';

const colorToRGB = cssColor =>
  colorString.to.rgb(colorString.get.rgb(cssColor));

describe('Index Page', () => {
  const EXPOSURE_ROUTE = 'https://api.pwnedpasswords.com/range/*';

  beforeEach(() => {
    cy.server();
    cy.route({
      method: 'GET',
      url: EXPOSURE_ROUTE,
      status: 404,
    });
    cy.visit('/');
  });

  it('only shows results section with input', () => {
    cy.getByLabelText('Password').should('be.empty');
    cy.queryByTestId('results').should('not.exist');

    cy.getByLabelText('Password')
      .click()
      .type('password');

    cy.queryByTestId('results').should('exist');
  });

  it('includes link to source', () => {
    cy.getByLabelText(/View source/);
  });

  describe('Password Through Lense', () => {
    it('contains classified characters matching the input', () => {
      const password = ' P4ssw0rd! ';
      const classifiedCharacters = classifyCharacters(password, colors, labels);

      cy.getByLabelText('Password')
        .click()
        .type(password);

      cy.getByTestId('password-through-lense')
        .children()
        .should('have.length', password.length);

      cy.getByTestId('password-through-lense').within(() => {
        classifiedCharacters.forEach(({ character, color, label }) => {
          cy.getByText(character, { trim: false, collapseWhitespace: false })
            .should('have.css', 'color', colorToRGB(color))
            .and('have.attr', 'title', label);
        });
      });
    });
  });

  describe('Legend', () => {
    beforeEach(() => {
      cy.getByLabelText('Password')
        .click()
        .type('P4ssw0rd!');
    });

    it('exists in results section', () => {
      cy.getByTestId('results').should('exist');
    });

    it('is accurate', () => {
      cy.getByTestId('results').within(() => {
        cy.getByTestId('legend').within(() => {
          // Number
          cy.getByTestId(`legend-row--${labels.number}`).within(() => {
            cy.getByTestId('color').should(
              'have.css',
              'background-color',
              colorToRGB(colors.number),
            );
            cy.getByText(labels.number).should('exist');
          });
          // Uppercase Letter
          cy.getByTestId(`legend-row--${labels.uppercase}`).within(() => {
            cy.getByTestId('color').should(
              'have.css',
              'background-color',
              colorToRGB(colors.uppercase),
            );
            cy.getByText(labels.uppercase).should('exist');
          });
          // Lowercase Letter
          cy.getByTestId(`legend-row--${labels.lowercase}`).within(() => {
            cy.getByTestId('color').should(
              'have.css',
              'background-color',
              colorToRGB(colors.lowercase),
            );
            cy.getByText(labels.lowercase).should('exist');
          });
          // Special
          cy.getByTestId(`legend-row--${labels.special}`).within(() => {
            cy.getByTestId('color').should(
              'have.css',
              'background-color',
              colorToRGB(colors.special),
            );
            cy.getByText(labels.special).should('exist');
          });
        });
      });
    });
  });

  describe('Public Exposure', () => {
    it('shows loading state', () => {
      cy.getByLabelText('Password')
        .click()
        .type('P4ssw0rd!');

      cy.getByTestId('results').within(() => {
        cy.getByTestId('pwned-info').within(() => {
          cy.getByText(/Loading/).should('exist');
        });
      });
    });

    it('shows positive feedback for clean passwords', () => {
      cy.fixture('clean-password.txt').then(cleanPassword => {
        cy.route({
          method: 'GET',
          url: EXPOSURE_ROUTE,
          response: 'fixture:clean-password-response.txt',
        });

        cy.getByLabelText('Password')
          .click()
          .type(cleanPassword);

        cy.getByTestId('results').within(() => {
          cy.getByText(/Congratulations/).should('exist');
        });
      });
    });

    it('shows cautionary feedback for exposed passwords', () => {
      cy.fixture('exposed-password.txt').then(exposedPassword => {
        cy.fixture('exposed-password-count.txt').then(exposedPasswordCount => {
          cy.route({
            method: 'GET',
            url: EXPOSURE_ROUTE,
            response: 'fixture:exposed-password-response.txt',
          });

          cy.getByLabelText('Password')
            .click()
            .type(exposedPassword);

          cy.getByTestId('results').within(() => {
            cy.getByText(/Uh-oh/).should('exist');
            cy.getByText(exposedPasswordCount.trim()).should('exist');
          });
        });
      });
    });

    it('indicates when public exposure information is unavailable', () => {
      cy.route({
        method: 'GET',
        url: EXPOSURE_ROUTE,
        response: 'API Unavailable',
        status: 500,
      });

      cy.getByLabelText('Password')
        .click()
        .type('P4ssw0rd!');

      cy.getByTestId('results').within(() => {
        cy.getByText(/unavailable/).should('exist');
      });
    });
  });
});
