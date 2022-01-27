import LoginPage from '../../support/PageObjects/LoginPage';

describe('Test Log In Routines', () => {
    const login = new LoginPage();
    
    it('Log in with correct credentials', () => {
        login.navigate();
        login.enterLogin(Cypress.env('credentials').loginPage_emailCorrect);
        login.enterPassword(Cypress.env('credentials').loginPage_passwordCorrect);
        login.clickSubmit();
        cy.get('a.logout').should('be.visible');
        cy.get('a.logout').click();
    })
    
    it('Log in without credentials', () => {
        login.navigate();
        login.clickSubmit();
        cy.get('.alert').find('li').should('have.text', Cypress.env('errors').loginPage_errorEmailRequired);
    })
    
    it('Log in without password', () => {
        login.navigate();
        login.enterLogin(Cypress.env('credentials').loginPage_emailCorrect);
        login.clickSubmit();
        cy.get('.alert').find('li').should('have.text', Cypress.env('errors').loginPage_errorPasswordRequired);
    })
    
    it('Log in with wrong email format', { scrollBehavior: 'center' }, () => {
        login.navigate();
        login.enterLogin(Cypress.env('credentials').loginPage_emailWrongFormat);
        
        login.clickSubmit();
        cy.wait(500);
        cy.matchImageSnapshot('wrongEmailFormat', { capture : 'viewport'})
    })
    
    it('Log in with wrong email', () => {
        login.navigate();
        login.enterLogin(Cypress.env('credentials').loginPage_emailWrong);
        login.enterPassword(Cypress.env('credentials').loginPage_passwordCorrect);
        login.clickSubmit();
        cy.get('.alert').find('li').should('have.text', Cypress.env('errors').loginPage_errorAuthFailed);
    })
    
    it('Log in with wrong password', () => {
        login.navigate();
        login.enterLogin(Cypress.env('credentials').loginPage_emailCorrect);
        login.enterPassword(Cypress.env('credentials').loginPage_passwordWrong);
        login.clickSubmit();
        cy.get('.alert').find('li').should('have.text', Cypress.env('errors').loginPage_errorAuthFailed);
    })
})
