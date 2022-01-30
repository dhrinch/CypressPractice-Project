import LandingPage from '../../support/PageObjects/LandingPage';
import ProductPage from '../../support/PageObjects/ProductPage';

describe('Test Search Functionality', () => {
    const landing = new LandingPage();
    
    it('Search for a product by single word', () => {
        landing.navigate();
        landing.enterSearchText(Cypress.env('search_strings').landingPage_searchTextSimple);
        landing.clickSearch();
        
        cy.contains(Cypress.env('search_strings').landingPage_searchTextSimple).should('be.visible');
    })
    
    it('Search for a product by several words', () => {
        landing.navigate();
        landing.enterSearchText(Cypress.env('search_strings').landingPage_searchTextCompound);
        landing.clickSearch();
        
        cy.contains(Cypress.env('search_strings').landingPage_searchTextCompound).should('be.visible');
    })
    
    it('Search without entering any text', () => {
        landing.navigate();
        landing.clickSearch();

        cy.contains(Cypress.env('errors').searchPage_errorNoKeywordsEntered).should('be.visible');
    })
    
    it('Search for a non-existing product', () => {
        landing.navigate();
        landing.enterSearchText(Cypress.env('search_strings').landingPage_searchTextNonExisting);
        landing.clickSearch();
        
        cy.contains(Cypress.env('errors').searchPage_errorNoResult).should('be.visible');
    })
    
    it('Add product to cart from search page', () => {
        landing.navigate();
        landing.enterSearchText(Cypress.env('search_strings').landingPage_searchTextCompound);
        landing.clickSearch();
        
        cy.get('.ajax_add_to_cart_button').eq(1).click();
        cy.contains(Cypress.env('confirmations').searchPage_addToCartSuccess).should('be.visible');
        cy.get('.continue').click();
    })

    it('Add product to cart from product page', () => {
        landing.navigate();
        landing.enterSearchText(Cypress.env('search_strings').landingPage_searchTextSimple);
        landing.clickSearch();
        
        cy.get('.product_img_link').click();
        const product = new ProductPage;
        product.selectSize(Cypress.env('product').productPage_size);
        product.addToCart();
        cy.contains(Cypress.env('confirmations').searchPage_addToCartSuccess).should('be.visible');
        cy.get('.continue').click();
    })
})
