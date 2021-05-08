-- Script cria configura tabelas do banco de dados

CREATE TABLE IF NOT EXISTS developers (
    developer_id INT NOT NULL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    sex CHAR(1),
    age INT(3),
    hobby VARCHAR(255),
    birth_date DATETIME
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci
