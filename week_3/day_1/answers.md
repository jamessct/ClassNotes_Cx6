## SQL Questions

First create a database called fringe_shows
```
  #terminal
  psql
  create database fringe_shows;
  \q
```

Populate the data using the script - fringeshows.sql
```
  #terminal
  psql -d fringe_shows -f fringeshows.sql
```

Using the SQL Database file given to you as the source of data to answer the questions.  Copy the SQL command you have used to get the answer, and paste it below the question, along with the result they gave.


## Section 1

  Revision of concepts that we've learnt in SQL today

  1. Select the names of all users.
  SELECT name FROM users;

  2. Select the names of all shows that cost less than £15.
  SELECT name FROM shows WHERE price < 15;

  3. Insert a user with the name "Val Gibson" into the users table.
  INSERT INTO users (name) VALUES ('Val Gibson');

  4. Insert a record that Val Gibson wants to attend the show "Two girls, one cup of comedy".
  INSERT INTO shows_users (show_id, user_id) values ( (SELECT id FROM shows where name = 'Two girls, one cup of comedy'), (SELECT id FROM users WHERE name = 'Val Gibson'));

  5. Updates the name of the "Val Gibson" user to be "Valerie Gibson".
  UPDATE users SET name = 'Valerie Gibson' WHERE name = 'Val Gibson';

  6. Deletes the user with the name 'Valerie Gibson'.
  DELETE FROM users WHERE name = 'Valerie Gibson';

  7. Deletes the shows for the user you just deleted.
  DELETE FROM shows_users where user_id = 19;
  DELETE FROM shows_users where user_id NOT IN (SELECT id from users);


## Section 2

  This section involves more complex queries.  You will need to go and find out about aggregate funcions in SQL to answer some of the next questions.

  9. Select the names and prices of all shows, ordered by price in ascending order.
  SELECT name, price FROM shows ORDER BY price ASC;

  10. Select the average price of all shows.
  SELECT avg(price) FROM shows;

  11. Select the price of the least expensive show.
  SELECT min(price) FROM shows;

  12. Select the sum of the price of all shows.
  SELECT sum(price) FROM shows;

  13. Select the sum of the price of all shows whose prices is less than £20.
  SELECT sum(price) FROM shows WHERE price < 20;

  14. Select the name and price of the most expensive show.
  SELECT name, price FROM shows WHERE price = (SELECT max(price) FROM shows);

  15. Select the name and price of the second from cheapest show.
  SELECT name, price FROM shows ORDER BY price ASC LIMIT 1 OFFSET 1;

  16. Select the names of all users whose names start with the letter "N".
  SELECT name FROM users WHERE name like 'N%';

  17. Select the names of users whose names contain "er".
  SELECT name FROM users WHERE name like '%er%';


## Section 3

  The following questions can be answered by using nested SQL statements but ideally you should learn about JOIN clauses to answer them.

  18. Select the time for the Edinburgh Royal Tattoo.
  SELECT s.name, t.time FROM shows s JOIN times t ON s.id = t.show_id WHERE s.name = 'Edinburgh Royal Tattoo';

  19. Select the number of users who want to see "Shitfaced Shakespeare".
  SELECT count(user_id) FROM shows_users INNER JOIN shows on shows_users.show_id = shows.id WHERE shows.name = 'Shitfaced Shakespeare';

  20. Select all of the user names and the count of shows they're going to see.
  SELECT users.name, count(shows_users.show_id) FROM shows_users INNER JOIN users ON shows_users.user_id = users.id GROUP BY users.id ORDER BY count ASC;

  21. SELECT all users who are going to a show at 17:15.
  SELECT users.name FROM users JOIN shows_users on shows_users.user_id = users.id JOIN times on times.show_id = shows_users.show_id WHERE times.time = '17:15';

## Hints

  - As with anything, if you get stuck, move on, then go back if you have time.
  - Don't spend all night on it!
  - Use resources online to solve harder ones - there are solutions to these questions that work with what we've learnt today, but other tools exist in SQL that could make the queries 'better' or 'easier'.

