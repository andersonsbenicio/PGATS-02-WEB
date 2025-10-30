//Criando e exportando classes

class Menu {
  navegarParaLogin() {
    cy.get('a[href="/login"]').click();
  }

  efetuarlogout() {
    cy.get('a[href="/logout"]').should("be.visible").click();
  }
}

export default new Menu();
