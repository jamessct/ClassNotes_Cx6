require( 'pg' )
require_relative('../db/sql_runner')

class Pokemon 

  attr_reader( :id, :name )

  def initialize( options )
    @id = options['id'].to_i
    @name = options['name']
  end

  def save()
    sql = "INSERT INTO pokemons (name) VALUES ('#{ @name }') RETURNING *"
    pokemon = SqlRunner.run( sql ).first
    @id = pokemon['id'].to_i
  end

  def self.all()
    sql = "SELECT * FROM pokemons"
    pokemons = SqlRunner.run(sql)
    result = pokemons.map { |pokemon| Pokemon.new( pokemon ) }
    return result
  end

  def self.delete_all()
    sql = "DELETE FROM pokemons"
    SqlRunner.run(sql)
  end

end