# EN:

# Trybe Football Club Project :soccer:

## What was developed?

For this project, it will be build a Dockerized back-end using data modeling with Sequelize. the development should adhere to the business rules provided in the project, and your API should be capable of being consumed by a pre-existing front-end in this project.

In this project, I will:

Use an ORM is and performs operations on a relational database.
build a fooball API with 3 tables.
Work with multiple applications running in isolated environments (containers).
Create a communication service between isolated environments on the same host using Docker Compose.

## What do I need to know to do the project?

- Node.js: ORM and Authentication
- Docker: Using Containers
- Object-Oriented Programming (OOP) and SOLID


## Mandatory Project Requirements

- 1 - Develop the migration and model that represent the "teams" table in their respective directories at the path /app/backend/src/database.
- 2 - (TDD) Develop tests that cover at least 5 percent of the files in the directory /app/backend/src, with a minimum of 7 lines covered.
- 3 - Develop the /teams endpoint in the back-end so that it can correctly return all teams.
- 4 - (TDD) Develop tests that cover at least 10 percent of the files in the directory /app/backend/src, with a minimum of 19 lines covered.
- 5 - Develop the /teams/:id endpoint in the back-end so that it can return data for a specific team.
- 6 - Develop the migration and model that represent the "user" table in their respective directories at the path /app/backend/src/database.
- 7 - (TDD) Develop tests that cover at least 15 percent of the files in the directory /app/backend/src, with a minimum of 25 lines covered.
- 8 - Develop the /login endpoint in the back-end so that it allows access with valid data from the front-end.
- 9 - (TDD) Develop tests that cover at least 20 percent of the files in the directory /app/backend/src, with a minimum of 35 lines covered.
- 10 - Develop the /login endpoint in the back-end so that it does not allow access with an unregistered email or incorrect password from the front-end.
- 11 - (TDD) Develop tests that cover at least 30 percent of the files in the directory /app/backend/src, with a minimum of 45 lines covered.
- 12 - Develop a validation middleware for the token, checking if it is valid, and develop the /login/role endpoint in the back-end so that it correctly returns the data to the front-end.
- 13 - Develop the migration and model that represent the "matches" table in their respective directories at the path /app/backend/src/database.
- 14 - (TDD) Develop tests that cover at least 45 percent of the files in the directory /app/backend/src, with a minimum of 70 lines covered.
- 15 - Develop the /matches endpoint so that the data is displayed correctly on the matches screen in the front-end.
- 16 - Develop the /matches endpoint so that it is possible to filter only ongoing matches and also filter only finished matches on the matches screen in the front-end.
- 17 - Develop the /matches/:id/finish endpoint so that it is possible to finalize a match in the database.
- 18 - Develop the /matches/:id endpoint so that it is possible to update ongoing matches.
- 19 - (TDD) Develop tests that cover at least 60 percent of the files in the directory /app/backend/src, with a minimum of 80 lines covered.
- 20 - Develop the /matches endpoint so that it is possible to register a new ongoing match in the database.
- 21 - Develop the /matches endpoint so that it is not possible to insert a match with the same teams or with a team that does not exist in the "teams" table.
- 23 - Develop the /leaderboard/home endpoint so that it returns the home team performance information with the following properties: name, totalPoints, totalGames, totalVictories, totalDraws, totalLosses, goalsFavor, and goalsOwn.
- 24 - Develop the /leaderboard/home endpoint so that it is possible to filter the home team standings on the leaderboard screen in the front-end with the initial data from the database, including the properties goalsBalance and efficiency, in addition to the properties from the previous requirement.
- 25 - Develop the /leaderboard/home endpoint so that it is possible to filter the home team standings on the leaderboard screen in the front-end and update the table by inserting the match Corinthians 2 X 1 Internacional.
- 26 - Develop the /leaderboard/away endpoint so that it returns the away team performance information with the following properties: name, totalPoints, totalGames, totalVictories, totalDraws, totalLosses, goalsFavor, and goalsOwn.
- 27 - Develop the /leaderboard/away endpoint so that it is possible to filter the away team standings on the leaderboard screen in the front-end with the initial data from the database, including the properties goalsBalance and efficiency, in addition to the properties from the previous requirement.
- 28 - Develop the /leaderboard/away endpoint so that it is possible to filter the away team standings on the leaderboard screen in the front-end and update the table by inserting the match Corinthians 2 X 1 Internacional.
- 29 - Develop the /leaderboard endpoint so that it is possible to filter the overall team standings on the leaderboard screen in the front-end with the initial data from the database.

## Bonus Requirements


- 22 - (Bonus; TDD) Develop tests that cover at least 80 percent of the files in the directory /app/backend/src, with a minimum of 100 lines covered.
- 30 - (Bonus) Develop the /leaderboard endpoint so that it is possible to filter the overall team standings on the leaderboard screen in the front-end and update the table by inserting the match Flamengo 3 X 0 Napoli-SC.


# PT-BR:

# Projeto Trybe Football Club :soccer:

## O que foi desenvolvido?
Para este projeto, será construído um back-end com Docker, utilizando modelagem de dados com Sequelize. O desenvolvimento deve seguir as regras de negócio fornecidas no projeto, e a API deve ser capaz de ser consumida por um front-end pré-existente neste projeto.

## Neste projeto, farei o seguinte:

- Usar um ORM para operações em um banco de dados relacional.
- Construir uma API de futebol com 3 tabelas.
- Trabalhar com várias aplicações em ambientes isolados (containers).
- Criar um serviço de comunicação entre ambientes isolados no mesmo host usando o Docker Compose.
- 
## O que preciso saber para fazer o projeto?

- Node.js: ORM e Autenticação
- Docker: Usando Containers
- Programação Orientada a Objetos (POO) e SOLID

## Requisitos obrigatórios do Projeto

 - 1 - Desenvolva a migration e o model que representa a tabela de times nos respectivos diretórios no caminho /app/backend/src/database
 - 2 - (TDD) Desenvolva testes que cubram no mínimo 5 por cento dos arquivos do diretório /app/backend/src, com um mínimo de 7 linhas cobertas
 - 3 - Desenvolva o endpoint /teams no back-end de forma que ele possa retornar corretamente todos os times
 - 4 - (TDD) Desenvolva testes que cubram no mínimo 10 por cento dos arquivos no diretório /app/backend/src, com um mínimo de 19 linhas cobertas
 - 5 - Desenvolva o endpoint /teams/:id no back-end de forma que ele possa retornar dados de um time específico
 - 6 - Desenvolva a migration e o model que representa a tabela de pessoas usuárias nos respectivos diretórios no caminho /app/backend/src/database
 - 7 - (TDD) Desenvolva testes que cubram no mínimo 15 por cento dos arquivos no diretório /app/backend/src, com um mínimo de 25 linhas cobertas
 - 8 - Desenvolva o endpoint /login no back-end de maneira que ele permita o acesso com dados válidos no front-end
 - 9 - (TDD) Desenvolva testes que cubram no mínimo 20 por cento dos arquivos no diretório /app/backend/src, com um mínimo de 35 linhas cobertas
 - 10 - Desenvolva o endpoint /login no back-end de maneira que ele não permita o acesso com um email não cadastrado ou senha incorreta no front-end
 - 11 - (TDD) Desenvolva testes que cubram no mínimo 30 por cento dos arquivos no diretório /app/backend/src, com um mínimo de 45 linhas cobertas
 - 12 - Desenvolva um middleware de validação para o token, verificando se ele é válido, e desenvolva o endpoint /login/role no back-end de maneira que ele retorne os dados corretamente no front-end
 - 13 - Desenvolva a migration e o model que representa a tabela de partidas nos respectivos diretórios no caminho /app/backend/src/database
 - 14 - (TDD) Desenvolva testes que cubram no mínimo 45 por cento dos arquivos no diretório /app/backend/src, com um mínimo de 70 linhas cobertas
 - 15 - Desenvolva o endpoint /matches de forma que os dados apareçam corretamente na tela de partidas no front-end
 - 16 - Desenvolva o endpoint /matches de forma que seja possível filtrar somente as partidas em andamento, e também filtrar somente as partidas finalizadas, na tela de partidas do front-end
 - 17 - Desenvolva o endpoint /matches/:id/finish de modo que seja possível finalizar uma partida no banco de dados
 - 18 - Desenvolva o endpoint /matches/:id de forma que seja possível atualizar partidas em andamento
 - 19 - (TDD) Desenvolva testes que cubram no mínimo 60 por cento dos arquivos no diretório /app/backend/src, com um mínimo de 80 linhas cobertas
 - 20 - Desenvolva o endpoint /matches de modo que seja possível cadastrar uma nova partida em andamento no banco de dados
 - 21 - Desenvolva o endpoint /matches de forma que não seja possível inserir uma partida com times iguais nem com um time que não existe na tabela de times
 - 23 - Desenvolva o endpoint /leaderboard/home de forma que retorne as informações do desempenho dos times da casa com as seguintes propriedades: name, totalPoints, totalGames, totalVictories, totalDraws, totalLosses, goalsFavor e goalsOwn
 - 24 - Desenvolva o endpoint /leaderboard/home de forma que seja possível filtrar as classificações dos times da casa na tela de classificação do front-end com os dados iniciais do banco de dados, incluindo as propriedades goalsBalance e efficiency, além das propriedades do requisito anterior
 - 25 - Desenvolva o endpoint /leaderboard/home de forma que seja possível filtrar as classificações dos times da casa na tela de classificação do front-end, e atualizar a tabela ao inserir a partida Corinthians 2 X 1 Internacional
 - 26 - Desenvolva o endpoint /leaderboard/away de forma que retorne as informações do desempenho dos times visitantes com as seguintes propriedades: name, totalPoints, totalGames, totalVictories, totalDraws, totalLosses, goalsFavor e goalsOwn
 - 27 - Desenvolva o endpoint /leaderboard/away, de forma que seja possível filtrar as classificações dos times quando visitantes na tela de classificação do front-end, com os dados iniciais do banco de dados, incluindo as propriedades goalsBalance e efficiency, além das propriedades do requisito anterior
 - 28 - Desenvolva o endpoint /leaderboard/away de forma que seja possível filtrar as classificações dos times quando visitantes na tela de classificação do front-end e atualizar a tabela ao inserir a partida Corinthians 2 X 1 Internacional
 - 29 - Desenvolva o endpoint /leaderboard de forma que seja possível filtrar a classificação geral dos times na tela de classificação do front-end com os dados iniciais do banco de dados

## Requisitos Bônus

 - 22 - (Bônus; TDD) Desenvolva testes que cubram no mínimo 80 por cento dos arquivos no diretório /app/backend/src, com um mínimo de 100 linhas cobertas
 - 30 - (Bônus) Desenvolva o endpoint /leaderboard de forma que seja possível filtrar a classificação geral dos times na tela de classificação do front-end e atualizar a tabela ao inserir a partida Flamengo 3 X 0 Napoli-SC

# Qualquer dúvida me contate abaixo.



## :phone: Contact:
<section>
  <p
    align="center"
    style="background-color:#f5f5f5"
    class="connection-container">
    <a
      href="https://www.linkedin.com/in/bruno-m-souza/" target="_blank"
    >
      <img
        align="center"
        src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white"
        alt="linkedin"
      />
    </a>
    <a
      href="mailto:bmsouza88@gmail.com"
      target="_blank"
    >
      <img
        align="center"
        src="https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white"
        alt="email"
      />
    </a>
  </p>
</section>
