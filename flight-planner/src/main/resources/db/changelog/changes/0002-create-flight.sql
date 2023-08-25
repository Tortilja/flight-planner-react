--liquibase formatted sql
--changeset ilja:3

create table flight (
                        id serial primary key,
                        airport_from_fk integer not null,
                        airport_to_fk integer not null,
                        carrier varchar(255) not null,
                        departure_time timestamp not null,
                        arrival_time timestamp not null,
                        foreign key (airport_from_fk) references airport (id) ON DELETE CASCADE ON UPDATE CASCADE,
                        foreign key (airport_to_fk) references airport (id) ON DELETE CASCADE ON UPDATE CASCADE
);