--liquibase formatted sql
--changeset ilja:2

CREATE TABLE airport (
                         id SERIAL PRIMARY KEY,
                         country VARCHAR(255) NOT NULL,
                         city VARCHAR(255) NOT NULL,
                         airport VARCHAR(255) NOT NULL
);