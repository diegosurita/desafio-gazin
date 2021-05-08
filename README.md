# Desafio técnico Gazin Tech

Este repositório contém o desafio técnico do processo seletivo para a vaga de Full Stack Developer na Gazin Tech.

## Requisitos

Para executar este projeto é necessário ter instalado em seu computador o **Docker 3+**.

## Executando a aplicação

Para executar a aplicação siga os passos como descrito abaixo.

1. Clone o projeto em uma pasta de sua preferência, através do link: `https://github.com/diegosurita/desafio-gazin.git`
1. Abra a linha de comando de seu computador e vá até a pasta raiz do projeto clonado
1. Execute o comando `ocker-compose up -d` para inicializar os containers
1. Após o container "gazin-db" ser inicializado por completo (verifique o log do container através do comando `docker logs -f gazin-db`), execute o comando `docker exec -it gazin-db sh -c "mysql -u root < /gazin/setup-db.sql"` para criar as tabelas da aplicação. Se você estiver utilizando o "Git Bash" é necessário adicionar o comando `winpty` no inicio ficando: `winpty docker exec -it gazin-db sh -c "mysql -u root < /gazin/setup-db.sql"`
