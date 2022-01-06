import LoginPage from '../../support/PageObjects/LoginPage';

describe('Test Log In Routines', () => {
    const login = new LoginPage();
    it('Log in with correct credentials', () => {
        login.navigate();
        login.enterLogin(Cypress.env('loginPage_emailCorrect'));
        login.enterPassword(Cypress.env('loginPage_passwordCorrect'));
        login.login();
        cy.get('a.logout').should('be.visible');
        cy.get('a.logout').click();
    })
    it('Log in without credentials', () => {
        login.navigate();
        login.login();
        cy.get('.alert').find('li').should('have.text', Cypress.env('loginPage_errorEmailRequired'));
    })
    it('Log in without password', () => {
        login.navigate();
        login.enterLogin(Cypress.env('loginPage_emailCorrect'));
        login.login();
        cy.get('.alert').find('li').should('have.text', Cypress.env('loginPage_errorPasswordRequired'));
    })
    
    it('Log in with wrong email format', () => {
        login.navigate();
        login.enterLogin(Cypress.env('loginPage_emailWrongFormat'));
        //cy.get('[id=email]').trigger('mouseover')
        //cy.get('.popover').should('be.visible')
        
        login.login();
        cy.contains('Please include an \'@\' in the email address.').should('be.visible');
        //cy.get('.is_required').should('be.visible');
        //cy.on('window:alert', (text) => {
        //    expect(text).to.contains('');
        //});
        //cy.get('.alert').find('li').should('have.text', 'An email address required.');
    })
    
    it('Log in with wrong email', () => {
        login.navigate();
        login.enterLogin(Cypress.env('loginPage_emailWrong'));
        login.enterPassword(Cypress.env('loginPage_passwordCorrect'));
        login.login();
        cy.get('.alert').find('li').should('have.text', Cypress.env('loginPage_errorAuthFailed'));
    })
    
    it('Log in with wrong password', () => {
        login.navigate();
        login.enterLogin(Cypress.env('loginPage_emailCorrect'));
        login.enterPassword(Cypress.env('loginPage_passwordWrong'));
        login.login();
        cy.get('.alert').find('li').should('have.text', Cypress.env('loginPage_errorAuthFailed'));
    })
})
