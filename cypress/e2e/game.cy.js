// cypress/e2e/game.cy.js

describe('Tic-Tac-Toe Game', () => {
    beforeEach(() => {
        cy.visit('http://localhost:5173'); // Adjust URL as necessary
    });

    it('starts with an empty board and allows X to make the first move', () => {
        cy.get('.square').should('have.length', 9).and('contain', '');
        cy.get('.square').first().click().should('contain', 'X');
        cy.get('.win').should('contain', 'Next player: O');
    });

    it('allows players to take turns and declare a winner', () => {
        cy.get('.square').eq(0).click().should('contain', 'X');
        cy.get('.square').eq(1).click().should('contain', 'O');
        cy.get('.square').eq(4).click().should('contain', 'X');
        cy.get('.square').eq(2).click().should('contain', 'O');
        cy.get('.square').eq(8).click().should('contain', 'X');
        cy.get('.win').should('contain', 'Next player: O');
        cy.get('.square').eq(6).click().should('contain', 'O');
        cy.get('.square').eq(7).click().should('contain', 'X');
        cy.get('.square').eq(3).click().should('contain', 'O');
        cy.get('.square').eq(5).click().should('contain', 'X');
        cy.get('.win').should('contain', 'Winner: X');
    });

    it('allows navigation through game history', () => {
        cy.get('.square').eq(0).click().should('contain', 'X');
        cy.get('.square').eq(1).click().should('contain', 'O');
        cy.get('.square').eq(4).click().should('contain', 'X');
        cy.get('.square').eq(2).click().should('contain', 'O');
        cy.get('.square').eq(8).click().should('contain', 'X');

        cy.get('ol').children().eq(0).click();
        cy.get('.square').each(($el) => {
            cy.wrap($el).should('contain', '');
        });
        cy.get('.win').should('contain', 'Next player: X');

        cy.get('ol').children().eq(2).click();
        cy.get('.square').eq(0).should('contain', 'X');
        cy.get('.square').eq(1).should('contain', 'O');
        cy.get('.square').eq(4).should('contain', '');
    });
});
