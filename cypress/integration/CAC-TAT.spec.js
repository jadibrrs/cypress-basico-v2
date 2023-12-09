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
        cy.get('#firstName').type('Jadi')
        cy.get('#lastName').type('Barros')
        cy.get('#email').type('jbheliodoro')
        cy.get('#open-text-area').type('Teste', {delay: 0 })
        cy.get('button[type="submit"]').click()

        cy.get('.error').should('be.visible')
    })

    it('Campo telefone continua vazio quando preenchido com valor não numérico', function() {
        cy.get('#phone')
            .type('abcdefghij')
            .should('have.value', '')
    })

    it('Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {
        cy.get('#firstName').type('Jadi')
        cy.get('#lastName').type('Barros')
        cy.get('#email').type('jbheliodoro@gmail.com')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('Teste')
        cy.get('button[type="submit"]').click()

        cy.get('.error').should('be.visible')
    })

    it('Preenche e limpa os campos nome, sobrenome, email e telefone + Exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function() {
        cy.get('input[id="firstName"]')
            .type('Jadi')
            .should('have.value', 'Jadi')
            .clear()
            .should('have.value', '')

        cy.get('input[id="lastName"]')
            .type('Barros')
            .should('have.value', 'Barros')
            .clear()
            .should('have.value', '')

        cy.get('input[id="email"]')
            .type('jbheliodoro@gmail.com')
            .should('have.value', 'jbheliodoro@gmail.com')
            .clear()
            .should('have.value', '')

        cy.get('textarea[id="open-text-area"]')
            .type('Teste')
            .should('have.value', 'Teste')
            .clear()
            .should('have.value', '')

        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')
    })

    it('Envia o formulário com sucesso usando um comando customizado', function() {
        cy.fillMandatoryFieldsAndSubmit()

        cy.get('.success').should('be.visible')
    })

    it('Seleciona um produto (YouTube) por seu texto', function() {
        cy.get('#product')
            .select('YouTube')
            .should('have.value', 'youtube')
    })

    it('Seleciona um produto (Mentoria) por seu valor (value)', function() {
        cy.get('#product')
            .select('mentoria')
            .should('have.value', 'mentoria')
    })

    it('Seleciona um produto (Blog) por seu índice', function() {
        cy.get('#product')
            .select(1)
            .should('have.value', 'blog')
    })

    it('Marca o tipo de atendimento "Feedback"', function() {
        cy.get('input[type="radio"][value="feedback"]')
            .check()
            .should('have.value', 'feedback')
    })

    it('Marca cada tipo de atendimento', function() {
        cy.get('input[type="radio"][name="atendimento-tat"]')
            .should('have.length', 3)
            .each(function($radio) { 
                cy.wrap($radio)
                    .check()
                cy.wrap($radio)
                    .should('be.checked')
            })
    })

    it.only('Marca ambos checkboxes, depois desmarca o último', function() {
        cy.get('input[type="checkbox"]')
            .check()
            .should('be.checked')
            .last()
            .uncheck()
            .should('not.be.checked')
    })
})