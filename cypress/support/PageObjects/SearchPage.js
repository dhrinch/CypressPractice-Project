const getAddToCartButton = () => cy.get('.ajax_add_to_cart_button');
const getSearchField = () => cy.get('#search_query_top');

class SearchPage {

    enterSearchText(productName) {
        getSearchField()
            .clear()
            .type(productName)
    }
    
    clickSearch() {
        cy.get('[name=submit_search]').click();
    }

    addToCart(){
        getAddToCartButton()
            .click();
    }
}
export default SearchPage
