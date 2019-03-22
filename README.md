# SDEC: Dashboard

🇧🇷 O repositório contém a estrutura por trás do painel de controle público do sistema fornecido pela Fundação. Aqui está armazenado ambas as API's e a interface gráfica.

🇺🇸 This repo hosts the source code behind the public explorer, containing both API's and also the GUI.

## 📝 Documentação

A [documentação](https://sdec.readme.io) do projeto possui:

- Explicações sobre a arquitetura do sistema
- Referência para as API's
- Fluxos para as diferentes ações do sistema
- Sobre a Fundação
- ++++

## 🥣 Sopa de Letrinhas

**API**: Node + Express + GraphQL + Sequelize + RestAdapter + Postgres
**WebApp**: React + Redux

## ▶️ Rodando
- Clone o repositório
- Instale os módulos NPM da API `cd api` e `npm install`
- Instale os módulos NPM do WebApp `cd web` e `npm install`
- Modifique `/api/src/config/database.json` pelas credenciais do Banco de Dados
- Modifique `/api/src/config/config.json` pela porta da API (opcional)
- Modifique `/web/.env` pela porta web (opcional)
- Rode a API `cd api` e `npm start`, visite @ http://localhost:8000/graphql/
- Rode o Webapp `cd web` e `npm start`, visite @ http://localhost:3000/

## 🏗 Estrutura do Projeto
    dashboard
      ├── api 
      │   ├── src
      │   │   ├── config
      │   │   ├── models
      │   │   ├── schema
      │   │   ├── setup
      │   │   └── index.js
      │   │
      │   └── package.json
      │
      ├── web 
      │   ├── public
      │   ├── src
      │   │   ├── components
      │   │   ├── setup
      │   │   └── index.js
      │   │
      │   ├── .env
      │   └── package.json
      │
      ├── .gitignore
      └── README.md
