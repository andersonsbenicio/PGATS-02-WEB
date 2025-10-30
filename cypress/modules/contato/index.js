//Criando e exportando classes

class Contato {
  preenchaOFormularioDeContato(name, email, subject, message) {
    cy.get(`a[href*="contact"]`).click();

    cy.get('[data-qa="name"]').type(name);
    cy.get('[data-qa="email"]').type(email);
    cy.get('[data-qa="subject"]').type(subject);
    cy.get('[data-qa="message"]').type(message);

    cy.fixture("data.json").as("file");
    cy.get("input[type=file]").selectFile("@file");

    cy.get('[data-qa="submit-button"]').click();
  }
}

export default new Contato();
