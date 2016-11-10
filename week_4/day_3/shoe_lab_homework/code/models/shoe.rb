require_relative('../db/sql_runner')

class Shoe

  attr_reader( :name, :address, :quantity, :size )

  def self.all()
    sql = "SELECT * FROM shoes"
    shoes = SqlRunner.run( sql )
    result = shoes.map { |shoe| Shoe.new( shoe ) }
    return result
  end

  def initialize( options )
    @id = nil || options['id'].to_i
    @name = options['name']
    @address= options['address']
    @size = options['size'].to_i
    @quantity = options['quantity'].to_i
  end


  def save()
    sql = "INSERT INTO shoes (
      name,
      address,
      size,
      quantity ) VALUES (
      '#{ @name }',
      '#{ @address }',
      '#{ @size }',
      '#{ @quantity }'
      ) RETURNING *"
    shoe_data = SqlRunner.run( sql )
    @id = shoe_data.first()['id'].to_i
  end

end
