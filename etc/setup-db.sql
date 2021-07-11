-- Script cria configura tabelas do banco de dados
USE gazin;

# developers
CREATE TABLE IF NOT EXISTS developers (
    developer_id INT NOT NULL PRIMARY KEY auto_increment,
    name VARCHAR(200) NOT NULL,
    sex CHAR(1),
    age INT(3),
    hobby VARCHAR(255),
    birthdate DATE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

INSERT INTO developers (
    name, sex, age, hobby, birthdate
) VALUES (
    'Diego Estevan Surita', 'M', 30, 'Baterista', '1991-06-20'
), (
    'Luiz Antonio Surita', 'M', 58, 'Pedalar', '1963-10-07'
), (
    'Beatriz Torres Melo', 'F', 24, '', '1997-06-04'
), (
    'Sonia Ap. do Nascimento Surita', 'F', 55, 'Experimentar novas receitas', '1965-04-14'
), (
    'Fulano de Tal', 'M', 30, 'Pedalar', '1991-10-20'
), (
    'Pietra Cortes Torres', 'F', 35, 'Desenhar', '1986-05-23'
), (
    'Matilda Vidigal Anes', 'F', 33, 'Pedalar', '1988-09-06'
), (
    'Domingos Cris Alcoforado', 'M', 31, 'Guitarra', '1990-08-24'
), (
    'Lara Mata Santos', 'F', 29, 'Tocar piano', '1992-09-25'
), (
    'Dilan Figueira Ruas', 'M', 28, 'Surfar', '1993-01-05'
), (
    'Arnaldo Cipriano Gomes', 'M', 30, 'Musico', '1991-03-23'
);
