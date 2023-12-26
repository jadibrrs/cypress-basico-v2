/// <reference types="Cypress" />

describe('Privacy Central de Atendimento ao Cliente TAT', () => {
    beforeEach(() => {
        cy.visit('cypress-basico-v2/src/privacy.html')
    })

    it('Testa a página da política de privacidade de forma independente', () => {    
        cy.get('#white-background > :nth-child(1)')
            .should('be.visible')
        cy.get('#white-background > :nth-child(2)')
            .should('be.visible')
        cy.get('#white-background > :nth-child(3)')
            .should('be.visible')
        cy.contains('p', 'Talking About Testing')
            .should('be.visible')
    })
})