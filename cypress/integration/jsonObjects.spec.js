/// <reference types="cypress" />

describe('JSON objects', () => {

    it('JSON objects', () => {
        cy.openHomePage()

        const simpleObject = { "key": "value", "key2": "value2" }
    
        const simpleArrayOfValues = [ "one", "two", "three" ]
    
        const arrayOfObjects = [{ "key": "value" }, { "key2": "value2" }, { "the": "value3" }]
    
        const typesOfData = { "string": "this is a string", "number": 10 }
    
        const mix = {
            "firstName": "Test",
            "lastName": "User",
            "age": 35,
            "students": [
                {
                    "firstName": "Sara",
                    "lastName": "Conor"
                },
                {
                    "firstName": "Bruce",
                    "lastName": "Willis"
                }
            ]
        }
    
        console.log(simpleObject.key2)
        console.log(simpleObject["key2"])
        console.log(simpleArrayOfValues[1])
        console.log(arrayOfObjects[2].the)
        console.log(mix.students[0].firstName)

        const lastNameOfSecondStudent = mix.students[1].lastName
        // todo: make assertion
    })
})