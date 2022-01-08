import LoginPage from '../../support/PageObjects/LoginPage';

describe('Test Log In Routines', () => {
    const login = new LoginPage();
    it('Log in with correct credentials', () => {
        login.navigate();
        login.enterLogin(Cypress.env('loginPage_emailCorrect'));
        login.enterPassword(Cypress.env('loginPage_passwordCorrect'));
        login.clickSubmit();
        cy.get('a.logout').should('be.visible');
        cy.get('a.logout').click();
    })
    it('Log in without credentials', () => {
        login.navigate();
        login.clickSubmit();
        cy.get('.alert').find('li').should('have.text', Cypress.env('loginPage_errorEmailRequired'));
    })
    it('Log in without password', () => {
        login.navigate();
        login.enterLogin(Cypress.env('loginPage_emailCorrect'));
        login.clickSubmit();
        cy.get('.alert').find('li').should('have.text', Cypress.env('loginPage_errorPasswordRequired'));
    })
    
    it('Log in with wrong email format', () => {
        login.navigate();
        login.enterLogin(Cypress.env('loginPage_emailWrongFormat'));
        //cy.get('[id=email]').trigger('mouseover')
        //cy.get('.popover').should('be.visible')
        
        login.clickSubmit();
        cy.contains(Cypress.env('loginPage_errorEmailWrongFormat')).should('be.visible');
    })
    
    it('Log in with wrong email', () => {
        login.navigate();
        login.enterLogin(Cypress.env('loginPage_emailWrong'));
        login.enterPassword(Cypress.env('loginPage_passwordCorrect'));
        login.clickSubmit();
        cy.get('.alert').find('li').should('have.text', Cypress.env('loginPage_errorAuthFailed'));
    })
    
    it('Log in with wrong password', () => {
        login.navigate();
        login.enterLogin(Cypress.env('loginPage_emailCorrect'));
        login.enterPassword(Cypress.env('loginPage_passwordWrong'));
        login.clickSubmit();
        cy.get('.alert').find('li').should('have.text', Cypress.env('loginPage_errorAuthFailed'));
    })
})
