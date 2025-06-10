/// <reference types='cypress' />

/* eslint-disable no-console */

describe('Web Tables page', () => {
  beforeEach(() => {
    cy.visit('https://demoqa.com/webtables'); // Navigate to Web Tables
  });

  // eslint-disable-next-line max-len
  it('should verify pagination stays disabled when fewer than 6 records exist', () => {
    cy.get('select').select('5'); // Set rows per page to 5
    cy.get('.rt-tbody').children().should('have.length.lte', 5); // Ensure max 5 rows

    // Check if pagination buttons remain disabled
    cy.get('.-next').should('be.disabled');
    cy.get('.-previous').should('be.disabled');

    cy.log('Pagination is disabled because fewer than 6 records exist.');
  });

  it('should change rows count selection', () => {
    cy.get('select').select('5'); // Select 5 rows per page
    cy.get('.rt-tbody').children().should('have.length.lte', 5);
    cy.get('select').select('10'); // Select 10 rows per page
    cy.get('.rt-tbody').children().should('have.length.lte', 10);
  });

  it('should add a new worker', () => {
    const worker = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      age: '30',
      salary: '5000',

      // eslint-disable-next-line
      department: 'HR',
    };

    cy.get('#addNewRecordButton').click(); // Open add form
    cy.get('#firstName').type(worker.firstName);
    cy.get('#lastName').type(worker.lastName);
    cy.get('#userEmail').type(worker.email);
    cy.get('#age').type(worker.age);
    cy.get('#salary').type(worker.salary);
    cy.get('#department').type(worker.department);
    cy.get('#submit').click(); // Submit form

    cy.get('.rt-tbody').should('contain', worker.firstName); // Validate worker added
  });

  it('should delete a worker', () => {
    cy.get('.rt-tbody')
      .children()
      .then(($rows) => {
        if ($rows.length > 0) {
          cy.get('.rt-tbody .action-buttons').first().click(); // Delete first worker
          cy.get('.rt-tbody').should('not.contain', 'Cierra Vega'); // Validate worker deleted
        } else {
          cy.log('No workers found to delete.');
        }
      });
  });

  it('should delete all workers one by one', () => {
    cy.get('span[id^="delete-record-"]').each(($deleteButton) => {
      cy.wrap($deleteButton).click(); // Click each delete button
    });

    // Validate that all row data is removed
    cy.get('.rt-tbody')
      .children()
      .each(($row) => {
        cy.wrap($row).should('not.contain.text'); // Ensure no content remains
      });
    cy.get('.rt-tbody')
      .children()
      .each(($row) => {
        cy.wrap($row).should('have.text', ''); // Ensure table cells have no text
      });

    cy.log('All workers have been deleted successfully.');
  });

  it('should find a worker and edit details', () => {
    cy.get('.rt-tbody').then(($table) => {
      if ($table.text().includes('Alden Cantrell')) {
        cy.get('#searchBox').type('Alden Cantrell'); // Perform search
        cy.get('.rt-tbody').should('contain', 'Alden Cantrell');
        cy.get('.rt-tbody .action-buttons').first().click(); // Click edit
        cy.get('#salary').clear(); // Clear salary field
        cy.get('#salary').type('15000'); // Update salary
        cy.get('#submit').click();
        cy.get('.rt-tbody').should('contain', '15000'); // Validate update
      } else {
        cy.log('Worker not found, skipping test.');
      }
    });
  });

  it('should validate search across all columns', () => {
    cy.get('#searchBox').type('Legal'); // Search by department
    cy.get('.rt-tbody').should('contain', 'Legal');
  });
});

// Global Cypress exception handling
Cypress.on('uncaught:exception', (err) => {
  console.warn('Ignoring uncaught exception:', err);
  return false;
});
