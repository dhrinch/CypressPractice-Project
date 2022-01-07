import LandingPage from '../../support/PageObjects/LandingPage';
import SearchPage from '../../support/PageObjects/SearchPage';
import ProductPage from '../../support/PageObjects/ProductPage';

describe('Test Search Functionality', () => {
    const landing = new LandingPage();
    
    it('Search for a product by single word', () => {
        landing.navigate();
        landing.enterSearchText(Cypress.env('landingPage_searchTextSimple'));
        landing.search();
        
        cy.contains(Cypress.env('landingPage_searchTextSimple')).should('be.visible');
    })
    
    it('Search for a product by several words', () => {
        landing.navigate();
        landing.enterSearchText(Cypress.env('landingPage_searchTextCompound'));
        landing.search();
        
        cy.contains(Cypress.env('landingPage_searchTextCompound')).should('be.visible');
    })
    
    it('Search without entering any text', () => {
        landing.navigate();
        landing.search();

        cy.contains(Cypress.env('searchPage_errorNoKeywordsEntered')).should('be.visible');
    })
    
    it('Search for a non-existing product', () => {
        landing.navigate();
        landing.enterSearchText(Cypress.env('landingPage_searchTextNonExisting'));
        landing.search();
        
        cy.contains(Cypress.env('searchPage_errorNoResult')).should('be.visible');
    })
    
    it('Add product to cart from search page', () => {
        landing.navigate();
        landing.enterSearchText(Cypress.env('landingPage_searchTextSimple'));
        landing.search();
        
        const results = new SearchPage;
        results.addToCart();
        cy.contains(Cypress.env('searchPage_addToCartSuccess')).should('be.visible');
        cy.get('.continue').click();
    })

    it('Add product to cart from product page', () => {
        landing.navigate();
        landing.enterSearchText(Cypress.env('landingPage_searchTextSimple'));
        landing.search();
        
        cy.get('.product_img_link').click();
        const product = new ProductPage;
        product.addToCart();
        cy.contains(Cypress.env('searchPage_addToCartSuccess')).should('be.visible');
        cy.get('.continue').click();
    })
})
