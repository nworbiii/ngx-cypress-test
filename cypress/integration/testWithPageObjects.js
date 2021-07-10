import { onDatepickerPage } from "../support/page_objects/datepickerPage"
import { onFormLayoutsPage } from "../support/page_objects/formLayoutsPage"
import { navigateTo } from "../support/page_objects/navigationPage"
import { onSmartTablePage } from "../support/page_objects/smartTablePage"

describe('Test with Page Objects', () => {
    beforeEach('open application', () => {
        cy.openHomePage()
    })

    it('verify navigation across the pages', () => {
        navigateTo.formLayoutsPage()
        navigateTo.datepickerPage()
        navigateTo.smartTablePage()
        navigateTo.toasterPage()
        navigateTo.tooltipPage()
    })

    it.only('should submit Inline and Basic form and select tomorrow\'s date in the calendar', () => {
        navigateTo.formLayoutsPage()
        onFormLayoutsPage.submitInlineFormWithNameAndEmail('Test User', 'test@test.com')
        onFormLayoutsPage.submitBasicFormWithEmailAndPassword('test@test.com', 'password1')
        navigateTo.datepickerPage()
        onDatepickerPage.selectCommonDatepickerDateFromToday(1)
        onDatepickerPage.selectDatepickerWithRangeFromToday(7, 14)
        navigateTo.smartTablePage()
        onSmartTablePage.addNewRecordWithFirstAndLastName('Test', 'User')
        onSmartTablePage.updateAgeByFirstName('Test', 35)
        onSmartTablePage.deleteRowByIndex(1)
    })
})