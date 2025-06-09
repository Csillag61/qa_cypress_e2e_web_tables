// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
/// <reference types="cypress" />

// Command: Adds a new worker
Cypress.Commands.add('addWorker', (worker) => {
  cy.get('#addNewRecordButton').click(); // Open the add worker form
  cy.get('#firstName').type(worker.firstName);
  cy.get('#lastName').type(worker.lastName);
  cy.get('#userEmail').type(worker.email);
  cy.get('#age').type(worker.age);
  cy.get('#salary').type(worker.salary);
  cy.get('#department').type(worker.department);
  cy.get('#submit').click(); // Submit the form
});

// Command: Searches for a worker
Cypress.Commands.add('searchWorker', (name) => {
  cy.get('#searchBox').type(name);
  cy.get('.rt-tbody').should('contain', name);
});

// Command: Edits a worker's details
Cypress.Commands.add('editWorker', (name, newSalary) => {
  cy.get('#searchBox').type(name);
  cy.get('.rt-tbody .action-buttons').first().click(); // Click edit
  cy.get('#salary').clear();
  cy.get('#salary').type(newSalary);
  cy.get('#submit').click();
  cy.get('.rt-tbody').should('contain', newSalary);
});

// Command: Deletes a worker
Cypress.Commands.add('deleteWorker', (name) => {
  cy.get('#searchBox').type(name);
  cy.get('.rt-tbody .action-buttons').first().click();
  cy.get('.rt-tbody').should('not.contain', name);
});
