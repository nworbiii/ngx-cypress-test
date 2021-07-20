

describe('Visual Test', () => {

    it('should test snapshots', () => {
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        cy.contains('nb-card', 'Using the Grid').then((firstForm) => {
            cy.wrap(firstForm).toMatchImageSnapshot()
        })
    })

})