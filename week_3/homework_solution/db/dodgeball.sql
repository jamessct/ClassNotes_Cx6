DROP TABLE teams;
DROP TABLE matches;

CREATE TABLE teams (
  id serial4 primary key,
  name VARCHAR(255)
);

CREATE TABLE matches (
  id serial4 primary key,
  home_id int4 references teams(id) ON DELETE CASCADE,
  away_id int4 references teams(id) ON DELETE CASCADE,
  home_score int4,
  away_score int4
);