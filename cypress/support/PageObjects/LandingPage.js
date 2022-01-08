class LandingPage {
    navigate () {
        cy.visit(Cypress.env('landingPage_URL'))
    }

    enterSearchText(productName) {
        cy.get('#search_query_top')
            .clear()
            .type(productName)
    }
    
    clickSearch() {
        cy.get('[name=submit_search]').click();
    }    
}
export default LandingPage
