import {
  entityConfirmDeleteButtonSelector,
  entityCreateButtonSelector,
  entityCreateCancelButtonSelector,
  entityCreateSaveButtonSelector,
  entityDeleteButtonSelector,
  entityDetailsBackButtonSelector,
  entityDetailsButtonSelector,
  entityEditButtonSelector,
  entityTableSelector,
} from '../../support/entity';

describe('Commande e2e test', () => {
  const commandePageUrl = '/commande';
  const commandePageUrlPattern = new RegExp('/commande(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const commandeSample = { referentiel: 'équipe de recherche', userId: 'percer', dateCommande: '2025-01-09T04:33:49.657Z' };

  let commande;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/services/commandes/api/commandes+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/services/commandes/api/commandes').as('postEntityRequest');
    cy.intercept('DELETE', '/services/commandes/api/commandes/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (commande) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/services/commandes/api/commandes/${commande.id}`,
      }).then(() => {
        commande = undefined;
      });
    }
  });

  it('Commandes menu should load Commandes page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('commande');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response?.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('Commande').should('exist');
    cy.url().should('match', commandePageUrlPattern);
  });

  describe('Commande page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(commandePageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create Commande page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/commande/new$'));
        cy.getEntityCreateUpdateHeading('Commande');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(200);
        });
        cy.url().should('match', commandePageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/services/commandes/api/commandes',
          body: commandeSample,
        }).then(({ body }) => {
          commande = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/services/commandes/api/commandes+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              body: [commande],
            },
          ).as('entitiesRequestInternal');
        });

        cy.visit(commandePageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details Commande page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('commande');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(200);
        });
        cy.url().should('match', commandePageUrlPattern);
      });

      it('edit button click should load edit Commande page and go back', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('Commande');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(200);
        });
        cy.url().should('match', commandePageUrlPattern);
      });

      it('edit button click should load edit Commande page and save', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('Commande');
        cy.get(entityCreateSaveButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(200);
        });
        cy.url().should('match', commandePageUrlPattern);
      });

      it('last delete button click should delete instance of Commande', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('commande').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(200);
        });
        cy.url().should('match', commandePageUrlPattern);

        commande = undefined;
      });
    });
  });

  describe('new Commande page', () => {
    beforeEach(() => {
      cy.visit(`${commandePageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('Commande');
    });

    it('should create an instance of Commande', () => {
      cy.get(`[data-cy="referentiel"]`).type('vlan étant donné que');
      cy.get(`[data-cy="referentiel"]`).should('have.value', 'vlan étant donné que');

      cy.get(`[data-cy="userId"]`).type('membre titulaire antagoniste');
      cy.get(`[data-cy="userId"]`).should('have.value', 'membre titulaire antagoniste');

      cy.get(`[data-cy="dateCommande"]`).type('2025-01-08T23:21');
      cy.get(`[data-cy="dateCommande"]`).blur();
      cy.get(`[data-cy="dateCommande"]`).should('have.value', '2025-01-08T23:21');

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response?.statusCode).to.equal(201);
        commande = response.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response?.statusCode).to.equal(200);
      });
      cy.url().should('match', commandePageUrlPattern);
    });
  });
});
