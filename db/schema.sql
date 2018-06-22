CREATE DATABASE via_db;

USE via_db;

CREATE TABLE events
(
	id INT NOT NULL AUTO_INCREMENT,
	event_name VARCHAR(200) NOT NULL,
	date DATE() NOT NULL,
    time TIME() NOT NULL,
    info varchar(500) NOT NULL,
    volunteers INTEGER(50) NOT NULL,
	PRIMARY KEY(id)
);
