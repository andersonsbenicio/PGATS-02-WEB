/// <reference types="cypress" />

//imports t
import userData from "../fixtures/data.json";
import menu from "../modules/menu";
import login from "../modules/login";
import cadastro from "../modules/cadastro";
import carrinho from "../modules/carrinho";
import contato from "../modules/contato";

describe("Automation Exercise", () => {
  beforeEach(() => {
    cy.visit("https://automationexercise.com");
    menu.navegarParaLogin();
  });

  it("Caso de teste 1: Cadastrar usuário", () => {
    //Classe
    login.preencherFormularioDePreCadastro();
    cadastro.preencherFormularioDeCadastroCompleto();

    //Assert
    cy.url().should("includes", "account_created");
    cy.contains("b", "Account Created!");
    cy.get('h2[data-qa="account-created"]').should(
      "have.text",
      "Account Created!"
    );
  });

  it("Caso de teste 2: Login de usuário com e-mail e senha corretos", () => {
    //Classe
    login.preencherFormularioDeLogin(userData.user, userData.password);

    //Assert
    cy.get("i.fa-user").parent().should("contain", userData.name);
    cy.get('a[href="/logout"]').should("be.visible");

    cy.get(":nth-child(10) > a")
      .should("be.visible")
      .and("have.text", ` Logged in as ${userData.name}`);

    cy.contains("b", userData.name);
    cy.contains(`Logged in as ${userData.name}`).should("be.visible");
  });

  it("Caso de teste 3: Login de usuário com e-mail e senha incorretos", () => {
    //Classe
    login.preencherFormularioDeLogin(userData.user, "54321");

    //Assert
    cy.get(".login-form > form > p").should(
      "contain",
      "Your email or password is"
    );
  });

  it("Caso de teste 4: Logout do Usuário", () => {
    //Classe
    login.preencherFormularioDeLogin(userData.user, userData.password);
    menu.efetuarlogout();

    // Assert
    cy.url().should("contain", "login");
    cy.contains("Login to your account");
    cy.get('a[href="/logout"]').should("not.exist");
    cy.get('a[href="/login"]').should("contain", "Signup / Login");
  });

  it("Caso de teste 5: Cadastrar Usuário com e-mail existente no sistema", () => {
    //Classe
    login.preencherFormularioDePreCadastroComEmailExistente();

    //Assert
    cy.get(".signup-form > form > p").should(
      "contain",
      "Email Address already exist!"
    );
  });

  it("Caso de teste 6: Enviar um Formulário de Contato com Upload do arquivo", () => {
    //Classe
    contato.preenchaOFormularioDeContato(
      userData.name,
      userData.email,
      userData.subject,
      userData.message
    );

    //Assert
    cy.get(".status").should("be.visible");
    cy.get(".status").should(
      "have.text",
      "Success! Your details have been submitted successfully."
    );
  });

  it("Caso de teste 8: Verificar todos os produtos e a página de detalhes do produto", () => {
    cy.get('a[href="/products"]').click();
    cy.url().should("include", "/products");

    cy.get(".features_items .product-image-wrapper")
      .first()
      .find("a")
      .contains("View Product")
      .click();
    cy.url().should("include", "/product_details/");

    //Classe
    carrinho.verificarProdutoNoCarrinho();
    carrinho.adicionarProdutoAoCarrinho();

    //Assert
    cy.get(" .modal-header").should("contain.text", "Added!");
    cy.get(" .modal-body").should(
      "contain.text",
      "Your product has been added to cart"
    );

    //Classe
    carrinho.verDetalhesDoCarrinho();

    //Assert
    cy.get("#product-1 .cart_product img").should("be.visible");
    cy.get("#product-1 .cart_description h4 a").should("have.text", "Blue Top");
    cy.get("#product-1 .cart_description p").should(
      "have.text",
      "Women > Tops"
    );
    cy.get("#product-1 .cart_price p").should("have.text", "Rs. 500");
    cy.get("#product-1 .cart_quantity .disabled").should("have.text", "1");
    cy.get("#product-1 .cart_total p").should("have.text", "Rs. 500");
  });

  it("Caso de teste 9: Pesquisar produto", () => {
    cy.get('a[href="/products"]').click();
    cy.url().should("include", "/products");

    cy.get("#search_product").type("Dress");
    cy.get("#submit_search").click();

    //Assert
    cy.contains("Searched Products").should("be.visible");
    cy.get(".features_items .product-image-wrapper").should(
      "have.length.greaterThan",
      0
    );
  });

  it("Caso de teste 10: Verificar assinatura na página inicial", () => {
    cy.get("footer", { timeout: 10000 }).scrollIntoView();
    cy.contains(/SUBSCRIPTION/i).should("be.visible");

    cy.get("footer").within(() => {
      cy.get(
        'input[type="email"], input[name="email"], input#susbscribe_email, input[name="subscribe_email"]'
      )
        .first()
        .should("exist")
        .type(userData.email, { force: true });

      cy.get("#subscribe").click();
    });

    //Assert
    // Validar resposta aceitando diversas variações de texto de sucesso.
    cy.contains(/successfully|subscribed|thank you|thanks/i, {
      timeout: 10000,
    }).should("be.visible");
  });

  it("Caso de teste 15: Fazer pedido: Registre-se antes de finalizar a compra", () => {
    //Classe
    login.preencherFormularioDePreCadastro();
    cadastro.preencherFormularioDeCadastroCompleto();

    cy.get('a[href="/products"]').click();
    cy.url().should("include", "/products");
    cy.get(".features_items").should("be.visible");
    cy.get(".features_items .product-image-wrapper").should(
      "have.length.greaterThan",
      0
    );
    cy.get(".features_items .product-image-wrapper")
      .first()
      .find("a")
      .contains("View Product")
      .click();
    cy.url().should("include", "/product_details/");

    //Classe
    carrinho.verificarProdutoNoCarrinho();
    carrinho.adicionarProdutoAoCarrinho();
    carrinho.verDetalhesDoCarrinho();
    carrinho.fazerCheckout();

    //Assert
    cy.get(".checkout-information").should("be.visible");
    cy.get('textarea[name="message"]').type("Pedido de teste automatizado");

    //Classe
    carrinho.fazerPedido();
    carrinho.preencherPagamento();
    carrinho.confirmarPagamento();

    //Assert
    cy.contains("Congratulations! Your order has been confirmed!").should(
      "be.visible"
    );

    cy.contains("Delete Account").click();
    cy.get('[data-qa="account-deleted"]')
      .contains("Account Deleted!")
      .should("be.visible");
    cy.get('[data-qa="continue-button"]').click();
  });
});
