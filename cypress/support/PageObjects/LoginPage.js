class LoginPage {
    navigate () {
        cy.visit(Cypress.env('URLs').loginPage_URL)
    }

    enterLogin(email) {
        cy.get('[id=email]')
            .clear()
            .type(email);
        return this
    }

    enterPassword(password) {
        cy.get('[id=passwd]')
            .clear()
            .type(password);
        return this 
    }

    clickSubmit() {
        cy.get('[id=SubmitLogin]').click();
    }    
}
export default LoginPage
