# Many to many associations

#### Objectives

- Have an awareness of the different types of relationships that exist in a relational database
- Describe and provide an example of a many to many relationship and when we would use one
- Draw and 'model' many to many relationship

## Recap

[:DRAW]:

Until now we have learned 2 associations:

- one to one; for example a Person and NI number
- one to many; Team has many players; Bank has many accounts...

There is one other relationship we need to learn about.

### Many to many

When modelling data there will be occasions when one or more rows in a table are associated with one or more rows in another table.

For example: [:DRAW]

Let's say we are going to build a pokemon collection tracker. Pokemon and Trainers have a name, and a Pokemon can belong to many trainers, and trainers can have many pokemon. Tony might have pikachu, charmander and squirtle, I might have pikachu, charmander and cindaquil.

Trainer:

- name

Pokemon:

- name


Now let's have a think about the relationship between these models. A trainer can have many pokemon and a pokemon can be owned by many users. We can generate a trainers "collection" by finding all of the pokemon which are tied to their trainer id.

When we have a many to many relation like this we require a third table in the mix. We call this a join table. A join table will have two foreign keys; one for each model. It will also usually have it's own ID.

So we need a third model. General convention is that if there is no better name for it, we give it the name table1_table2. For our example, OwnedPokemon is probably a good name.

OwnedPokemon:

- id
- trainer_id
- pokemon_id

### Models and our database

Let's start by creating our database

```
dropdb pokemon
createdb pokemon
psql -d pokemon -f db/pokemon.sql
```
Let the students have a read through the code for 5 minutes then talk through the structure (mention SqlRunner).

## Deleting Data

What happens if we run our console file multiple times?

You'll notice that when we run our console file that data keeps getting appened - the old data is still there. This is because we never tell the db to delete anything.

Let's add the delete_all method to our console.rb.

```
Trainer.delete_all()
Pokemon.delete_all()
```

This prevents duplicate data.

[Task:] Create more pokemon and trainers.

### Creating the join model

```
touch models/owned_pokemon.rb
```

In owned_pokemon.rb let's stub it out.

```
require( 'pg' )

class OwnedPokemon

  def initialize( options )

  end

  def save()

  end

  def self.all()

  end

  def self.delete_all()

  end
  
end
```
Cool let's add each method, starting with initialize.

```
attr_reader :id, :trainer_id, :pokemon_id

   def initialize( options )
    @id = options['id'].to_i
    @trainer_id = options['trainer_id'].to_i
    @pokemon_id = options['pokemon_id'].to_i
  end
```
We can test if this works in the console.

```
#seeds.rb
#ADD REQUIRE RELATIVE 
require_relative( '../models/owned_pokemon.rb' )

entry1 = OwnedPokemon.new({ 'trainer_id' => trainer1.id , 'pokemon_id' => pokemon1.id})

```
Let's check this runs.

Next let's add save.
```
  def save()
    sql = "INSERT INTO OwnedPokemons (
      trainer_id,
      pokemon_id) 
      VALUES (
        #{ @trainer_id }, 
        #{ @pokemon_id }
      ) RETURNING *"
    owned_pokemon = SqlRunner.run(sql).first
    @id = owned_pokemon['id'].to_i
  end
```

In console.rb: 

```
  owned_pokemon1.save
```

Great, let's check our entry in pry!


## Finish the methods

Before we move on, let's check if there is anything that can get tedious. What about mapping? Every time we want to return more than one entry, we'll have a whole lotta data to map through. Writing that every time can get a bit tiring and not too DRY. So let's make it dry! How about creating a method that'll return us the collection we need!


```
def self.map_items(sql)
  owned_pokemons = SqlRunner.run_sql( sql )
  result = owned_pokemons.map { |owned_pokemon| OwnedPokemon.new( owned_pokemon ) }
  return result
end

def self.map_item(sql)
  result = OwnedPokemon.map_items(sql)
  return result.first
end
```

Then we can add our self.all function

```
def self.all(runner)
  sql = "SELECT * FROM OwnedPokemons"
  return OwnedPokemon.map_items(sql, runner)
end
```
Run this in terminal and check if it works.

Lastly delete

```
 def self.delete_all(runner)
    sql = "DELETE FROM OwnedPokemons"
    runner.run_sql(sql)
end
  
```

We can now add this to the very top of the console file

```
OwnedPokemons.delete_all()
```

With that, back to the original problem!! We can now get the ids of our newly created items. Let's add some nice seed data.

[Task:] Go and make some more seed data.

## Mapping our join

Ok, we now have a relational link setup. It would be cool if our models could request data from one another though:

- trainer1.pokemons would return all the pokemon belonging to that trainer
- pokemon1.trainers would show you the trainers that own that pokemon

[DRAW ON BOARD]

Let's first write the SQL in the postgres terminal and work it out.

First, we need a valid trainer id.
```
Trainer.all()
```
Take a note of an id and slot it in here.
```
psql -d pokemon

SELECT p.* from POKEMONS p inner join OWNEDPOKEMONS o ON o.pokemon_id = p.id WHERE trainer_id = 1;
```
Cool now we need to teleport this into our model.

```
#trainer.rb

 def pokemon()
    sql = "SELECT p.* FROM pokemons p INNER JOIN ownedpokemons o ON o.pokemon_id = p.id WHERE trainer_id = #{@id};"
    return Pokemon.map_items(sql, @runner)
  end

```

Now in the terminal we can see a trainers pokemons.

```
trainer1.pokemons
```

[TASK:] Add the trainers() method to Pokemon.

```
#pokemon.rb
def trainers()
    sql = "SELECT t.* from Trainers t INNER JOIN OwnedPokemons o ON o.trainer_id = t.id WHERE pokemon_id = #{@id};"
    return Trainer.map_items(sql, @runner)
  end
```









