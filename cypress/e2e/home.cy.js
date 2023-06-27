///<reference types="cypress" />

describe('home', () => {
  it('pwebapp deve estar online', () => {
    cy.visit('/')

    //valida o titulo da página 
    cy.title().should('eq', 'Gerencie suas tarefas com Mark L')
  })
})