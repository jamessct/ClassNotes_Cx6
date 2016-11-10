require_relative('./store')

class Pet
  def initialize(options, runner)
    @runner = runner
    @id = options['id']
    @name = options['name']
    @type = options['type']
    @store_id = options['store_id']
  end

  def save()
    sql = "INSERT INTO pets (name, type, store_id) VALUES ('#{@name}', '#{ @type }', '#{@store_id}') RETURNING *"
    pet_data  = @runner.run(sql)
    @id = pet_data.first['id'].to_i
  end

  def store
    sql = "SELECT * FROM stores WHERE id = #{ @store_id }"
    store_data = @runner.run( sql )
    store = Store.new( store_data.first, @runner )
    return store
  end
end
