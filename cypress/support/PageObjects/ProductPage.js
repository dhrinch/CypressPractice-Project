const getAddToCartButton = () => cy.get('[name=Submit]');

class ProductPage {

    selectSize(size){
        cy.get('select[name="group_1"]').select(size)
    }
    
    addToCart(){
        getAddToCartButton()
            .click();
    }
}
export default ProductPage
