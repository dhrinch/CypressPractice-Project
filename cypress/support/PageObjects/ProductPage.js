class ProductPage {

    addToCart(){
        cy.get('[name=Submit]').click();
    }
}
export default ProductPage
