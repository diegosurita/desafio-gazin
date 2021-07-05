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
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

INSERT INTO developers (
    name, sex, age, hobby, birthdate
) VALUES (
    'Diego Surita',
    'M',
    30,
    'Baterista',
    '1991-06-20'
);
