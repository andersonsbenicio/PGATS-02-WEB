import { faker } from "@faker-js/faker";

//Criando e exportando classes

class Cadastro {
  preencherFormularioDeCadastroCompleto() {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();

    cy.get('input[type="radio"]').check("Mrs");
    cy.get("input#password").type("123456", { log: false });

    cy.get("select[data-qa=days]").select("20");
    cy.get("select[data-qa=months]").select("January");
    cy.get("select[data-qa=years]").select("1990");

    cy.get("input[type=checkbox]#newsletter").check();
    cy.get("input[type=checkbox]#optin").check();

    cy.get("input#first_name").type(firstName);
    cy.get("input#last_name").type(lastName);
    cy.get("input#company").type(`PGATS ${faker.company.name()}`);
    cy.get("input#address1").type(faker.location.streetAddress());
    cy.get("select#country").type("Canada");
    cy.get("input#state").type(faker.location.state());
    cy.get("input#city").type(faker.location.city());
    cy.get('[data-qa="zipcode"]').type(faker.location.zipCode());
    cy.get('[data-qa="mobile_number"]').type("111 222 333");

    cy.get('[data-qa="create-account"]').click();
  }
}

export default new Cadastro();
