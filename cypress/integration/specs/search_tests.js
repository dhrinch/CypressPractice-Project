import LandingPage from '../../support/PageObjects/LandingPage';
import SearchResultPage from '../../support/PageObjects/SearchResultPage';

describe('Test Search Functionality', () => {
    const landing = new LandingPage();
    it('Search for a product by single word', () => {
        landing.navigate();
        landing.enterSearchText(Cypress.env('landingPage_searchTextSimple'));
        landing.search();
        
        const results = new SearchResultPage;
        cy.contains(Cypress.env('landingPage_searchTextSimple')).should('be.visible');
    })
    it('Search for a product by several words', () => {
        landing.navigate();
        landing.enterSearchText(Cypress.env('landingPage_searchTextCompound'));
        landing.search();
        
        const results = new SearchResultPage;
        cy.contains(Cypress.env('landingPage_searchTextCompound')).should('be.visible');
    })
    it('Add product to cart', () => {
        landing.navigate();
        landing.enterSearchText(Cypress.env('landingPage_searchTextSimple'));
        landing.search();
        
        const results = new SearchResultPage;
        results.addToCart();
        cy.contains(Cypress.env('searchPage_addToCartSuccess')).should('be.visible');
    })

})