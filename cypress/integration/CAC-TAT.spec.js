/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function() {
        cy.visit('http://127.0.0.1:5500/cypress-basico-v2/src/index.html')
    })

    it('Verifica o título da aplicação', function() {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('Preenche os campos obrigatórios e envia o formulário', function() {
        const longText = 'Teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, texto longo para vermos o delay'

        cy.get('input[id="firstName"]').type('Jadi')
        cy.get('input[id="lastName"]').type('Barros')
        cy.get('input[id="email"]').type('jbheliodoro@gmail.com')
        cy.get('textarea[id="open-text-area"]').type(longText, {delay: 0 })
        cy.get('button[type="submit"]').click()

        cy.get('span[class="success"]').should('be.visible')
    })

    it('Exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {
        cy.get('input[id="firstName"]').type('Jadi')
        cy.get('input[id="lastName"]').type('Barros')
        cy.get('input[id="email"]').type('jbheliodoro')
        cy.get('textarea[id="open-text-area"]').type('Teste', {delay: 0 })
        cy.get('button[type="submit"]').click()

        cy.get('span[class="error"]').should('be.visible')
    })
})