require( 'pg' )
require_relative('../db/sql_runner')

class Trainer

  attr_reader( :id, :name )

  def initialize( options )
    @id = options['id'].to_i
    @name = options['name']
  end

  def save()
    sql = "INSERT INTO trainers (name) VALUES ('#{ @name }') RETURNING *"
    trainer = SqlRunner.run( sql ).first
    @id = trainer['id'].to_i
  end

  def self.all()
    sql = "SELECT * FROM trainers"
    trainers = SqlRunner.run( sql )
    result = trainers.map { |trainer| Trainer.new( trainer ) }
    return result
  end

  def self.delete_all()
    sql = "DELETE FROM trainers"
    SqlRunner.run(sql)
  end


end