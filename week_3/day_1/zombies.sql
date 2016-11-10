DROP TABLE zombies;
DROP TABLE victims;

CREATE TABLE zombies
(
  id SERIAL8 primary key,
  name VARCHAR(255) not null,
  type VARCHAR(255)
);

CREATE TABLE victims
(
  id SERIAL8 primary key,
  name VARCHAR(255) not null,
  run_speed INT2
);

INSERT INTO victims (name, run_speed) VALUES ('Euan',100);
INSERT INTO victims (name, run_speed) VALUES ('Josh',2);
INSERT INTO victims (name, run_speed) VALUES ('Russel',75);
INSERT INTO victims (name, run_speed) VALUES ('Renwick',75);

INSERT INTO zombies (name, type) VALUES ('Chris', 'Runner');
INSERT INTO zombies (name, type) VALUES ('Sam', 'Drooler');
INSERT INTO zombies (name, type) VALUES ('Marie', 'Walker');
INSERT INTO zombies (name, type) VALUES ('Joe', 'Drooler');