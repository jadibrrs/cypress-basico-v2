Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function() {
    cy.get('input[id="firstName"]').type('Jadi')
    cy.get('input[id="lastName"]').type('Barros')
    cy.get('input[id="email"]').type('jbheliodoro@gmail.com')
    cy.get('textarea[id="open-text-area"]').type('Teste')
    cy.contains('.button', 'Enviar').click()
}) 