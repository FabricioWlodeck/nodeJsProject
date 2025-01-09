create database database_links;

use database_links;

-- USERS TABLE
create table users(
    id int not null,
    username varchar(15) not null,
    password varchar(60) not null,
    fullname varchar(100) not null,
    primary key (id)
);

/* alter table users 
    add primary key (id); */

alter table users
    modify id int(11) not null auto_increment, auto_increment=2;

describe users;

-- LINKS TABLES
create table links(
    id_links int(11) auto_increment not null,
    title varchar(150) not null,
    url varchar(255) not null,
    description text,
    user_id int,
    created_at timestamp not null default current_timestamp,
    foreign key (user_id) references users(id),
    primary key(id_links)
);

alter table links
    modify id_links int(11) not null auto_increment, auto_increment=2;

/* ALTER TABLE links CHANGE descripcion description TEXT; */
