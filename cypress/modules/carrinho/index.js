//Criando e exportando classes

class Carrinho {
  verificarProdutoNoCarrinho() {
    cy.get(".product-information").within(() => {
      cy.get("h2").should("be.visible").should("have.text", "Blue Top");
      cy.get("p").contains("Category: Women > Tops").should("be.visible");
      cy.get("span").contains("Rs. 500").should("be.visible");
      cy.get("label").contains("Quantity").should("be.visible");
      cy.get("#quantity").should("have.value", 1);
    });
  }

  adicionarProdutoAoCarrinho() {
    cy.get("button").contains("Add to cart").should("be.visible").click();
  }

  verDetalhesDoCarrinho() {
    cy.get('.text-center a[href="/view_cart"]').click();
  }

  fazerCheckout() {
    cy.get(".btn.btn-default.check_out")
      .contains("Proceed To Checkout")
      .should("be.visible")
      .click();
  }
  fazerPedido() {
    cy.get(".btn.btn-default.check_out")
      .contains("Place Order")
      .should("be.visible")
      .click();
  }

  preencherPagamento() {
    cy.get('[name="name_on_card"]').type("QA Tester");
    cy.get('[name="card_number"]').type("4444888866662222");
    cy.get('[name="cvc"]').type("456");
    cy.get('[name="expiry_month"]').type("08");
    cy.get('[name="expiry_year"]').type("2032");
  }

  confirmarPagamento() {
    cy.get('[data-qa="pay-button"]')
      .contains("Pay and Confirm Order")
      .should("be.visible")
      .click();
  }
}
export default new Carrinho();
