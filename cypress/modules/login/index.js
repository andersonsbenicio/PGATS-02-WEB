import { faker } from "@faker-js/faker";

import { getRandonEmail } from "../../support/helpers";

//Criando e exportando classes

class Login {
  preencherFormularioDePreCadastro() {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();

    cy.get('[data-qa="signup-name"]').type(firstName, lastName);
    cy.get('[data-qa="signup-email"]').type(getRandonEmail());

    cy.contains("button", "Signup").click();
  }

  preencherFormularioDePreCadastroComEmailExistente() {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();

    cy.get('[data-qa="signup-name"]').type(firstName, lastName);
    cy.get('[data-qa="signup-email"]').type("qa-tester-1759530219181@test.com");

    cy.contains("button", "Signup").click();
  }

  preencherFormularioDeLogin(user, pass) {
    cy.get('[data-qa="login-email"]').type(user);
    cy.get('[data-qa="login-password"]').type(pass);

    cy.get('[data-qa="login-button"]').click();
  }
}

export default new Login();
