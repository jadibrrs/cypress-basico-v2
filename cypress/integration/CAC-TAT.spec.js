/// <reference types="Cypress" />

const { it } = require("mocha")

describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function(){
        cy.visit('http://127.0.0.1:5500/cypress-basico-v2/src/index.html')
    })
    it('verifica o título da aplicação', function() {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })
    it('preenche os campos obrigatórios e envia o formulário', function() {
        cy.get('input[id="firstName"]').type('Jadi').should('have.value', 'Jadi')
        cy.get('input[id="lastName"]').type('Barros').should('have.value', 'Barros')
        cy.get('input[id="email"]').type('jbheliodoro@gmail.com').should('have.value', 'jbheliodoro@gmail.com')
        cy.get('input[id="open-text-area"]').type('Teste').should('have.value', 'Teste')
        cy.get('button[type="submit"]').click()
        cy.get('span[class="success"]').should('be.visible')
    })
})