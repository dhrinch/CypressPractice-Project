class SearchPage {

    enterSearchText(productName) {
        cy.get('#search_query_top')
            .clear()
            .type(productName)
    }
    
    search() {
        cy.get('[name=submit_search]').click();
    }

    addToCart(){
        cy.get('.ajax_add_to_cart_button').click();
    }
}
export default SearchPage
