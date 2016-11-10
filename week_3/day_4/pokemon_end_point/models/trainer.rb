require( 'pg' )
require_relative('pokemon')

class Trainer

  attr_reader( :id, :name )

  def initialize( options )
    @id = options['id'].to_i
    @name = options['name']
  end

  def save()
    sql = "INSERT INTO trainers (name) VALUES ('#{ @name }') RETURNING *"
    trainer = SqlRunner.run(sql).first
    @id = trainer['id'].to_i
  end

  def pokemons()
    sql = "SELECT p.* FROM pokemons p INNER JOIN ownedpokemons o ON o.pokemon_id = p.id WHERE trainer_id = #{@id};"
    return Pokemon.map_items(sql)
  end

  def self.all()
    sql = "SELECT * FROM trainers"
    return Trainer.map_items(sql)
  end

  def self.delete_all()
   sql = "DELETE FROM trainers"
   SqlRunner.run(sql)
  end

  def self.map_items(sql)
    trainers = SqlRunner.run( sql )
    result = trainers.map { |trainer| Trainer.new( trainer ) }
    return result
  end

  def self.map_item(sql)
    result = Trainer.map_items(sql)
    return result.first
  end

end