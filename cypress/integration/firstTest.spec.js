/// <reference types="cypress" />


describe('Our first suite', () => {
    beforeEach(() => {
        cy.visit('/')
    })

    it('some test name', () => {
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        // by Tag Name
        cy.get('input')

        // by id
        cy.get('#inputEmail1')

        // by class name
        cy.get('.input-full-width')

        // by attribute name
        cy.get('[placeholder]')

        // by attribute name and value
        cy.get('[placeholder="Email"]')

        // by class value
        cy.get('[class="input-full-width size-medium shape-rectangle"]')

        // by Tag name and attribute with value
        cy.get('input[placeholder="Email"]')

        // by two different attributes
        cy.get('[placeholder="Email"][type="email"]')

        // by tag name, attribute with value, id and class name
        cy.get('input[placeholder="Email"]#inputEmail.input-full-width')

        // the most recommended way by Cypress
        cy.get('[data-cy="imputEmail1"]')
    })

    it('second test', () => {
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        cy.get('[data-cy="signInButton"]')

        cy.contains('Sign in')

        cy.contains('[status="warning"]', 'Sign in')

        cy.get('#inputEmail3')
            .parents('form') // only finds parent inside element you already 'got'
            .find('button') // only finds child element inside parent
            .should('contain', 'Sign in')
            .parents('form')
            .find('nb-checkbox')
            .click()

        cy.contains('nb-card', 'Horizontal form') // find nb-card which contains the text 'Horizontal form'
            .find('[type="email"]')               // within there, find element with the attribute 'type' with the value 'email'
    })

    it('then and wrap methods', () => {
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        cy.contains('nb-card', 'Using the Grid')
            .find('[for="inputEmail1"]')
            .should('contain', 'Email')

        cy.contains('nb-card', 'Using the Grid')
            .find('[for="inputPassword2"]')
            .should('contain', 'Password')

        cy.contains('nb-card', 'Basic form')
            .find('[for="exampleInputEmail1"]')
            .should('contain', 'Email address')

        cy.contains('nb-card', 'Basic form')
            .find('[for="exampleInputPassword1"]')
            .should('contain', 'Password')

        // selenium
        // const firstForm = cy.contains('nb-card', 'Using the Grid')
        // const secondForm = cy.contains('nb-card', 'Basic form')

        // firstForm.find('[for="inputEmail1"]').should('contain', 'Email')
        // firstForm.find('[for="inputPassword2"]').should('contain', 'Password')
        // secondForm.find('[for="exampleInputEmail1"]').should('contain', 'Email address')

        cy.contains('nb-card', 'Using the Grid').then( firstForm => { // when you call then, you get a JQuery object - firstForm - which here is 'nb-card' with text 'Using the Grid'
            const emailLabelFirst = firstForm.find('[for="inputEmail1"]').text()
            const passwordLabelFirst = firstForm.find('[for="inputPassword2"]').text()

            expect(emailLabelFirst).to.equal('Email')
            expect(passwordLabelFirst).to.equal('Password')

            cy.contains('nb-card', 'Basic form').then( secondForm => {
                const emailLabelSecond = secondForm.find('[for="exampleInputEmail1"]').text()
                const passwordLabelSecond = secondForm.find('[for="exampleInputPassword1"]').text()
    
                expect(passwordLabelFirst).to.equal(passwordLabelSecond)

                expect(emailLabelSecond).to.equal('Email address')
                expect(passwordLabelSecond).to.equal('Password')

                cy.wrap(secondForm).find('[for="exampleInputPassword1"]').should('contain', 'Password') // changes from JQuery context to Cypress
            })
        })
    })

    it('invoke command', () => {
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        // 1
        cy.get('[for="exampleInputEmail1"]')
            .should('contain', 'Email address')
            .should('have.class', 'label')
            .and('have.text', 'Email address')

        // 2
        cy.get('[for="exampleInputEmail1"]').then( label => { // label = attribute 'for' with value of 'exampleInputEmail1'
            expect(label.text()).to.equal('Email address')
            expect(label).to.have.class('label')
            expect(label).to.have.text('Email address')
        })

        // 3
        cy.get('[for="exampleInputEmail1"]').invoke('text').then( text => { // invoke skips the step of calling .text()
            expect(text).to.equal('Email address')
        })

        cy.contains('nb-card', 'Basic form')
            .find('nb-checkbox')
            .click()
            .find('.custom-checkbox')
            .invoke('attr', 'class')
            // .should('contain', 'checked')
            .then(classValue => {
                expect(classValue).to.contain('checked') // chai assertion
            })
    })

    it('assert property', () => {
        function selectDayFromCurrent(day) {
            let date = new Date()
            date.setDate(date.getDate() + day)
            let futureDay = date.getDate()
            let futureMonth = date.toLocaleString('default', { month: 'short' })
            let dateAssert = futureMonth + ' ' + futureDay + ', ' + date.getFullYear()
            
            cy.get('nb-calendar-navigation').invoke('attr', 'ng-reflect-date').then( dateAttribute => {
                if (!dateAttribute.includes(futureMonth)) {
                    cy.get('[data-name="chevron-right"]').click()
                    selectDayFromCurrent(day)
                } else {
                    cy.get('nb-calendar-day-picker [class="day-cell ng-star-inserted"]').contains(futureDay).click()
                } 
            })
            return dateAssert
        }

        cy.contains('Forms').click()
        cy.contains('Datepicker').click()

        cy.contains('nb-card', 'Common Datepicker').find('input').then(input => {
            cy.wrap(input).click()
            let dateAssert = selectDayFromCurrent(50)

            cy.wrap(input).invoke('prop', 'value').should('contain', dateAssert)
            cy.wrap(input).should('have.value', dateAssert)
        })
    })

    it('radio button', () => {
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        cy.contains('nb-card', 'Using the Grid')
            .find('[type="radio"]') // finds 3 radio buttons
            .then( radioButtons => { // this is a JQuery object, so we need to call cy.wrap
                cy.wrap(radioButtons)
                    .first() // find first radio button
                    .check({ force: true }) // to work around hidden visibility
                    .should('be.checked')

                cy.wrap(radioButtons)
                    .eq(1) // find second radio button by index
                    .check({ force: true })
                    .should('be.checked')

                cy.wrap(radioButtons)
                    .first() // same as eq(0)
                    .should('not.be.checked') // verify the first radio button is not checked

                cy.wrap(radioButtons)
                    .eq(2)
                    .should('be.disabled')
        })
    })

    it('check boxes', () => {
        cy.contains('Modal & Overlays').click()
        cy.contains('Toastr').click()

        cy.get('[type="checkbox"]')
            .check({ force: true }) // if the checkbox is already checked, it will not be unchecked
        cy.get('[type="checkbox"]')
            .eq(0)
            .click({ force: true })
    })

    it('lists and dropdowns', () => {
        // 1
        // cy.get('nav nb-select').click() // find nav tag, then find nb-select
        // cy.get('.options-list').contains('Dark').click()
        // cy.get('nav nb-select').should('contain', 'Dark')
        // cy.get('nb-layout-header nav').should('have.css', 'background-color', 'rgb(34, 43, 69)')

        // 2
        cy.get('nav nb-select').then(dropdown => {
            cy.wrap(dropdown).click()
            cy.get('.options-list nb-option').each((listItem, index) => {
                const itemText = listItem.text().trim()

                const colors = {
                    "Light": "rgb(255, 255, 255)",
                    "Dark": "rgb(34, 43, 69)",
                    "Cosmic": "rgb(50, 50, 89)",
                    "Corporate": "rgb(255, 255, 255)"
                }

                cy.wrap(listItem).click()
                cy.wrap(dropdown).should('contain', itemText)
                cy.get('nb-layout-header nav').should('have.css', 'background-color', colors[itemText])
                if (index < 3) {
                    cy.wrap(dropdown).click()
                }
            })
        })
    })

    it('Web tables', () => {
        cy.contains('Tables & Data').click()
        cy.contains('Smart Table').click()

        // 1
        cy.get('tbody').contains('tr', 'Larry').then( tableRow => {
            cy.wrap(tableRow).find('.nb-edit').click()
            cy.wrap(tableRow).find('[placeholder="Age"]').clear().type('25')
            cy.wrap(tableRow).find('.nb-checkmark').click()
            cy.wrap(tableRow).find('td').eq(6).should('contain', '25')
        })

        // 2
        cy.get('thead').find('.nb-plus').click()
        cy.get('thead').find('tr').eq(2).then( tableRow => {
            cy.wrap(tableRow).find('[placeholder="First Name"]').type('Kyle')
            cy.wrap(tableRow).find('[placeholder="Last Name"]').type('Brown')
            cy.wrap(tableRow).find('.nb-checkmark').click()
        })
        cy.get('tbody tr').first().find('td').then( tableColumns => {
            cy.wrap(tableColumns).eq(2).should('contain', 'Kyle')
            cy.wrap(tableColumns).eq(3).should('contain', 'Brown')
        })

        // 3 (filter)
        const age = [20, 30, 40, 200]

        cy.wrap(age).each(age => {
            cy.get('thead [placeholder="Age"]').clear().type(age)
            cy.wait(500)
            cy.get('tbody tr').each( tableRow => {
                if (age == 200) {
                    cy.wrap(tableRow).should('contain', 'No data found')
                } else {
                    cy.wrap(tableRow).find('td').eq(6).should('contain', age)
                }
            })
        })
    })

    it('tooltip', () => {
        cy.contains('Modal & Overlays').click()
        cy.contains('Tooltip').click()

        cy.contains('nb-card', 'Colored Tooltips')
            .contains('Default').click()
        cy.get('nb-tooltip').should('contain', 'This is a tooltip')
    })

    it('dialog box', () => {
        cy.contains('Tables & Data').click()
        cy.contains('Smart Table').click()

        // 1
        // cy.get('tbody tr').first().find('.nb-trash').click()
        // cy.on('window:confirm', confirm => {
        //     expect(confirm).to.equal('Are you sure you want to delete?')
        // })

        // 2
        // const stub = cy.stub()
        // cy.on('window:confirm', stub)
        // cy.get('tbody tr').first().find('.nb-trash').click().then(() => {
        //     expect(stub.getCall(0)).to.be.calledWith('Are you sure you want to delete?')
        // })

        // 3
        cy.get('tbody tr').first().find('.nb-trash').click()
        cy.on('window:confirm', () => false)


    })
})