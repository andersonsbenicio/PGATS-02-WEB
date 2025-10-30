# Projeto de Testes Automatizados Web

Este projeto utiliza o Cypress para automação de testes end-to-end em aplicações web. Abaixo estão as instruções para configurar e operar o projeto.

## Pré-requisitos

- Node.js (recomendado versão 18 ou superior)
- npm (gerenciador de pacotes do Node)

## Instalação

1. Clone o repositório ou baixe os arquivos do projeto.
2. No terminal, navegue até a pasta do projeto e execute:
   ```bash
   npm install
   ```
   Isso instalará todas as dependências necessárias, incluindo o Cypress e o reporter Mochawesome.

## Estrutura do Projeto

- `cypress/e2e/` — Testes automatizados
- `cypress/fixtures/` — Dados de apoio para os testes
- `cypress/modules/` — Módulos de funcionalidades (cadastro, login, carrinho, etc.)
- `cypress/support/` — Comandos customizados e helpers
- `cypress.config.js` — Configuração do Cypress

## Como executar os testes

- Para abrir a interface do Cypress:
  ```bash
  npx cypress open
  ```
- Para executar os testes em modo headless e gerar relatórios:
  ```bash
  npx cypress run
  ```

## Personalização

- Os dados de teste podem ser ajustados em `cypress/fixtures/data.json`.
  -- Adicione novos testes na pasta `cypress/e2e/`.
- Utilize os módulos em `cypress/modules/` para organizar funcionalidades.
- Crie comandos customizados em `cypress/support/commands.js`.

## Dicas

- Utilize o comando `npx cypress open` para depurar e visualizar os testes em execução.
- Consulte a documentação oficial do Cypress para recursos avançados: https://docs.cypress.io/

## Suporte

Em caso de dúvidas ou problemas, consulte a [documentação oficial do Cypress](https://docs.cypress.io/) ou entre em contato com o responsável pelo projeto.
