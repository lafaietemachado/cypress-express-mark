///<reference types="cypress" />

Cypress.Commands.add('createTask', (taskName = '') => {
    cy.visit('/')

    cy.get('input[placeholder="Add a new Task"]').as('inputTask')

    if (taskName !== '') {
        cy.get('@inputTask').type(taskName)
    }
        
    //cy.get('button[type="submit"]).click()
    //cy.get('._listButtonNewTask_1y0mp_40').click()
    //button[contains(text(), "Create")]     -----xpath, o cypress não trabalha com xpath
    cy.contains('button', 'Create').click()
})

Cypress.Commands.add('removeTaskByName',(taskName) => {
    cy.request({
        url: Cypress.env('apiUrl') + '/helper/tasks',
        method: 'DELETE',
        body: {name: taskName}
    }).then(response => {
        expect(response.status).to.eq(204)
    })
} )

Cypress.Commands.add('postTask', (task) => {
    cy.request({
        url: Cypress.env('apiUrl') + '/tasks',
        method: 'POST',
        body: task
    }).then(response => {
        expect(response.status).to.eq(201)
    })
})

Cypress.Commands.add('isRequired', (targetMessage) => {
    
    cy.get('@inputTask').invoke('prop', 'validationMessage').should((text) => {
        expect(
            targetMessage
        ).to.eq(text)
    })
})